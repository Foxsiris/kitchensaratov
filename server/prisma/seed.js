import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';
import { randomUUID } from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();

function resolveCatalogPath() {
  const inImage = path.join(__dirname, '../seed/catalogData.js');
  if (fs.existsSync(inImage)) return inImage;
  return path.join(__dirname, '../../src/data/catalogData.js');
}

async function ensureAdmin() {
  const count = await prisma.adminUser.count();
  if (count > 0) return;
  const password = process.env.ADMIN_PASSWORD || 'changeme';
  const email = process.env.ADMIN_EMAIL || 'admin@kitchensaratov.local';
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.create({
    data: { email, passwordHash },
  });
  console.log(`Admin user created: ${email} (set ADMIN_PASSWORD in production)`);
}

async function seedCatalog() {
  const existing = await prisma.category.count();
  if (existing > 0) {
    console.log('Catalog seed skipped: categories already exist');
    return;
  }

  const catalogPath = resolveCatalogPath();
  const { categories } = await import(pathToFileURL(catalogPath).href);

  let catOrder = 0;
  for (const cat of categories) {
    const createdCat = await prisma.category.create({
      data: {
        slug: cat.id,
        name: cat.name,
        imageUrl: cat.image,
        sortOrder: catOrder++,
      },
    });

    let groupOrder = 0;
    for (const brand of cat.brands) {
      const groupUuid = randomUUID();
      let brandEntityId = null;
      if (brand.id !== 'default') {
        const ent = await prisma.brandEntity.upsert({
          where: { slug: brand.id },
          create: { slug: brand.id, name: brand.name },
          update: {},
        });
        brandEntityId = ent.id;
      }
      await prisma.categoryDisplayGroup.create({
        data: {
          id: groupUuid,
          categoryId: createdCat.id,
          slug: brand.id,
          name: brand.name,
          sortOrder: groupOrder++,
          brandEntityId,
        },
      });

      let subOrder = 0;
      for (const sub of brand.subcategories) {
        const sectionUuid = randomUUID();
        await prisma.displayGroupSection.create({
          data: {
            id: sectionUuid,
            displayGroupId: groupUuid,
            slug: sub.id,
            name: sub.name,
            sortOrder: subOrder++,
          },
        });

        let pOrder = 0;
        for (const p of sub.products) {
          const prod = await prisma.product.create({
            data: {
              publicId: p.id,
              sectionId: sectionUuid,
              brandEntityId,
              name: p.name,
              priceText: p.price,
              description: p.description || '',
              imageUrl: p.image,
              source: p.source || '',
              specs: p.specs ?? undefined,
              sortOrder: pOrder++,
              published: true,
            },
          });
          await prisma.productCategory.create({
            data: {
              productId: prod.id,
              categoryId: createdCat.id,
              isPrimary: true,
            },
          });
          await prisma.productImage.create({
            data: {
              productId: prod.id,
              url: p.image,
              sortOrder: 0,
            },
          });
        }
      }
    }
  }
  console.log(`Catalog seeded from ${catalogPath}`);
}

async function main() {
  await seedCatalog();
  await ensureAdmin();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
