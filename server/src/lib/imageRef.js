import { isStoredMediaPath } from './storedMedia.js';

/** Разрешены только https/http или загруженный файл `/api/media/:uuid`. */
export function isAllowedImageReference(s) {
  const t = String(s || '').trim();
  if (!t) return false;
  if (/^https?:\/\//i.test(t)) return true;
  return isStoredMediaPath(t);
}

/** Пустая строка — невалидна как «картинка»; null снимает поле (логотип). */
export function isAllowedOptionalLogoReference(s) {
  if (s === null || s === undefined) return true;
  const t = String(s).trim();
  if (!t) return true;
  return isAllowedImageReference(t);
}
