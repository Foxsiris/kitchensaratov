-- Схема каталога: суррогатные UUID, отдельные slug, числовая цена (опционально).
-- При смене этой миграции на уже заполненной БД выполните: prisma migrate reset или пересоздайте том Postgres.

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" VARCHAR(128) NOT NULL,
    "name" VARCHAR(512) NOT NULL,
    "image_url" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "category_id" UUID NOT NULL,
    "slug" VARCHAR(128) NOT NULL,
    "name" VARCHAR(512) NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subcategories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "brand_id" UUID NOT NULL,
    "slug" VARCHAR(128) NOT NULL,
    "name" VARCHAR(512) NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subcategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "public_id" VARCHAR(256) NOT NULL,
    "subcategory_id" UUID NOT NULL,
    "name" VARCHAR(512) NOT NULL,
    "price_text" VARCHAR(512) NOT NULL,
    "price_amount" DECIMAL(14,2),
    "price_currency" VARCHAR(3) NOT NULL DEFAULT 'RUB',
    "description" TEXT NOT NULL DEFAULT '',
    "image_url" TEXT NOT NULL,
    "source" VARCHAR(256) NOT NULL DEFAULT '',
    "specs" JSONB,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(256) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" VARCHAR(32) NOT NULL DEFAULT 'admin',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "categories_sort_order_idx" ON "categories"("sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "brands_category_id_slug_key" ON "brands"("category_id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "subcategories_brand_id_slug_key" ON "subcategories"("brand_id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "products_public_id_key" ON "products"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- CreateIndex
CREATE INDEX "brands_category_id_idx" ON "brands"("category_id");

-- CreateIndex
CREATE INDEX "subcategories_brand_id_idx" ON "subcategories"("brand_id");

-- CreateIndex
CREATE INDEX "products_subcategory_id_published_sort_order_idx" ON "products"("subcategory_id", "published", "sort_order");

-- CreateIndex
CREATE INDEX "admin_users_is_active_idx" ON "admin_users"("is_active");

-- Частичный индекс под публичную выдачу (только опубликованные позиции в подкатегории)
CREATE INDEX "products_live_by_subcategory_idx" ON "products" ("subcategory_id", "sort_order") WHERE "published" = true;

-- AddForeignKey
ALTER TABLE "brands" ADD CONSTRAINT "brands_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subcategories" ADD CONSTRAINT "subcategories_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "subcategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
