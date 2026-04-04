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

  const body = req.body || {};
  const entityKeyPresent = Object.prototype.hasOwnProperty.call(body, 'entitySlug');
  let brandEntityId = null;
  if (entityKeyPresent) {
    const raw = body.entitySlug;
    if (raw !== null && String(raw).trim() !== '') {
      const es = toSlug(String(raw).trim());
      if (es && es !== 'default') {
        const ent = await prisma.brandEntity.findUnique({ where: { slug: es } });
        if (!ent) {
          return res.status(400).json({
            error:
              'Производитель не найден в справочнике. Создайте его в разделе «Бренды» или оставьте привязку пустой.',
          });
        }
        brandEntityId = ent.id;
      }
    }
  } else {
    const entitySlugForUpsert = slug;
    brandEntityId = await resolveBrandEntityId(
      entitySlugForUpsert === 'default' ? null : entitySlugForUpsert,
      trimmed
    );
  }

  try {
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

router.patch('/categories/:categoryId/brands/:brandSlug', async (req, res) => {
  const { categoryId: categorySlug, brandSlug } = req.params;
  if (brandSlug === 'default') {
    const name = req.body?.name !== undefined ? String(req.body.name).trim() : undefined;
    if (req.body?.entitySlug !== undefined) {
      return res.status(400).json({ error: 'У служебной группы «Все бренды» нельзя менять привязку к производителю' });
    }
    if (!name) {
      return res.status(400).json({ error: 'Название не может быть пустым' });
    }
    try {
      const cat = await getCategoryBySlug(categorySlug);
      if (!cat) return res.status(404).json({ error: 'Категория не найдена' });
      const group = await prisma.categoryDisplayGroup.findFirst({
        where: { categoryId: cat.id, slug: 'default' },
      });
      if (!group) return res.status(404).json({ error: 'Группа не найдена' });
      await prisma.categoryDisplayGroup.update({ where: { id: group.id }, data: { name } });
      return res.json({ ok: true });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Не удалось обновить группу' });
    }
  }

  try {
    const cat = await getCategoryBySlug(categorySlug);
    if (!cat) return res.status(404).json({ error: 'Категория не найдена' });

    const group = await prisma.categoryDisplayGroup.findFirst({
      where: { categoryId: cat.id, slug: brandSlug },
    });
    if (!group) return res.status(404).json({ error: 'Бренд не найден' });

    const data = {};
    if (req.body?.name !== undefined) {
      const n = String(req.body.name).trim();
      if (!n) return res.status(400).json({ error: 'Название не может быть пустым' });
      data.name = n;
    }

    let newEntityId;
    let entityTouched = false;
    if (req.body?.entitySlug !== undefined) {
      entityTouched = true;
      const raw = req.body.entitySlug;
      if (raw === null || String(raw).trim() === '') {
        newEntityId = null;
      } else {
        const es = toSlug(String(raw).trim());
        if (!es || es === 'default') {
          newEntityId = null;
        } else {
          const ent = await prisma.brandEntity.findUnique({ where: { slug: es } });
          if (!ent) {
            return res.status(400).json({
              error: 'Производитель не найден. Выберите бренд из справочника или очистите поле.',
            });
          }
          newEntityId = ent.id;
        }
      }
      data.brandEntityId = newEntityId;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Нет полей для обновления' });
    }

    await prisma.$transaction(async (tx) => {
      await tx.categoryDisplayGroup.update({ where: { id: group.id }, data });
      if (entityTouched) {
        await tx.product.updateMany({
          where: { section: { displayGroupId: group.id } },
          data: { brandEntityId: data.brandEntityId ?? null },
        });
      }
    });

    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Не удалось обновить бренд' });
  }
});

router.delete('/categories/:categoryId/brands/:brandSlug', async (req, res) => {
  const { categoryId: categorySlug, brandSlug } = req.params;
  if (brandSlug === 'default') {
    return res.status(400).json({ error: 'Нельзя удалить служебную группу «Все бренды»' });
  }

  try {
    const cat = await getCategoryBySlug(categorySlug);
    if (!cat) return res.status(404).json({ error: 'Категория не найдена' });

    const group = await prisma.categoryDisplayGroup.findFirst({
      where: { categoryId: cat.id, slug: brandSlug },
    });
    if (!group) return res.status(404).json({ error: 'Бренд не найден' });

    const productCount = await prisma.product.count({
      where: { section: { displayGroupId: group.id } },
    });

    await prisma.categoryDisplayGroup.delete({ where: { id: group.id } });
    res.json({ ok: true, deletedProducts: productCount });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Не удалось удалить бренд' });
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

router.post('/brand-entities', async (req, res) => {
  const name = String(req.body?.name || '').trim();
  if (!name) return res.status(400).json({ error: 'Название обязательно' });

  const rows = await prisma.brandEntity.findMany({ select: { slug: true } });
  const existingSlugs = new Set(rows.map((r) => r.slug));

  let base =
    typeof req.body?.slug === 'string' && req.body.slug.trim()
      ? toSlug(req.body.slug.trim()) || toSlug(name) || 'brand'
      : toSlug(name) || 'brand';
  if (base === 'default') base = 'brand';

  const slug = uniqueSlug(base, existingSlugs);

  const logoUrl =
    req.body?.logoUrl !== undefined ? String(req.body.logoUrl || '').trim() || null : null;
  const website =
    req.body?.website !== undefined ? String(req.body.website || '').trim() || null : null;
  const description =
    req.body?.description !== undefined ? String(req.body.description || '').trim() || null : null;

  let sortOrder = 0;
  if (req.body?.sortOrder !== undefined) {
    const n = Number(req.body.sortOrder);
    if (Number.isFinite(n)) sortOrder = n;
  } else {
    const agg = await prisma.brandEntity.aggregate({ _max: { sortOrder: true } });
    sortOrder = (agg._max.sortOrder ?? -1) + 1;
  }

  try {
    await prisma.brandEntity.create({
      data: { slug, name, logoUrl, website, description, sortOrder },
    });
    res.status(201).json({ slug });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Не удалось создать производителя' });
  }
});

router.delete('/brand-entities/:slug', async (req, res) => {
  const slug = req.params.slug;
  if (slug === 'default') {
    return res.status(400).json({ error: 'Нельзя удалить зарезервированный идентификатор' });
  }
  try {
    const existing = await prisma.brandEntity.findUnique({ where: { slug } });
    if (!existing) return res.status(404).json({ error: 'Бренд не найден' });
    await prisma.brandEntity.delete({ where: { slug } });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Не удалось удалить бренд' });
  }
});

router.get('/brand-entities', async (_req, res) => {
  try {
    const rows = await prisma.brandEntity.findMany({
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      include: { _count: { select: { displayGroups: true, products: true } } },
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
        productsCount: r._count.products,
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
