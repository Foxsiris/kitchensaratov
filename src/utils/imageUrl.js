import { apiUrl } from '../config/api';

/** Ссылка на загруженный в БД файл (отдаётся через GET /api/media/:id). */
export const STORED_IMAGE_PATH_RE =
  /^\/api\/media\/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidCatalogImageUrl(s) {
  const t = (s || '').trim();
  if (!t) return true;
  if (/^https?:\/\//i.test(t)) return true;
  return STORED_IMAGE_PATH_RE.test(t);
}

/** Для превью в `<img>` / background: внешний URL как есть, иначе через apiUrl. */
export function resolveImageSrcForDisplay(url, apiUrlFn) {
  const t = (url || '').trim();
  if (!t) return '';
  if (/^https?:\/\//i.test(t) || t.startsWith('//')) return t;
  const path = t.startsWith('/') ? t : `/${t}`;
  return apiUrlFn(path);
}

/** Резолв URL картинки из каталога для отображения (тот же базовый API, что у фронта). */
export function resolveCatalogImageSrc(url) {
  return resolveImageSrcForDisplay(url, apiUrl);
}
