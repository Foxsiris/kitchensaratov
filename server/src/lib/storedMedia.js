/** UUID в пути `/api/media/:id` (Prisma @db.Uuid). */
export const STORED_MEDIA_UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isStoredMediaId(id) {
  return typeof id === 'string' && STORED_MEDIA_UUID_RE.test(id);
}

/** Путь вида `/api/media/<uuid>` из полей каталога. */
export function isStoredMediaPath(s) {
  const t = String(s || '').trim();
  return /^\/api\/media\/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    t
  );
}
