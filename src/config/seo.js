/**
 * Сайт: канонические URL, OG-изображения, JSON-LD.
 * REACT_APP_SITE_URL — публичный origin без слэша, например https://www.example.com
 * (для Open Graph, canonical и sitemap при сборке).
 */
export const SITE_NAME = 'Кухни Саратов';
export const DEFAULT_HOME_TITLE = 'Кухни Саратов — Премиум интерьеры';
export const DEFAULT_DESCRIPTION =
  'Кухни Саратов — кухни и мебель премиум-класса по индивидуальным проектам. Салон в Саратове, каталог, проекты с дизайнерами.';

/** Ограничение длины для meta description. */
export function truncateMeta(text, max = 155) {
  const t = (text || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}

export function getSiteOrigin() {
  const env = (process.env.REACT_APP_SITE_URL || '').trim().replace(/\/$/, '');
  if (env) return env;
  if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin;
  return '';
}

/**
 * Абсолютный URL для og:image и JSON-LD.
 * Внешние https-ссылки не трогаем; пути /… дополняем origin.
 */
export function absoluteUrl(pathOrUrl) {
  const s = (pathOrUrl || '').trim();
  if (!s) return '';
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith('//')) return `https:${s}`;
  const origin = getSiteOrigin();
  if (!origin) return s;
  const p = s.startsWith('/') ? s : `/${s}`;
  return `${origin}${p}`;
}

export const DEFAULT_OG_IMAGE_PATH = '/assets/brand-interika-logo.png';

export function pageTitle(pagePart) {
  if (!pagePart) return DEFAULT_HOME_TITLE;
  return `${pagePart} — ${SITE_NAME}`;
}

/**
 * @param {string} origin — из getSiteOrigin()
 */
export function buildOrganizationJsonLd(origin) {
  if (!origin) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: SITE_NAME,
    url: `${origin}/`,
    description: DEFAULT_DESCRIPTION,
    image: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
  };
}

/**
 * @param {object} product — карточка из каталога
 * @param {{ canonicalUrl: string, imageUrl: string }} opts
 */
export function buildProductJsonLd(product, opts) {
  if (!product || !opts?.canonicalUrl) return null;
  const { canonicalUrl, imageUrl } = opts;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: truncateMeta(product.description, 5000),
    image: imageUrl || undefined,
    brand: product.brandName
      ? {
          '@type': 'Brand',
          name: product.brandName,
        }
      : undefined,
    url: canonicalUrl,
  };
}
