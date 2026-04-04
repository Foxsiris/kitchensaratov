/**
 * Сброс пароля первого администратора (по дате создания).
 * Запуск в контейнере: node scripts/set-admin-password.mjs <новый_пароль>
 * Или: ADMIN_PASSWORD=secret node scripts/set-admin-password.mjs
 */
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const pwd = process.argv[2] || process.env.ADMIN_PASSWORD;
if (!pwd || !String(pwd).trim()) {
  console.error('Usage: node scripts/set-admin-password.mjs <password>');
  process.exit(1);
}

const prisma = new PrismaClient();
try {
  const hash = await bcrypt.hash(String(pwd).trim(), 12);
  const u = await prisma.adminUser.findFirst({ orderBy: { createdAt: 'asc' } });
  if (!u) {
    console.error('No admin_users row. Run seed or create user first.');
    process.exit(1);
  }
  await prisma.adminUser.update({ where: { id: u.id }, data: { passwordHash: hash } });
  console.log(`Password updated for ${u.email}`);
} finally {
  await prisma.$disconnect();
}
