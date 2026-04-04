-- Хранение бинарных изображений для каталога (загрузка из админки).
CREATE TABLE "stored_images" (
    "id" UUID NOT NULL,
    "mime_type" VARCHAR(128) NOT NULL,
    "data" BYTEA NOT NULL,
    "filename" VARCHAR(512),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stored_images_pkey" PRIMARY KEY ("id")
);
