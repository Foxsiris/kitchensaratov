/**
 * Дополнительные сценарии admin API (ошибки Prisma, валидация, ветки PATCH и т.д.).
 */
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
    displayGroupSection: { create: vi.fn(), findFirst: vi.fn() },
    product: {
      count: vi.fn(),
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      updateMany: vi.fn(),
    },
    productCategory: { create: vi.fn() },
    productImage: {
      create: vi.fn(),
      findFirst: vi.fn(),
      update: vi.fn(),
      deleteMany: vi.fn(),
    },
    storedImage: { create: vi.fn() },
    $transaction: vi.fn(),
  },
}));

const SECRET = 'test-secret-key-min-32-chars-long!!';
function auth() {
  return { Authorization: `Bearer ${jwt.sign({ sub: 'admin-1' }, SECRET, { expiresIn: '1h' })}` };
}

async function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/admin', adminRoutes);
  return app;
}

describe('admin API — покрытие веток (coverage)', () => {
  let app;

  beforeEach(async () => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = SECRET;
    app = await createApp();
  });

  describe('POST /upload', () => {
    it('500 при ошибке БД', async () => {
      prisma.storedImage.create.mockRejectedValue(new Error('db'));
      const jpeg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0, 0]);
      const res = await request(app).post('/api/admin/upload').set(auth()).attach('file', jpeg, {
        filename: 'x.jpg',
        contentType: 'image/jpeg',
      });
      expect(res.status).toBe(500);
    });
  });

  describe('GET /catalog', () => {
    it('500 при ошибке findMany', async () => {
      prisma.category.findMany.mockRejectedValue(new Error('db'));
      const res = await request(app).get('/api/admin/catalog').set(auth());
      expect(res.status).toBe(500);
    });
  });

  describe('POST /categories', () => {
    it('400 при недопустимом image', async () => {
      prisma.category.findMany.mockResolvedValue([]);
      const res = await request(app)
        .post('/api/admin/categories')
        .set(auth())
        .send({ name: 'Кат', image: '/not-api/media.jpg' });
      expect(res.status).toBe(400);
    });

    it('500 при ошибке транзакции', async () => {
      prisma.category.findMany.mockResolvedValue([]);
      prisma.$transaction.mockRejectedValue(new Error('tx'));
      const res = await request(app)
        .post('/api/admin/categories')
        .set(auth())
        .send({ name: 'Кат' });
      expect(res.status).toBe(500);
    });
  });

  describe('PATCH /categories/:id', () => {
    it('400 недопустимое изображение', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1', slug: 'k', name: 'K', imageUrl: 'https://x' });
      const res = await request(app)
        .patch('/api/admin/categories/k')
        .set(auth())
        .send({ image: 'ftp://bad' });
      expect(res.status).toBe(400);
    });

    it('500 при ошибке update', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1', slug: 'k', name: 'K', imageUrl: 'https://x' });
      prisma.category.update.mockRejectedValue(new Error('db'));
      const res = await request(app).patch('/api/admin/categories/k').set(auth()).send({ name: 'N' });
      expect(res.status).toBe(500);
    });

    it('200 обновление только image (https)', async () => {
      prisma.category.findUnique.mockResolvedValue({
        id: 'c1',
        slug: 'k',
        name: 'K',
        imageUrl: 'https://old',
      });
      prisma.category.update.mockResolvedValue({});
      const res = await request(app)
        .patch('/api/admin/categories/k')
        .set(auth())
        .send({ image: 'https://new.example/img.jpg' });
      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /categories/:id', () => {
    it('500 при ошибке delete', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.category.delete.mockRejectedValue(new Error('db'));
      const res = await request(app).delete('/api/admin/categories/k').set(auth());
      expect(res.status).toBe(500);
    });
  });

  describe('POST /categories/:id/brands', () => {
    it('400 пустое название', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1', displayGroups: [] });
      const res = await request(app).post('/api/admin/categories/k/brands').set(auth()).send({ name: '  ' });
      expect(res.status).toBe(400);
    });

    it('400 производитель не найден при entitySlug', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1', displayGroups: [{ slug: 'd' }] });
      prisma.brandEntity.findUnique.mockResolvedValue(null);
      const res = await request(app)
        .post('/api/admin/categories/k/brands')
        .set(auth())
        .send({ name: 'Бренд', entitySlug: 'ghost' });
      expect(res.status).toBe(400);
    });

    it('201 с привязкой к существующему производителю', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1', displayGroups: [{ slug: 'd' }] });
      prisma.brandEntity.findUnique.mockResolvedValue({ id: 'e1' });
      prisma.categoryDisplayGroup.create.mockResolvedValue({ id: 'g1' });
      prisma.displayGroupSection.create.mockResolvedValue({});
      const res = await request(app)
        .post('/api/admin/categories/k/brands')
        .set(auth())
        .send({ name: 'Бренд', entitySlug: 'acme' });
      expect(res.status).toBe(201);
    });

    it('201 entitySlug null — без привязки', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1', displayGroups: [{ slug: 'd' }] });
      prisma.categoryDisplayGroup.create.mockResolvedValue({ id: 'g1' });
      prisma.displayGroupSection.create.mockResolvedValue({});
      const res = await request(app)
        .post('/api/admin/categories/k/brands')
        .set(auth())
        .send({ name: 'Бренд', entitySlug: null });
      expect(res.status).toBe(201);
    });

    it('500 при ошибке создания группы', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1', displayGroups: [] });
      prisma.brandEntity.upsert.mockResolvedValue({ id: 'e1' });
      prisma.categoryDisplayGroup.create.mockRejectedValue(new Error('db'));
      const res = await request(app).post('/api/admin/categories/k/brands').set(auth()).send({ name: 'Б' });
      expect(res.status).toBe(500);
    });
  });

  describe('PATCH /categories/:id/brands/default', () => {
    it('200 переименование', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue({ id: 'g1', slug: 'default' });
      prisma.categoryDisplayGroup.update.mockResolvedValue({});
      const res = await request(app)
        .patch('/api/admin/categories/k/brands/default')
        .set(auth())
        .send({ name: 'Все бренды +' });
      expect(res.status).toBe(200);
    });

    it('400 пустое имя', async () => {
      const res = await request(app)
        .patch('/api/admin/categories/k/brands/default')
        .set(auth())
        .send({ name: '   ' });
      expect(res.status).toBe(400);
    });

    it('404 категория', async () => {
      prisma.category.findUnique.mockResolvedValue(null);
      const res = await request(app)
        .patch('/api/admin/categories/k/brands/default')
        .set(auth())
        .send({ name: 'Все бренды' });
      expect(res.status).toBe(404);
    });

    it('404 группа default', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue(null);
      const res = await request(app)
        .patch('/api/admin/categories/k/brands/default')
        .set(auth())
        .send({ name: 'Все бренды' });
      expect(res.status).toBe(404);
    });

    it('500 ошибка update', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue({ id: 'g1' });
      prisma.categoryDisplayGroup.update.mockRejectedValue(new Error('db'));
      const res = await request(app)
        .patch('/api/admin/categories/k/brands/default')
        .set(auth())
        .send({ name: 'Все бренды' });
      expect(res.status).toBe(500);
    });
  });

  describe('PATCH /categories/:id/brands/:slug (не default)', () => {
    it('404 категория', async () => {
      prisma.category.findUnique.mockResolvedValue(null);
      const res = await request(app)
        .patch('/api/admin/categories/k/brands/rimi')
        .set(auth())
        .send({ name: 'R' });
      expect(res.status).toBe(404);
    });

    it('404 бренд', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue(null);
      const res = await request(app)
        .patch('/api/admin/categories/k/brands/rimi')
        .set(auth())
        .send({ name: 'R' });
      expect(res.status).toBe(404);
    });

    it('400 пустое название', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue({ id: 'g1', slug: 'rimi' });
      const res = await request(app)
        .patch('/api/admin/categories/k/brands/rimi')
        .set(auth())
        .send({ name: '  ' });
      expect(res.status).toBe(400);
    });

    it('400 производитель не найден', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue({ id: 'g1', slug: 'rimi' });
      prisma.brandEntity.findUnique.mockResolvedValue(null);
      const res = await request(app)
        .patch('/api/admin/categories/k/brands/rimi')
        .set(auth())
        .send({ entitySlug: 'nope' });
      expect(res.status).toBe(400);
    });

    it('400 нет полей для обновления', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue({ id: 'g1', slug: 'rimi' });
      const res = await request(app).patch('/api/admin/categories/k/brands/rimi').set(auth()).send({});
      expect(res.status).toBe(400);
    });

    it('200 смена имени', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue({ id: 'g1', slug: 'rimi' });
      prisma.$transaction.mockImplementation(async (fn) => {
        const tx = {
          categoryDisplayGroup: { update: vi.fn() },
          product: { updateMany: vi.fn() },
        };
        return fn(tx);
      });
      const res = await request(app)
        .patch('/api/admin/categories/k/brands/rimi')
        .set(auth())
        .send({ name: 'Рими+' });
      expect(res.status).toBe(200);
    });

    it('200 сброс entitySlug в null и обновление товаров', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue({ id: 'g1', slug: 'rimi' });
      prisma.$transaction.mockImplementation(async (fn) => {
        const tx = {
          categoryDisplayGroup: { update: vi.fn() },
          product: { updateMany: vi.fn() },
        };
        return fn(tx);
      });
      const res = await request(app)
        .patch('/api/admin/categories/k/brands/rimi')
        .set(auth())
        .send({ entitySlug: null });
      expect(res.status).toBe(200);
    });

    it('200 entitySlug default → null', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue({ id: 'g1', slug: 'rimi' });
      prisma.$transaction.mockImplementation(async (fn) => {
        const tx = {
          categoryDisplayGroup: { update: vi.fn() },
          product: { updateMany: vi.fn() },
        };
        return fn(tx);
      });
      const res = await request(app)
        .patch('/api/admin/categories/k/brands/rimi')
        .set(auth())
        .send({ entitySlug: 'default' });
      expect(res.status).toBe(200);
    });

    it('200 привязка к производителю', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue({ id: 'g1', slug: 'rimi' });
      prisma.brandEntity.findUnique.mockResolvedValue({ id: 'e99' });
      prisma.$transaction.mockImplementation(async (fn) => {
        const tx = {
          categoryDisplayGroup: { update: vi.fn() },
          product: { updateMany: vi.fn() },
        };
        return fn(tx);
      });
      const res = await request(app)
        .patch('/api/admin/categories/k/brands/rimi')
        .set(auth())
        .send({ entitySlug: 'acme' });
      expect(res.status).toBe(200);
    });

    it('500 транзакция', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue({ id: 'g1', slug: 'rimi' });
      prisma.$transaction.mockRejectedValue(new Error('tx'));
      const res = await request(app)
        .patch('/api/admin/categories/k/brands/rimi')
        .set(auth())
        .send({ name: 'X' });
      expect(res.status).toBe(500);
    });
  });

  describe('DELETE /categories/:id/brands/:slug', () => {
    it('404 категория', async () => {
      prisma.category.findUnique.mockResolvedValue(null);
      const res = await request(app).delete('/api/admin/categories/k/brands/rimi').set(auth());
      expect(res.status).toBe(404);
    });

    it('404 бренд', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue(null);
      const res = await request(app).delete('/api/admin/categories/k/brands/rimi').set(auth());
      expect(res.status).toBe(404);
    });

    it('200 и deletedProducts', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue({ id: 'g1' });
      prisma.product.count.mockResolvedValue(3);
      prisma.categoryDisplayGroup.delete.mockResolvedValue({});
      const res = await request(app).delete('/api/admin/categories/k/brands/rimi').set(auth());
      expect(res.status).toBe(200);
      expect(res.body.deletedProducts).toBe(3);
    });

    it('500', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue({ id: 'g1' });
      prisma.product.count.mockResolvedValue(0);
      prisma.categoryDisplayGroup.delete.mockRejectedValue(new Error('db'));
      const res = await request(app).delete('/api/admin/categories/k/brands/rimi').set(auth());
      expect(res.status).toBe(500);
    });
  });

  describe('POST subcategories', () => {
    it('404 категория', async () => {
      prisma.category.findUnique.mockResolvedValue(null);
      const res = await request(app)
        .post('/api/admin/categories/k/brands/b/subcategories')
        .set(auth())
        .send({ name: 'Секция' });
      expect(res.status).toBe(404);
    });

    it('400 пустое имя', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue({
        id: 'g1',
        sections: [],
      });
      const res = await request(app)
        .post('/api/admin/categories/k/brands/b/subcategories')
        .set(auth())
        .send({ name: '' });
      expect(res.status).toBe(400);
    });

    it('404 бренд', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue(null);
      const res = await request(app)
        .post('/api/admin/categories/k/brands/b/subcategories')
        .set(auth())
        .send({ name: 'Секция' });
      expect(res.status).toBe(404);
    });

    it('500', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue({ id: 'g1', sections: [] });
      prisma.displayGroupSection.create.mockRejectedValue(new Error('db'));
      const res = await request(app)
        .post('/api/admin/categories/k/brands/b/subcategories')
        .set(auth())
        .send({ name: 'Секция' });
      expect(res.status).toBe(500);
    });
  });

  describe('POST products', () => {
    const chainOk = () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue({ id: 'g1', brandEntityId: null });
      prisma.displayGroupSection.findFirst.mockResolvedValue({ id: 's1' });
      prisma.product.count.mockResolvedValue(0);
    };

    it('404 категория', async () => {
      prisma.category.findUnique.mockResolvedValue(null);
      const res = await request(app)
        .post('/api/admin/categories/x/brands/b/subcategories/s/products')
        .set(auth())
        .send({ name: 'Т' });
      expect(res.status).toBe(404);
    });

    it('404 бренд', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue(null);
      const res = await request(app)
        .post('/api/admin/categories/k/brands/b/subcategories/s/products')
        .set(auth())
        .send({ name: 'Т' });
      expect(res.status).toBe(404);
    });

    it('404 подкатегория', async () => {
      prisma.category.findUnique.mockResolvedValue({ id: 'c1' });
      prisma.categoryDisplayGroup.findFirst.mockResolvedValue({ id: 'g1' });
      prisma.displayGroupSection.findFirst.mockResolvedValue(null);
      const res = await request(app)
        .post('/api/admin/categories/k/brands/b/subcategories/s/products')
        .set(auth())
        .send({ name: 'Т' });
      expect(res.status).toBe(404);
    });

    it('400 без названия', async () => {
      chainOk();
      const res = await request(app)
        .post('/api/admin/categories/k/brands/b/subcategories/s/products')
        .set(auth())
        .send({ name: '  ' });
      expect(res.status).toBe(400);
    });

    it('400 невалидное основное изображение', async () => {
      chainOk();
      const res = await request(app)
        .post('/api/admin/categories/k/brands/b/subcategories/s/products')
        .set(auth())
        .send({ name: 'Т', image: '/bad' });
      expect(res.status).toBe(400);
    });

    it('400 невалидное доп. фото', async () => {
      chainOk();
      const res = await request(app)
        .post('/api/admin/categories/k/brands/b/subcategories/s/products')
        .set(auth())
        .send({
          name: 'Т',
          extraImages: ['https://ok.com/a.jpg', '/bad-extra'],
        });
      expect(res.status).toBe(400);
    });

    it('201 с extraImages, priceAmount и priceCurrency', async () => {
      chainOk();
      prisma.$transaction.mockImplementation(async (fn) => {
        const prod = { id: 'pid' };
        const tx = {
          product: { create: vi.fn().mockResolvedValue(prod) },
          productCategory: { create: vi.fn() },
          productImage: { create: vi.fn() },
        };
        return fn(tx);
      });
      const res = await request(app)
        .post('/api/admin/categories/k/brands/b/subcategories/s/products')
        .set(auth())
        .send({
          name: 'Модель',
          price: '10',
          image: 'https://m.jpg',
          extraImages: ['https://e.jpg'],
          priceAmount: 1500.5,
          priceCurrency: 'rub',
        });
      expect(res.status).toBe(201);
    });

    it('500 транзакция', async () => {
      chainOk();
      prisma.$transaction.mockRejectedValue(new Error('tx'));
      const res = await request(app)
        .post('/api/admin/categories/k/brands/b/subcategories/s/products')
        .set(auth())
        .send({ name: 'Т' });
      expect(res.status).toBe(500);
    });
  });

  describe('PATCH /products/:id', () => {
    const existing = {
      id: 'int',
      publicId: 'pub-1',
      priceText: '100',
      imageUrl: 'https://m.jpg',
      source: 's',
      priceCurrency: 'RUB',
    };

    it('400 невалидное image', async () => {
      prisma.product.findUnique.mockResolvedValue(existing);
      const res = await request(app)
        .patch('/api/admin/products/pub-1')
        .set(auth())
        .send({ image: 'relative.jpg' });
      expect(res.status).toBe(400);
    });

    it('200 обновление primary productImage', async () => {
      prisma.product.findUnique.mockResolvedValue(existing);
      prisma.$transaction.mockImplementation(async (fn) => {
        const tx = {
          product: { update: vi.fn() },
          productImage: {
            findFirst: vi.fn().mockResolvedValue({ id: 'img1' }),
            update: vi.fn(),
            create: vi.fn(),
            deleteMany: vi.fn(),
          },
        };
        return fn(tx);
      });
      const res = await request(app)
        .patch('/api/admin/products/pub-1')
        .set(auth())
        .send({ image: 'https://new.jpg' });
      expect(res.status).toBe(200);
    });

    it('200 создание primary productImage если не было', async () => {
      prisma.product.findUnique.mockResolvedValue(existing);
      prisma.$transaction.mockImplementation(async (fn) => {
        const tx = {
          product: { update: vi.fn() },
          productImage: {
            findFirst: vi.fn().mockResolvedValue(null),
            update: vi.fn(),
            create: vi.fn(),
            deleteMany: vi.fn(),
          },
        };
        return fn(tx);
      });
      const res = await request(app)
        .patch('/api/admin/products/pub-1')
        .set(auth())
        .send({ image: 'https://new.jpg' });
      expect(res.status).toBe(200);
    });

    it('200 priceAmount null и priceCurrency', async () => {
      prisma.product.findUnique.mockResolvedValue(existing);
      prisma.$transaction.mockImplementation(async (fn) => {
        const tx = {
          product: { update: vi.fn() },
          productImage: {
            findFirst: vi.fn(),
            update: vi.fn(),
            create: vi.fn(),
            deleteMany: vi.fn(),
          },
        };
        return fn(tx);
      });
      const res = await request(app)
        .patch('/api/admin/products/pub-1')
        .set(auth())
        .send({ priceAmount: null, priceCurrency: 'usd' });
      expect(res.status).toBe(200);
    });

    it('200 specs и published', async () => {
      prisma.product.findUnique.mockResolvedValue(existing);
      prisma.$transaction.mockImplementation(async (fn) => {
        const tx = {
          product: { update: vi.fn() },
          productImage: {
            findFirst: vi.fn(),
            update: vi.fn(),
            create: vi.fn(),
            deleteMany: vi.fn(),
          },
        };
        return fn(tx);
      });
      const res = await request(app)
        .patch('/api/admin/products/pub-1')
        .set(auth())
        .send({ specs: { w: 1 }, published: false });
      expect(res.status).toBe(200);
    });

    it('500 транзакция', async () => {
      prisma.product.findUnique.mockResolvedValue(existing);
      prisma.$transaction.mockRejectedValue(new Error('tx'));
      const res = await request(app).patch('/api/admin/products/pub-1').set(auth()).send({ name: 'Z' });
      expect(res.status).toBe(500);
    });
  });

  describe('DELETE /products/:id', () => {
    it('500 не P2025', async () => {
      prisma.product.delete.mockRejectedValue(new Error('db'));
      const res = await request(app).delete('/api/admin/products/x').set(auth());
      expect(res.status).toBe(500);
    });
  });

  describe('brand-entities', () => {
    it('POST 400 невалидный logoUrl', async () => {
      prisma.brandEntity.findMany.mockResolvedValue([]);
      const res = await request(app)
        .post('/api/admin/brand-entities')
        .set(auth())
        .send({ name: 'B', logoUrl: '/not-media/x.jpg' });
      expect(res.status).toBe(400);
    });

    it('POST с явным slug и sortOrder', async () => {
      prisma.brandEntity.findMany.mockResolvedValue([]);
      prisma.brandEntity.create.mockResolvedValue({});
      const res = await request(app)
        .post('/api/admin/brand-entities')
        .set(auth())
        .send({
          name: 'Acme',
          slug: '  my-brand  ',
          sortOrder: 5,
          logoUrl: 'https://l.jpg',
        });
      expect(res.status).toBe(201);
    });

    it('POST с пустыми website и description', async () => {
      prisma.brandEntity.findMany.mockResolvedValue([]);
      prisma.brandEntity.aggregate.mockResolvedValue({ _max: { sortOrder: 0 } });
      prisma.brandEntity.create.mockResolvedValue({});
      const res = await request(app)
        .post('/api/admin/brand-entities')
        .set(auth())
        .send({ name: 'Co', website: '', description: '  ' });
      expect(res.status).toBe(201);
    });

    it('POST sortOrder не число — остаётся ветка aggregate', async () => {
      prisma.brandEntity.findMany.mockResolvedValue([]);
      prisma.brandEntity.aggregate.mockResolvedValue({ _max: { sortOrder: 1 } });
      prisma.brandEntity.create.mockResolvedValue({});
      const res = await request(app)
        .post('/api/admin/brand-entities')
        .set(auth())
        .send({ name: 'Co', sortOrder: 'nope' });
      expect(res.status).toBe(201);
    });

    it('POST 500', async () => {
      prisma.brandEntity.findMany.mockResolvedValue([]);
      prisma.brandEntity.aggregate.mockResolvedValue({ _max: { sortOrder: 0 } });
      prisma.brandEntity.create.mockRejectedValue(new Error('db'));
      const res = await request(app).post('/api/admin/brand-entities').set(auth()).send({ name: 'B' });
      expect(res.status).toBe(500);
    });

    it('GET 500', async () => {
      prisma.brandEntity.findMany.mockRejectedValue(new Error('db'));
      const res = await request(app).get('/api/admin/brand-entities').set(auth());
      expect(res.status).toBe(500);
    });

    it('DELETE 200', async () => {
      prisma.brandEntity.findUnique.mockResolvedValue({ slug: 'x' });
      prisma.brandEntity.delete.mockResolvedValue({});
      const res = await request(app).delete('/api/admin/brand-entities/acme-x').set(auth());
      expect(res.status).toBe(200);
    });

    it('DELETE 500', async () => {
      prisma.brandEntity.findUnique.mockResolvedValue({ slug: 'x' });
      prisma.brandEntity.delete.mockRejectedValue(new Error('db'));
      const res = await request(app).delete('/api/admin/brand-entities/acme-x').set(auth());
      expect(res.status).toBe(500);
    });

    it('PATCH 404', async () => {
      prisma.brandEntity.findUnique.mockResolvedValue(null);
      const res = await request(app).patch('/api/admin/brand-entities/missing').set(auth()).send({ name: 'X' });
      expect(res.status).toBe(404);
    });

    it('PATCH 400 невалидный логотип', async () => {
      prisma.brandEntity.findUnique.mockResolvedValue({ slug: 'b' });
      const res = await request(app)
        .patch('/api/admin/brand-entities/b')
        .set(auth())
        .send({ logoUrl: 'ftp://x' });
      expect(res.status).toBe(400);
    });

    it('PATCH 200 частичное обновление', async () => {
      prisma.brandEntity.findUnique.mockResolvedValue({ slug: 'b' });
      prisma.brandEntity.update.mockResolvedValue({});
      const res = await request(app)
        .patch('/api/admin/brand-entities/b')
        .set(auth())
        .send({ website: 'https://w.com', description: 'd', sortOrder: 2 });
      expect(res.status).toBe(200);
    });

    it('PATCH 200 сброс logoUrl (пустая строка → null)', async () => {
      prisma.brandEntity.findUnique.mockResolvedValue({ slug: 'b' });
      prisma.brandEntity.update.mockResolvedValue({});
      const res = await request(app)
        .patch('/api/admin/brand-entities/b')
        .set(auth())
        .send({ logoUrl: '' });
      expect(res.status).toBe(200);
      expect(prisma.brandEntity.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ logoUrl: null }),
        })
      );
    });

    it('PATCH имя только пробелы — не меняет name, но может обновить другое поле', async () => {
      prisma.brandEntity.findUnique.mockResolvedValue({ slug: 'b' });
      prisma.brandEntity.update.mockResolvedValue({});
      const res = await request(app)
        .patch('/api/admin/brand-entities/b')
        .set(auth())
        .send({ name: '   ', website: 'https://only-web.com' });
      expect(res.status).toBe(200);
      expect(prisma.brandEntity.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { website: 'https://only-web.com' },
        })
      );
    });

    it('PATCH 500', async () => {
      prisma.brandEntity.findUnique.mockResolvedValue({ slug: 'b' });
      prisma.brandEntity.update.mockRejectedValue(new Error('db'));
      const res = await request(app).patch('/api/admin/brand-entities/b').set(auth()).send({ name: 'N' });
      expect(res.status).toBe(500);
    });

    it('PATCH sortOrder не число — не добавляет поле', async () => {
      prisma.brandEntity.findUnique.mockResolvedValue({ slug: 'b' });
      prisma.brandEntity.update.mockResolvedValue({});
      const res = await request(app)
        .patch('/api/admin/brand-entities/b')
        .set(auth())
        .send({ sortOrder: 'x' });
      expect(res.status).toBe(200);
      expect(prisma.brandEntity.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: {} })
      );
    });

    it('PATCH product priceCurrency из пробелов → сохраняется существующая', async () => {
      prisma.product.findUnique.mockResolvedValue({
        id: 'int',
        publicId: 'pub-1',
        priceText: '100',
        imageUrl: 'https://m.jpg',
        source: 's',
        priceCurrency: 'RUB',
      });
      prisma.$transaction.mockImplementation(async (fn) => {
        const tx = {
          product: { update: vi.fn() },
          productImage: {
            findFirst: vi.fn(),
            update: vi.fn(),
            create: vi.fn(),
            deleteMany: vi.fn(),
          },
        };
        return fn(tx);
      });
      const res = await request(app)
        .patch('/api/admin/products/pub-1')
        .set(auth())
        .send({ priceCurrency: '   ' });
      expect(res.status).toBe(200);
    });
  });
});
