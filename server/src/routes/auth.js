import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';

const router = Router();

const skipRateLimitInTests = () => process.env.VITEST === 'true' || process.env.NODE_ENV === 'test';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Слишком много попыток входа. Повторите позже.' },
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipRateLimitInTests,
});

router.post('/login', loginLimiter, async (req, res) => {
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  if (!password) {
    return res.status(400).json({ error: 'Пароль обязателен' });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ error: 'JWT_SECRET is not configured' });
  }

  const admin = await prisma.adminUser.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' },
  });

  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    return res.status(401).json({ error: 'Неверный пароль' });
  }

  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { lastLoginAt: new Date() },
  });

  const token = jwt.sign({ sub: admin.id }, secret, { expiresIn: '7d' });
  return res.json({ token });
});

export default router;
