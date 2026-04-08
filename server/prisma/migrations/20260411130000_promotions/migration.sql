-- CreateTable
CREATE TABLE "promotions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "dark" BOOLEAN NOT NULL DEFAULT false,
    "badge" VARCHAR(256) NOT NULL,
    "title" VARCHAR(512) NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "price_display" VARCHAR(512) NOT NULL,
    "action_label" VARCHAR(256) NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "promotions_sort_order_idx" ON "promotions"("sort_order");
