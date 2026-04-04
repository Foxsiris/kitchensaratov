import { describe, it, expect, beforeEach, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import { prisma } from '../db.js';
import authRoutes from './auth.js';

vi.mock('../db.js', () => ({
  prisma: {
    adminUser: {
      findFirst: vi.fn(),
      update: vi.fn(),
    },
  },
}));

async function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/', authRoutes);
  return app;
}

describe('POST /login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret-key-for-jwt-signing-32b';
  });

  it('400 без пароля', async () => {
    const app = await createApp();
    const res = await request(app).post('/login').send({});
    expect(res.status).toBe(400);
  });

  it('401 неверный пароль', async () => {
    prisma.adminUser.findFirst.mockResolvedValue({
      id: 'u1',
      passwordHash: await bcrypt.hash('right', 4),
    });
    const app = await createApp();
    const res = await request(app).post('/login').send({ password: 'wrong' });
    expect(res.status).toBe(401);
  });

  it('200 и token при верном пароле', async () => {
    const hash = await bcrypt.hash('secret', 4);
    prisma.adminUser.findFirst.mockResolvedValue({ id: 'u1', passwordHash: hash });
    prisma.adminUser.update.mockResolvedValue({});
    const app = await createApp();
    const res = await request(app).post('/login').send({ password: 'secret' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
    expect(prisma.adminUser.update).toHaveBeenCalled();
  });
});
