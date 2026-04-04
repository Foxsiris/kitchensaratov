const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80';

function decimalToNumber(v) {
  if (v == null) return null;
  if (typeof v === 'number') return v;
  if (typeof v === 'object' && v !== null && typeof v.toNumber === 'function') return v.toNumber();
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

/** Упорядоченные уникальные URL из product_images; если строк нет — [imageUrl]. */
export function orderedProductImageUrls(product) {
  const rows = Array.isArray(product.images)
    ? [...product.images].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    : [];
  const urls = rows.map((r) => r.url).filter(Boolean);
  const seen = new Set();
  const unique = urls.filter((u) => (seen.has(u) ? false : (seen.add(u), true)));
  const main = product.imageUrl != null ? String(product.imageUrl).trim() : '';
  if (unique.length === 0 && main) return [main];
  return unique;
}

function mapProduct(p) {
  const o = {
    id: p.publicId,
    name: p.name,
    price: p.priceText,
    description: p.description,
    image: p.imageUrl,
    source: p.source,
  };
  if (p.specs != null && typeof p.specs === 'object') {
    o.specs = p.specs;
  }
  const amt = decimalToNumber(p.priceAmount);
  if (amt != null) {
    o.priceAmount = amt;
    o.priceCurrency = p.priceCurrency || 'RUB';
  }
  const gallery = orderedProductImageUrls(p);
  if (gallery.length > 1) {
    o.images = gallery;
  }
  return o;
}

function resolveBrandEntity(product, displayGroup) {
  return product.brandEntity || displayGroup.brandEntity || null;
}

/**
 * Формат для фронтенда: category.id и «бренд»/подуровни — slug; product.id = publicId.
 * Ключ brands сохранён для совместимости UI (витринные группы).
 */
export function formatCatalogTree(categories, { publishedOnly } = { publishedOnly: true }) {
  return categories.map((c) => ({
    id: c.slug,
    name: c.name,
    image: c.imageUrl,
    brands: c.displayGroups.map((g) => ({
      id: g.slug,
      name: g.name,
      ...(g.brandEntity
        ? {
            entitySlug: g.brandEntity.slug,
            entityName: g.brandEntity.name,
            ...(g.brandEntity.logoUrl ? { entityLogo: g.brandEntity.logoUrl } : {}),
            ...(g.brandEntity.website ? { entityWebsite: g.brandEntity.website } : {}),
          }
        : {}),
      subcategories: g.sections.map((s) => ({
        id: s.slug,
        name: s.name,
        products: s.products
          .filter((p) => !publishedOnly || p.published)
          .map(mapProduct),
      })),
    })),
  }));
}

export function formatProductDetail(found) {
  if (!found) return null;
  const { product, category, displayGroup, section } = found;
  const entity = resolveBrandEntity(product, displayGroup);
  const out = {
    ...mapProduct(product),
    categoryId: category.slug,
    categoryName: category.name,
    brandId: displayGroup.slug,
    brandName: displayGroup.name,
    subcategoryName: section.name,
  };
  if (entity) {
    out.entitySlug = entity.slug;
    out.entityName = entity.name;
    if (entity.logoUrl) out.entityLogo = entity.logoUrl;
    if (entity.website) out.entityWebsite = entity.website;
  }

  const links = product.categories || [];
  if (links.length > 0) {
    out.categories = links
      .map((pc) => ({
        id: pc.category.slug,
        name: pc.category.name,
        isPrimary: pc.isPrimary,
      }))
      .sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary));
  }

  const uniqueUrls = orderedProductImageUrls(product);
  if (uniqueUrls.length > 1 || (uniqueUrls.length === 1 && uniqueUrls[0] !== product.imageUrl)) {
    out.images = uniqueUrls;
  }

  return out;
}

export { DEFAULT_IMAGE };
