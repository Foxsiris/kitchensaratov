-- Товароцентричная модель: витринные таблицы переименованы, M:N с категориями, галерея, parent_id у категорий.
-- Совместимо с цепочкой: init → brand_entities.

-- Витринная группа (ранее brands)
ALTER TABLE "brands" RENAME TO "category_display_groups";

-- Секции (ранее subcategories)
ALTER TABLE "subcategories" RENAME COLUMN "brand_id" TO "display_group_id";
ALTER TABLE "subcategories" RENAME TO "display_group_sections";

-- Товар привязан к секции
ALTER TABLE "products" RENAME COLUMN "subcategory_id" TO "section_id";

-- Опциональная прямая ссылка на глобального производителя
ALTER TABLE "products" ADD COLUMN "brand_entity_id" UUID;

ALTER TABLE "products" ADD CONSTRAINT "products_brand_entity_id_fkey" FOREIGN KEY ("brand_entity_id") REFERENCES "brand_entities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE INDEX "products_brand_entity_id_idx" ON "products"("brand_entity_id");

UPDATE "products" AS p
SET "brand_entity_id" = g."brand_entity_id"
FROM "display_group_sections" AS s
INNER JOIN "category_display_groups" AS g ON g."id" = s."display_group_id"
WHERE p."section_id" = s."id";

-- Иерархия категорий (по умолчанию плоская)
ALTER TABLE "categories" ADD COLUMN "parent_id" UUID;

ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE INDEX "categories_parent_id_idx" ON "categories"("parent_id");

-- M:N товар ↔ категория (одна primary на товар — частичный уникальный индекс)
CREATE TABLE "product_categories" (
    "product_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("product_id", "category_id")
);

ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE INDEX "product_categories_category_id_idx" ON "product_categories"("category_id");

CREATE UNIQUE INDEX "product_categories_one_primary_idx" ON "product_categories" ("product_id") WHERE "is_primary" = true;

INSERT INTO "product_categories" ("product_id", "category_id", "is_primary")
SELECT p."id", g."category_id", true
FROM "products" p
INNER JOIN "display_group_sections" s ON s."id" = p."section_id"
INNER JOIN "category_display_groups" g ON g."id" = s."display_group_id";

-- Галерея изображений
CREATE TABLE "product_images" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "alt" VARCHAR(512),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE INDEX "product_images_product_id_sort_order_idx" ON "product_images"("product_id", "sort_order");

INSERT INTO "product_images" ("product_id", "url", "sort_order")
SELECT "id", "image_url", 0 FROM "products";
