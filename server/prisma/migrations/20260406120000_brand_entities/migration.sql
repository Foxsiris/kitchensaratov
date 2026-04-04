-- Глобальные бренды + связь с витринными brands (по slug, кроме placeholder "default").

CREATE TABLE "brand_entities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" VARCHAR(128) NOT NULL,
    "name" VARCHAR(512) NOT NULL,
    "logo_url" TEXT,
    "website" VARCHAR(512),
    "description" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brand_entities_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "brand_entities_slug_key" ON "brand_entities"("slug");
CREATE INDEX "brand_entities_sort_order_idx" ON "brand_entities"("sort_order");

ALTER TABLE "brands" ADD COLUMN "brand_entity_id" UUID;

INSERT INTO "brand_entities" ("id", "slug", "name", "created_at", "updated_at")
SELECT gen_random_uuid(), b."slug", MIN(b."name"), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "brands" b
WHERE b."slug" <> 'default'
GROUP BY b."slug";

UPDATE "brands" AS br
SET "brand_entity_id" = be."id"
FROM "brand_entities" AS be
WHERE br."slug" = be."slug" AND br."slug" <> 'default';

ALTER TABLE "brands" ADD CONSTRAINT "brands_brand_entity_id_fkey" FOREIGN KEY ("brand_entity_id") REFERENCES "brand_entities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE INDEX "brands_brand_entity_id_idx" ON "brands"("brand_entity_id");
