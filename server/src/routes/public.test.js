import { describe, it, expect, beforeEach, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import { prisma } from '../db.js';
import publicRoutes from './public.js';

vi.mock('../db.js', () => ({
  prisma: {
    category: { findMany: vi.fn() },
    product: { findUnique: vi.fn() },
    storedImage: { findUnique: vi.fn() },
  },
}));

async function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/api', publicRoutes);
  return app;
}

describe('public routes', () => {
  let app;

  beforeEach(async () => {
    vi.clearAllMocks();
    app = await createApp();
  });

  it('GET /api/media/:id — 400 при невалидном id', async () => {
    const res = await request(app).get('/api/media/not-a-uuid');
    expect(res.status).toBe(400);
  });

  it('GET /api/media/:id — 404', async () => {
    prisma.storedImage.findUnique.mockResolvedValue(null);
    const res = await request(app).get('/api/media/11111111-2222-5222-8222-333333333333');
    expect(res.status).toBe(404);
  });

  it('GET /api/media/:id — 200 и тело', async () => {
    prisma.storedImage.findUnique.mockResolvedValue({
      mimeType: 'image/png',
      data: Buffer.from([1, 2, 3]),
    });
    const res = await request(app).get('/api/media/11111111-2222-5222-8222-333333333333');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('image/png');
    expect(res.body).toEqual(Buffer.from([1, 2, 3]));
  });

  it('GET /api/health', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.service).toBe('kitchensaratov-api');
  });

  it('GET /api/catalog — пустой список', async () => {
    prisma.category.findMany.mockResolvedValue([]);
    const res = await request(app).get('/api/catalog');
    expect(res.status).toBe(200);
    expect(res.body.categories).toEqual([]);
  });

  it('GET /api/catalog — только опубликованные товары в дереве', async () => {
    prisma.category.findMany.mockResolvedValue([
      {
        slug: 'k',
        name: 'К',
        imageUrl: 'u',
        displayGroups: [
          {
            slug: 'd',
            name: 'D',
            brandEntity: null,
            sections: [
              {
                slug: 'all',
                name: 'Все',
                products: [
                  { publicId: 'a', name: 'A', published: true },
                  { publicId: 'b', name: 'B', published: false },
                ],
              },
            ],
          },
        ],
      },
    ]);
    const res = await request(app).get('/api/catalog');
    expect(res.status).toBe(200);
    const products = res.body.categories[0].brands[0].subcategories[0].products;
    expect(products).toHaveLength(1);
    expect(products[0].id).toBe('a');
  });

  it('GET /api/products/:id — 404 если нет или не опубликован', async () => {
    prisma.product.findUnique.mockResolvedValue(null);
    const res = await request(app).get('/api/products/x');
    expect(res.status).toBe(404);

    prisma.product.findUnique.mockResolvedValue({
      published: false,
      section: { displayGroup: { category: {} } },
    });
    const res2 = await request(app).get('/api/products/hidden');
    expect(res2.status).toBe(404);
  });

  it('GET /api/media/:id — 500 при ошибке БД', async () => {
    prisma.storedImage.findUnique.mockRejectedValue(new Error('db'));
    const res = await request(app).get('/api/media/11111111-2222-5222-8222-333333333333');
    expect(res.status).toBe(500);
  });

  it('GET /api/media/:id — 200 с data не Buffer (массив байт)', async () => {
    prisma.storedImage.findUnique.mockResolvedValue({
      mimeType: 'image/jpeg',
      data: [4, 5, 6],
    });
    const res = await request(app).get('/api/media/11111111-2222-5222-8222-333333333333');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(Buffer.from([4, 5, 6]));
  });

  it('GET /api/catalog — 500', async () => {
    prisma.category.findMany.mockRejectedValue(new Error('db'));
    const res = await request(app).get('/api/catalog');
    expect(res.status).toBe(500);
  });

  it('GET /api/products/:id — 500', async () => {
    prisma.product.findUnique.mockRejectedValue(new Error('db'));
    const res = await request(app).get('/api/products/x');
    expect(res.status).toBe(500);
  });

  it('GET /api/products/:id — 200 карточка', async () => {
    prisma.product.findUnique.mockResolvedValue({
      publicId: 'pub-1',
      name: 'Товар',
      priceText: '100',
      description: '',
      imageUrl: 'img',
      source: 's',
      published: true,
      specs: null,
      priceAmount: null,
      priceCurrency: null,
      brandEntity: null,
      categories: [],
      images: [],
      section: {
        name: 'Секция',
        displayGroup: {
          slug: 'dg',
          name: 'Группа',
          brandEntity: null,
          category: { slug: 'cat', name: 'Категория' },
        },
      },
    });
    const res = await request(app).get('/api/products/pub-1');
    expect(res.status).toBe(200);
    expect(res.body.product.id).toBe('pub-1');
    expect(res.body.product.categoryId).toBe('cat');
  });
});
