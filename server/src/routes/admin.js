import { Router } from 'express';
import { randomUUID } from 'crypto';
import { Prisma } from '@prisma/client';
import { prisma } from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { catalogInclude } from '../lib/catalogQueries.js';
import { formatCatalogTree, DEFAULT_IMAGE } from '../lib/catalogFormat.js';
import { toSlug, uniqueSlug } from '../lib/slug.js';

const router = Router();
router.use(requireAuth);

/** categoryId в пути — это slug (kitchens), не UUID */
async function getCategoryBySlug(categorySlug) {
  return prisma.category.findUnique({ where: { slug: categorySlug } });
}

/** Глобальная сущность бренда; placeholder default без привязки */
async function resolveBrandEntityId(entitySlug, displayName) {
  if (!entitySlug || entitySlug === 'default') return null;
  const ent = await prisma.brandEntity.upsert({
    where: { slug: entitySlug },
    create: { slug: entitySlug, name: displayName },
    update: {},
  });
  return ent.id;
}

router.get('/catalog', async (_req, res) => {
  try {
    const rows = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: catalogInclude(false),
    });
    res.json({ categories: formatCatalogTree(rows, { publishedOnly: false }) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Не удалось загрузить каталог' });
  }
});

router.post('/categories', async (req, res) => {
  const name = String(req.body?.name || '').trim();
  const imageRaw = String(req.body?.image || '').trim();
  if (!name) return res.status(400).json({ error: 'Название обязательно' });

  const existing = await prisma.category.findMany({ select: { slug: true } });
  const existingSlugs = new Set(existing.map((c) => c.slug));
  const base = toSlug(name) || 'category';
  const slug = uniqueSlug(base, existingSlugs);
  const imageUrl = imageRaw || DEFAULT_IMAGE;

  try {
    await prisma.$transaction(async (tx) => {
      const cat = await tx.category.create({
        data: {
          slug,
          name,
          imageUrl,
          sortOrder: existing.length,
        },
      });
      const g = await tx.categoryDisplayGroup.create({
        data: {
          id: randomUUID(),
          categoryId: cat.id,
          slug: 'default',
          name: 'Все бренды',
          sortOrder: 0,
          brandEntityId: null,
        },
      });
      await tx.displayGroupSection.create({
        data: {
          id: randomUUID(),
          displayGroupId: g.id,
          slug: 'all',
          name: 'Все модели',
          sortOrder: 0,
        },
      });
    });
    res.status(201).json({ id: slug });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Не удалось создать категорию' });
  }
});

router.patch('/categories/:categoryId', async (req, res) => {
  const categorySlug = req.params.categoryId;
  const name = req.body?.name !== undefined ? String(req.body.name).trim() : undefined;
  const image = req.body?.image !== undefined ? String(req.body.image).trim() : undefined;

  try {
    const cat = await getCategoryBySlug(categorySlug);
    if (!cat) return res.status(404).json({ error: 'Категория не найдена' });

    await prisma.category.update({
      where: { id: cat.id },
      data: {
        ...(name !== undefined && name ? { name } : {}),
        ...(image !== undefined ? { imageUrl: image || cat.imageUrl } : {}),
      },
    });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Не удалось обновить категорию' });
  }
});

router.delete('/categories/:categoryId', async (req, res) => {
  try {
    const cat = await getCategoryBySlug(req.params.categoryId);
    if (!cat) return res.status(404).json({ error: 'Категория не найдена' });
    await prisma.category.delete({ where: { id: cat.id } });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Не удалось удалить категорию' });
  }
});

router.post('/categories/:categoryId/brands', async (req, res) => {
  const categorySlug = req.params.categoryId;
  const trimmed = String(req.body?.name || '').trim();
  if (!trimmed) return res.status(400).json({ error: 'Название бренда обязательно' });

  const cat = await prisma.category.findUnique({
    where: { slug: categorySlug },
    include: { displayGroups: { select: { slug: true } } },
  });
  if (!cat) return res.status(404).json({ error: 'Категория не найдена' });

  const existing = new Set(cat.displayGroups.map((b) => b.slug));
  const base = toSlug(trimmed) || 'brand';
  const slug = uniqueSlug(base, existing);

  const entitySlugRaw =
    typeof req.body?.entitySlug === 'string' ? req.body.entitySlug.trim() : '';
  const entitySlug = entitySlugRaw
    ? toSlug(entitySlugRaw) || slug
    : slug;

  try {
    const brandEntityId = await resolveBrandEntityId(
      entitySlug === 'default' ? null : entitySlug,
      trimmed
    );
    const g = await prisma.categoryDisplayGroup.create({
      data: {
        id: randomUUID(),
        categoryId: cat.id,
        slug,
        name: trimmed,
        sortOrder: cat.displayGroups.length,
        brandEntityId,
      },
    });
    await prisma.displayGroupSection.create({
      data: {
        id: randomUUID(),
        displayGroupId: g.id,
        slug: 'all',
        name: 'Все модели',
        sortOrder: 0,
      },
    });
    res.status(201).json({ id: slug });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Не удалось добавить бренд' });
  }
});

router.post('/categories/:categoryId/brands/:brandSlug/subcategories', async (req, res) => {
  const { categoryId: categorySlug, brandSlug } = req.params;
  const trimmed = String(req.body?.name || '').trim();
  if (!trimmed) return res.status(400).json({ error: 'Название обязательно' });

  const cat = await getCategoryBySlug(categorySlug);
  if (!cat) return res.status(404).json({ error: 'Категория не найдена' });

  const displayGroup = await prisma.categoryDisplayGroup.findFirst({
    where: { categoryId: cat.id, slug: brandSlug },
    include: { sections: { select: { slug: true } } },
  });
  if (!displayGroup) return res.status(404).json({ error: 'Бренд не найден' });

  const existing = new Set(displayGroup.sections.map((s) => s.slug));
  const base = toSlug(trimmed) || 'sub';
  const slug = uniqueSlug(base, existing);

  try {
    await prisma.displayGroupSection.create({
      data: {
        id: randomUUID(),
        displayGroupId: displayGroup.id,
        slug,
        name: trimmed,
        sortOrder: displayGroup.sections.length,
      },
    });
    res.status(201).json({ id: slug });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Не удалось добавить подкатегорию' });
  }
});

router.post(
  '/categories/:categoryId/brands/:brandSlug/subcategories/:subSlug/products',
  async (req, res) => {
    const { categoryId: categorySlug, brandSlug, subSlug } = req.params;
    const cat = await getCategoryBySlug(categorySlug);
    if (!cat) return res.status(404).json({ error: 'Категория не найдена' });

    const displayGroup = await prisma.categoryDisplayGroup.findFirst({
      where: { categoryId: cat.id, slug: brandSlug },
    });
    if (!displayGroup) return res.status(404).json({ error: 'Бренд не найден' });

    const section = await prisma.displayGroupSection.findFirst({
      where: { displayGroupId: displayGroup.id, slug: subSlug },
    });
    if (!section) return res.status(404).json({ error: 'Подкатегория не найдена' });

    const trimmedName = String(req.body?.name || '').trim();
    if (!trimmedName) return res.status(400).json({ error: 'Название товара обязательно' });

    const publicId = `${toSlug(trimmedName)}-${Date.now().toString(36)}`;
    const priceText = String(req.body?.price || '').trim() || 'По запросу';
    const description = String(req.body?.description || '').trim();
    const imageUrl = String(req.body?.image || '').trim() || DEFAULT_IMAGE;
    const source = String(req.body?.source || '').trim() || 'Сайт';

    let priceAmount = undefined;
    if (req.body?.priceAmount != null && req.body.priceAmount !== '') {
      const n = Number(req.body.priceAmount);
      if (Number.isFinite(n)) priceAmount = new Prisma.Decimal(n);
    }
    const priceCurrency =
      typeof req.body?.priceCurrency === 'string' && req.body.priceCurrency.trim()
        ? req.body.priceCurrency.trim().toUpperCase().slice(0, 3)
        : undefined;

    const count = await prisma.product.count({ where: { sectionId: section.id } });

    try {
      await prisma.$transaction(async (tx) => {
        const prod = await tx.product.create({
          data: {
            publicId,
            sectionId: section.id,
            brandEntityId: displayGroup.brandEntityId,
            name: trimmedName,
            priceText,
            ...(priceAmount !== undefined ? { priceAmount } : {}),
            ...(priceCurrency !== undefined ? { priceCurrency } : {}),
            description,
            imageUrl,
            source,
            sortOrder: count,
            published: true,
          },
        });
        await tx.productCategory.create({
          data: {
            productId: prod.id,
            categoryId: cat.id,
            isPrimary: true,
          },
        });
        await tx.productImage.create({
          data: {
            productId: prod.id,
            url: imageUrl,
            sortOrder: 0,
          },
        });
      });
      res.status(201).json({ id: publicId });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Не удалось создать товар' });
    }
  }
);

router.patch('/products/:publicId', async (req, res) => {
  const { publicId } = req.params;
  const existing = await prisma.product.findUnique({ where: { publicId } });
  if (!existing) return res.status(404).json({ error: 'Товар не найден' });

  const data = {};
  if (req.body?.name !== undefined) {
    const n = String(req.body.name).trim();
    if (n) data.name = n;
  }
  if (req.body?.price !== undefined) data.priceText = String(req.body.price).trim() || existing.priceText;
  if (req.body?.description !== undefined) data.description = String(req.body.description).trim();
  if (req.body?.image !== undefined) data.imageUrl = String(req.body.image).trim() || existing.imageUrl;
  if (req.body?.source !== undefined) data.source = String(req.body.source).trim() || existing.source;
  if (req.body?.specs !== undefined) data.specs = req.body.specs;
  if (req.body?.published !== undefined) data.published = Boolean(req.body.published);

  if (req.body?.priceAmount !== undefined) {
    if (req.body.priceAmount === null || req.body.priceAmount === '') {
      data.priceAmount = null;
    } else {
      const n = Number(req.body.priceAmount);
      if (Number.isFinite(n)) data.priceAmount = new Prisma.Decimal(n);
    }
  }
  if (req.body?.priceCurrency !== undefined) {
    const c = String(req.body.priceCurrency || '').trim().toUpperCase().slice(0, 3);
    data.priceCurrency = c || existing.priceCurrency;
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.product.update({ where: { publicId }, data });
      if (req.body?.image !== undefined) {
        const url = String(req.body.image).trim() || existing.imageUrl;
        const primary = await tx.productImage.findFirst({
          where: { productId: existing.id },
          orderBy: { sortOrder: 'asc' },
        });
        if (primary) {
          await tx.productImage.update({ where: { id: primary.id }, data: { url } });
        } else {
          await tx.productImage.create({
            data: { productId: existing.id, url, sortOrder: 0 },
          });
        }
      }
    });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Не удалось обновить товар' });
  }
});

router.delete('/products/:publicId', async (req, res) => {
  try {
    await prisma.product.delete({ where: { publicId: req.params.publicId } });
    res.json({ ok: true });
  } catch (e) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'Товар не найден' });
    console.error(e);
    res.status(500).json({ error: 'Не удалось удалить товар' });
  }
});

router.get('/brand-entities', async (_req, res) => {
  try {
    const rows = await prisma.brandEntity.findMany({
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      include: { _count: { select: { displayGroups: true } } },
    });
    res.json({
      brandEntities: rows.map((r) => ({
        slug: r.slug,
        name: r.name,
        logoUrl: r.logoUrl,
        website: r.website,
        description: r.description,
        sortOrder: r.sortOrder,
        placementsCount: r._count.displayGroups,
      })),
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Не удалось загрузить бренды' });
  }
});

router.patch('/brand-entities/:slug', async (req, res) => {
  const slug = req.params.slug;
  try {
    const existing = await prisma.brandEntity.findUnique({ where: { slug } });
    if (!existing) return res.status(404).json({ error: 'Бренд не найден' });

    const data = {};
    if (req.body?.name !== undefined) {
      const n = String(req.body.name).trim();
      if (n) data.name = n;
    }
    if (req.body?.logoUrl !== undefined) {
      data.logoUrl = String(req.body.logoUrl || '').trim() || null;
    }
    if (req.body?.website !== undefined) {
      data.website = String(req.body.website || '').trim() || null;
    }
    if (req.body?.description !== undefined) {
      data.description = String(req.body.description || '').trim() || null;
    }
    if (req.body?.sortOrder !== undefined) {
      const n = Number(req.body.sortOrder);
      if (Number.isFinite(n)) data.sortOrder = n;
    }

    await prisma.brandEntity.update({ where: { slug }, data });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Не удалось обновить бренд' });
  }
});

export default router;
