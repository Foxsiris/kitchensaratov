import { Router } from 'express';
import { prisma } from '../db.js';
import { catalogInclude } from '../lib/catalogQueries.js';
import { formatCatalogTree, formatProductDetail } from '../lib/catalogFormat.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'kitchensaratov-api' });
});

router.get('/catalog', async (_req, res) => {
  try {
    const rows = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: catalogInclude(true),
    });
    res.json({ categories: formatCatalogTree(rows, { publishedOnly: true }) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Не удалось загрузить каталог' });
  }
});

router.get('/products/:publicId', async (req, res) => {
  try {
    const p = await prisma.product.findUnique({
      where: { publicId: req.params.publicId },
      include: {
        brandEntity: true,
        categories: { include: { category: true } },
        images: { orderBy: { sortOrder: 'asc' } },
        section: {
          include: {
            displayGroup: {
              include: { category: true, brandEntity: true },
            },
          },
        },
      },
    });
    if (!p || !p.published) {
      return res.status(404).json({ error: 'Товар не найден' });
    }
    const { section } = p;
    const { displayGroup } = section;
    const { category } = displayGroup;
    const detail = formatProductDetail({
      product: p,
      category,
      displayGroup,
      section,
    });
    res.json({ product: detail });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

export default router;
