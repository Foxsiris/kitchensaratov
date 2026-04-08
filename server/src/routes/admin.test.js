import { describe, it, expect, beforeEach, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';
import adminRoutes from './admin.js';

vi.mock('../db.js', () => ({
  prisma: {
    category: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    brandEntity: {
      upsert: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      aggregate: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
      update: vi.fn(),
    },
    categoryDisplayGroup: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    displayGroupSection: {
      create: vi.fn(),
      findFirst: vi.fn(),
    },
    product: {
      count: vi.fn(),
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      updateMany: vi.fn(),
    },
    productCategory: {
      create: vi.fn(),
    },
    productImage: {
      create: vi.fn(),
      findFirst: vi.fn(),
      update: vi.fn(),
      deleteMany: vi.fn(),
    },
    storedImage: {
      create: vi.fn(),
    },
    promotion: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    $transaction: vi.fn(),
  },
}));

const SECRET = 'test-secret-key-min-32-chars-long!!';

function auth() {
  const token = jwt.sign({ sub: 'admin-1' }, SECRET, { expiresIn: '1h' });
  return { Authorization: `Bearer ${token}` };
}

async function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/admin', adminRoutes);
  return app;
}

describe('admin routes', () => {
  let app;

  beforeEach(async () => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = SECRET;
    app = await createApp();
  });

  describe('POST /upload', () => {
    it('400 без файла', async () => {
      const res = await request(app).post('/api/admin/upload').set(auth()).send();
      expect(res.status).toBe(400);
    });

    it('201 сохраняет файл', async () => {
      prisma.storedImage.create.mockResolvedValue({
        id: '11111111-2222-5222-8222-333333333333',
      });
      const jpeg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0, 0]);
      const res = await request(app)
        .post('/api/admin/upload')
        .set(auth())
        .attach('file', jpeg, { filename: 'x.jpg', contentType: 'image/jpeg' });
      expect(res.status).toBe(201);
      expect(res.body.url).toBe('/api/media/11111111-2222-5222-8222-333333333333');
    });

    it(
      '400 файл больше 5 МБ (LIMIT_FILE_SIZE)',
      async () => {
        const big = Buffer.alloc(5 * 1024 * 1024 + 1, 0xff);
        const res = await request(app)
          .post('/api/admin/upload')
          .set(auth())
          .attach('file', big, { filename: 'huge.jpg', contentType: 'image/jpeg' });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Файл не больше 5 МБ');
      },
      60_000
    );
  });

  describe('auth', () => {
    it('401 GET /catalog без токена', async () => {
      const res = await request(app).get('/api/admin/catalog');
      expect(res.status).toBe(401);
    });

    it('401 при невалидном JWT', async () => {
      const res = await request(app)
        .get('/api/admin/catalog')
        .set({ Authorization: 'Bearer not-a-jwt' });
      expect(res.status).toBe(401);
    });
  });

  describe('GET /catalog', () => {
    it('200 и пустой categories', async () => {
      prisma.category.findMany.mockResolvedValue([]);
      const res = await request(app).get('/api/admin/catalog').set(auth());
      expect(res.status).toBe(200);
      expect(res.body.categories).toEqual([]);
    });

    it('200 и дерево каталога', async () => {
      prisma.category.findMany.mockResolvedValue([
        {
          slug: 'kitchens',
          name: 'Кухни',
          imageUrl: 'https://example.com/c.jpg',
          displayGroups: [
            {
              slug: 'default',
              name: 'Все бренды',
              brandEntity: null,
              sections: [
                {
                  slug: 'all',
                  name: 'Все модели',
                  products: [{ publicId: 'p1', name: 'Товар', published: true }],
                },
              ],
            },
          ],
        },
      ]);
      const res = await request(app).get('/api/admin/catalog').set(auth());
      expect(res.status).toBe(200);
      expect(res.body.categories).toHaveLength(1);
      expect(res.body.categories[0].id).toBe('kitchens');
      expect(res.body.categories[0].brands[0].subcategories[0].products[0].id).toBe('p1');
    });
  });

  describe('POST /categories', () => {
    it('400 без названия', async () => {
      const res = await request(app).post('/api/admin/categories').set(auth()).send({});
      expect(res.status).toBe(400);
    });

    it('201 создаёт категорию', async () => {
      prisma.category.findMany.mockResolvedValueOnce([]);
      prisma.$transaction.mockImplementation(async (fn) => {
        const tx = {
          category: {
            create: vi.fn().mockResolvedValue({ id: 'cid', slug: 'novaia-kategoriia' }),
          },
          categoryDisplayGroup: { create: vi.fn().mockResolvedValue({ id: 'g1' }) },
          displayGroupSection: { create: vi.fn().mockResolvedValue({}) },
        };
        return fn(tx);
      });
      const res = await request(app)
        .post('/api/admin/categories')
        .set(auth())
        .send({ name: 'Новая категория' });
      expect(res.status).toBe(201);
      expect(res.body.id).toBeTruthy();
    });
  });

  describe('PATCH /categories/:categoryId', () => {
    it('404 неизвестный slug', async () => {
      prisma.category.findUnique.mockResolvedValue(null);
      const res = await request(app)
        .patch('/api/admin/categories/unknown')
        .set(auth())
        .send({ name: 'X' });
      expect(res.status).toBe(404);
    });

    it('200 обновление', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'uuid-1', slug: 'kitchens', name: 'К', imageUrl: 'u' });
      prisma.category.update.mockResolvedValue({});
      const res = await request(app)
        .patch('/api/admin/categories/kitchens')
        .set(auth())
        .send({ name: 'Кухни+' });
      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
    });
  });

  describe('DELETE /categories/:categoryId', () => {
    it('404', async () => {
      prisma.category.findUnique.mockResolvedValue(null);
      const res = await request(app).delete('/api/admin/categories/missing').set(auth());
      expect(res.status).toBe(404);
    });

    it('200', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'cid' });
      prisma.category.delete.mockResolvedValue({});
      const res = await request(app).delete('/api/admin/categories/kitchens').set(auth());
      expect(res.status).toBe(200);
    });
  });

  describe('PATCH brands', () => {
    it('400 default + entitySlug', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      const res = await request(app)
        .patch('/api/admin/categories/kitchens/brands/default')
        .set(auth())
        .send({ name: 'Все бренды', entitySlug: 'rimi' });
      expect(res.status).toBe(400);
    });
  });

  describe('DELETE brands', () => {
    it('400 нельзя удалить default', async () => {
      const res = await request(app)
        .delete('/api/admin/categories/kitchens/brands/default')
        .set(auth());
      expect(res.status).toBe(400);
    });
  });

  describe('POST /brand-entities', () => {
    it('400 без имени', async () => {
      const res = await request(app).post('/api/admin/brand-entities').set(auth()).send({});
      expect(res.status).toBe(400);
    });

    it('201 создаёт производителя', async () => {
      prisma.brandEntity.findMany.mockResolvedValueOnce([]);
      prisma.brandEntity.aggregate.mockResolvedValue({ _max: { sortOrder: 2 } });
      prisma.brandEntity.create.mockResolvedValue({});
      const res = await request(app)
        .post('/api/admin/brand-entities')
        .set(auth())
        .send({ name: 'Acme Kitchens' });
      expect(res.status).toBe(201);
      expect(res.body.slug).toBeTruthy();
    });
  });

  describe('GET /brand-entities', () => {
    it('200 список', async () => {
      prisma.brandEntity.findMany.mockResolvedValue([
        {
          slug: 'acme',
          name: 'Acme',
          logoUrl: null,
          website: null,
          description: null,
          sortOrder: 0,
          _count: { displayGroups: 1, products: 5 },
        },
      ]);
      const res = await request(app).get('/api/admin/brand-entities').set(auth());
      expect(res.status).toBe(200);
      expect(res.body.brandEntities).toHaveLength(1);
      expect(res.body.brandEntities[0].placementsCount).toBe(1);
      expect(res.body.brandEntities[0].productsCount).toBe(5);
    });
  });

  describe('DELETE /brand-entities/:slug', () => {
    it('400 reserved default', async () => {
      const res = await request(app).delete('/api/admin/brand-entities/default').set(auth());
      expect(res.status).toBe(400);
    });

    it('404 не найден', async () => {
      prisma.brandEntity.findUnique.mockResolvedValue(null);
      const res = await request(app).delete('/api/admin/brand-entities/ghost').set(auth());
      expect(res.status).toBe(404);
    });
  });

  describe('PATCH /products/:publicId', () => {
    it('404 товар не найден', async () => {
      prisma.product.findUnique.mockResolvedValue(null);
      const res = await request(app)
        .patch('/api/admin/products/missing-id')
        .set(auth())
        .send({ name: 'N' });
      expect(res.status).toBe(404);
    });

    it('200 обновление', async () => {
      prisma.product.findUnique.mockResolvedValue({
        id: 'int-id',
        publicId: 'pub-1',
        priceText: '100',
        imageUrl: 'https://example.com/img.jpg',
        source: 's',
        priceCurrency: 'RUB',
      });
      prisma.$transaction.mockImplementation(async (fn) => {
        const tx = {
          product: { update: vi.fn().mockResolvedValue({}) },
          productImage: {
            findFirst: vi.fn().mockResolvedValue(null),
            create: vi.fn(),
            update: vi.fn(),
            deleteMany: vi.fn(),
          },
        };
        return fn(tx);
      });
      const res = await request(app)
        .patch('/api/admin/products/pub-1')
        .set(auth())
        .send({ name: 'Новое имя', priceAmount: 99.5 });
      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
    });

    it('200 обновление extraImages', async () => {
      prisma.product.findUnique.mockResolvedValue({
        id: 'int-id',
        publicId: 'pub-1',
        priceText: '100',
        imageUrl: 'https://example.com/main.jpg',
        source: 's',
        priceCurrency: 'RUB',
      });
      prisma.$transaction.mockImplementation(async (fn) => {
        const tx = {
          product: { update: vi.fn().mockResolvedValue({}) },
          productImage: {
            findFirst: vi.fn().mockResolvedValue(null),
            create: vi.fn(),
            update: vi.fn(),
            deleteMany: vi.fn().mockResolvedValue({ count: 1 }),
          },
        };
        return fn(tx);
      });
      const res = await request(app)
        .patch('/api/admin/products/pub-1')
        .set(auth())
        .send({ extraImages: ['https://example.com/extra.jpg'] });
      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
    });

    it('400 невалидный extraImages', async () => {
      prisma.product.findUnique.mockResolvedValue({
        id: 'int-id',
        publicId: 'pub-1',
        priceText: '100',
        imageUrl: 'https://example.com/main.jpg',
        source: 's',
        priceCurrency: 'RUB',
      });
      const res = await request(app)
        .patch('/api/admin/products/pub-1')
        .set(auth())
        .send({ extraImages: ['/not-media/path.jpg'] });
      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /products/:publicId', () => {
    it('404 P2025', async () => {
      const err = Object.assign(new Error('not found'), { code: 'P2025' });
      prisma.product.delete.mockRejectedValueOnce(err);
      const res = await request(app).delete('/api/admin/products/gone').set(auth());
      expect(res.status).toBe(404);
    });

    it('200', async () => {
      prisma.product.delete.mockResolvedValue({});
      const res = await request(app).delete('/api/admin/products/x').set(auth());
      expect(res.status).toBe(200);
    });
  });

  describe('POST subcategories & products', () => {
    it('201 подкатегория', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue({
        id: 'g1',
        slug: 'brand-a',
        sections: [{ slug: 'all' }],
      });
      prisma.displayGroupSection.create.mockResolvedValue({});
      const res = await request(app)
        .post('/api/admin/categories/kitchens/brands/brand-a/subcategories')
        .set(auth())
        .send({ name: 'Угловые' });
      expect(res.status).toBe(201);
      expect(res.body.id).toBeTruthy();
    });

    it('201 товар', async () => {
      prisma.category.findUnique.mockResolvedValueOnce({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue({
        id: 'g1',
        brandEntityId: null,
      });
      prisma.displayGroupSection.findFirst.mockResolvedValue({ id: 's1' });
      prisma.product.count.mockResolvedValue(0);
      prisma.$transaction.mockImplementation(async (fn) => {
        const prod = { id: 'pid' };
        const tx = {
          product: { create: vi.fn().mockResolvedValue(prod) },
          productCategory: { create: vi.fn() },
          productImage: { create: vi.fn(), deleteMany: vi.fn() },
        };
        return fn(tx);
      });
      const res = await request(app)
        .post('/api/admin/categories/kitchens/brands/default/subcategories/all/products')
        .set(auth())
        .send({ name: 'Кухня Лайт' });
      expect(res.status).toBe(201);
      expect(res.body.id).toMatch(/^кухня-лайт-/);
    });
  });

  describe('POST /categories/:id/brands', () => {
    it('404 категория', async () => {
      prisma.category.findUnique.mockReset();
      prisma.category.findUnique.mockResolvedValue(null);
      const res = await request(app)
        .post('/api/admin/categories/none/brands')
        .set(auth())
        .send({ name: 'Бренд' });
      expect(res.status).toBe(404);
    });

    it('201 бренд с upsert entity (без entitySlug в body)', async () => {
      prisma.category.findUnique.mockResolvedValue({
        id: 'c1',
        displayGroups: [{ slug: 'default' }],
      });
      prisma.brandEntity.upsert.mockResolvedValue({ id: 'e1' });
      prisma.categoryDisplayGroup.create.mockResolvedValue({ id: 'g2' });
      prisma.displayGroupSection.create.mockResolvedValue({});
      const res = await request(app)
        .post('/api/admin/categories/kitchens/brands')
        .set(auth())
        .send({ name: 'Рими' });
      expect(res.status).toBe(201);
    });
  });

  describe('promotions', () => {
    it('GET /promotions', async () => {
      prisma.promotion.findMany.mockResolvedValue([]);
      const res = await request(app).get('/api/admin/promotions').set(auth());
      expect(res.status).toBe(200);
      expect(res.body.promotions).toEqual([]);
    });

    it('POST /promotions 400 без заголовка', async () => {
      const res = await request(app).post('/api/admin/promotions').set(auth()).send({ badge: 'x' });
      expect(res.status).toBe(400);
    });

    it('POST /promotions 201', async () => {
      prisma.promotion.create.mockResolvedValue({ id: '11111111-2222-4222-8222-333333333333' });
      const res = await request(app)
        .post('/api/admin/promotions')
        .set(auth())
        .send({
          badge: 'B',
          title: 'T',
          description: '',
          price: '',
          action: '',
          dark: false,
          sortOrder: 0,
        });
      expect(res.status).toBe(201);
      expect(res.body.id).toBe('11111111-2222-4222-8222-333333333333');
    });

    it('PATCH /promotions/:id 400 неверный id', async () => {
      const res = await request(app).patch('/api/admin/promotions/bad').set(auth()).send({ title: 'X' });
      expect(res.status).toBe(400);
    });

    it('PATCH /promotions/:id 404', async () => {
      prisma.promotion.findUnique.mockResolvedValue(null);
      const res = await request(app)
        .patch('/api/admin/promotions/11111111-2222-4222-8222-333333333333')
        .set(auth())
        .send({ title: 'X' });
      expect(res.status).toBe(404);
    });

    it('PATCH /promotions/:id 200', async () => {
      prisma.promotion.findUnique.mockResolvedValue({ id: '11111111-2222-4222-8222-333333333333' });
      prisma.promotion.update.mockResolvedValue({});
      const res = await request(app)
        .patch('/api/admin/promotions/11111111-2222-4222-8222-333333333333')
        .set(auth())
        .send({ title: 'Новое', badge: 'Н', dark: true });
      expect(res.status).toBe(200);
    });

    it('DELETE /promotions/:id 404', async () => {
      prisma.promotion.findUnique.mockResolvedValue(null);
      const res = await request(app)
        .delete('/api/admin/promotions/11111111-2222-4222-8222-333333333333')
        .set(auth());
      expect(res.status).toBe(404);
    });

    it('DELETE /promotions/:id 200', async () => {
      prisma.promotion.findUnique.mockResolvedValue({ id: '11111111-2222-4222-8222-333333333333' });
      prisma.promotion.delete.mockResolvedValue({});
      const res = await request(app)
        .delete('/api/admin/promotions/11111111-2222-4222-8222-333333333333')
        .set(auth());
      expect(res.status).toBe(200);
    });
  });
});
