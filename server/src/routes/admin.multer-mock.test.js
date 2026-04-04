import { describe, it, expect, beforeEach, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';

vi.mock('multer', () => {
  const MulterError = class MulterError extends Error {
    constructor(code) {
      super(code);
      this.code = code;
    }
  };
  const multer = () => ({
    single: () => (_req, _res, next) => {
      next(new MulterError('OTHER_CODE'));
    },
  });
  multer.memoryStorage = () => ({});
  multer.MulterError = MulterError;
  return { default: multer };
});

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

describe('admin POST /upload — multer прочая ошибка', () => {
  let app;

  beforeEach(async () => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = SECRET;
    const a = express();
    a.use(express.json());
    a.use('/api/admin', adminRoutes);
    app = a;
  });

  it('400 «Не удалось принять файл» при MulterError не LIMIT_FILE_SIZE', async () => {
    const token = jwt.sign({ sub: 'admin-1' }, SECRET, { expiresIn: '1h' });
    const jpeg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0, 0]);
    const res = await request(app)
      .post('/api/admin/upload')
      .set({ Authorization: `Bearer ${token}` })
      .attach('file', jpeg, { filename: 'x.jpg', contentType: 'image/jpeg' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Не удалось принять файл');
  });
});
