import { isStoredMediaPath } from './storedMedia.js';

function isAllowedHttpUrl(t) {
  if (/^https:\/\//i.test(t)) return true;
  if (process.env.ALLOW_HTTP_IMAGE_URLS === '1' && /^http:\/\//i.test(t)) return true;
  return false;
}

/** Разрешены https (и опционально http), либо путь `/api/media/:uuid`. */
export function isAllowedImageReference(s) {
  const t = String(s || '').trim();
  if (!t) return false;
  if (isAllowedHttpUrl(t)) return true;
  return isStoredMediaPath(t);
}

/** Пустая строка — невалидна как «картинка»; null снимает поле (логотип). */
export function isAllowedOptionalLogoReference(s) {
  if (s === null || s === undefined) return true;
  const t = String(s).trim();
  if (!t) return true;
  return isAllowedImageReference(t);
}
