import { describe, it, expect } from 'vitest';
import {
  formatCatalogTree,
  formatProductDetail,
  DEFAULT_IMAGE,
  orderedProductImageUrls,
} from './catalogFormat.js';

const categoryRow = {
  slug: 'kitchens',
  name: 'Кухни',
  imageUrl: 'https://img/cat.jpg',
  displayGroups: [
    {
      slug: 'rimi',
      name: 'Рими',
      brandEntity: {
        slug: 'rimi-ent',
        name: 'Rimi Co',
        logoUrl: 'https://logo',
        website: 'https://w',
      },
      sections: [
        {
          slug: 'modern',
          name: 'Современные',
          products: [
            {
              publicId: 'luna',
              name: 'Луна',
              priceText: '100 000 ₽',
              priceAmount: null,
              priceCurrency: 'RUB',
              description: 'd',
              imageUrl: 'https://p.jpg',
              source: 's',
              published: true,
            },
            {
              publicId: 'hidden',
              name: 'Скрытый',
              priceText: '0',
              description: '',
              imageUrl: 'https://x',
              source: '',
              published: false,
            },
          ],
        },
      ],
    },
  ],
};

describe('orderedProductImageUrls', () => {
  it('пустые строки в БД → fallback на imageUrl', () => {
    expect(
      orderedProductImageUrls({
        imageUrl: 'https://only-main.jpg',
        images: [],
      })
    ).toEqual(['https://only-main.jpg']);
  });

  it('сортирует по sortOrder и убирает дубликаты URL', () => {
    expect(
      orderedProductImageUrls({
        imageUrl: 'https://main.jpg',
        images: [
          { url: 'https://b.jpg', sortOrder: 2 },
          { url: 'https://a.jpg', sortOrder: 1 },
          { url: 'https://a.jpg', sortOrder: 0 },
        ],
      })
    ).toEqual(['https://a.jpg', 'https://b.jpg']);
  });
});

describe('formatCatalogTree', () => {
  it('мапит slug и скрывает неопубликованные при publishedOnly', () => {
    const out = formatCatalogTree([categoryRow], { publishedOnly: true });
    expect(out[0].id).toBe('kitchens');
    expect(out[0].brands[0].id).toBe('rimi');
    expect(out[0].brands[0].entitySlug).toBe('rimi-ent');
    expect(out[0].brands[0].subcategories[0].products).toHaveLength(1);
    expect(out[0].brands[0].subcategories[0].products[0].id).toBe('luna');
  });

  it('publishedOnly false показывает все товары', () => {
    const out = formatCatalogTree([categoryRow], { publishedOnly: false });
    expect(out[0].brands[0].subcategories[0].products).toHaveLength(2);
  });

  it('пробрасывает images при нескольких фото', () => {
    const row = {
      slug: 'kitchens',
      name: 'Кухни',
      imageUrl: 'https://img/cat.jpg',
      displayGroups: [
        {
          slug: 'rimi',
          name: 'Рими',
          brandEntity: null,
          sections: [
            {
              slug: 'modern',
              name: 'Современные',
              products: [
                {
                  publicId: 'luna',
                  name: 'Луна',
                  priceText: '100 000 ₽',
                  priceAmount: null,
                  priceCurrency: 'RUB',
                  description: 'd',
                  imageUrl: 'https://main.jpg',
                  source: 's',
                  published: true,
                  images: [
                    { url: 'https://main.jpg', sortOrder: 0 },
                    { url: 'https://g2.jpg', sortOrder: 1 },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    const out = formatCatalogTree([row], { publishedOnly: true });
    const p = out[0].brands[0].subcategories[0].products[0];
    expect(p.images).toEqual(['https://main.jpg', 'https://g2.jpg']);
  });

  it('витринная группа: только website у производителя / только logo', () => {
    const onlyWeb = {
      slug: 'k',
      name: 'К',
      imageUrl: 'https://c.jpg',
      displayGroups: [
        {
          slug: 'b',
          name: 'B',
          brandEntity: { slug: 'e', name: 'E', website: 'https://w.example' },
          sections: [{ slug: 's', name: 'S', products: [] }],
        },
      ],
    };
    const onlyLogo = {
      slug: 'k2',
      name: 'К2',
      imageUrl: 'https://c.jpg',
      displayGroups: [
        {
          slug: 'b',
          name: 'B',
          brandEntity: { slug: 'e', name: 'E', logoUrl: 'https://logo' },
          sections: [{ slug: 's', name: 'S', products: [] }],
        },
      ],
    };
    const a = formatCatalogTree([onlyWeb], { publishedOnly: true })[0].brands[0];
    expect(a.entityWebsite).toBe('https://w.example');
    expect(a.entityLogo).toBeUndefined();
    const b = formatCatalogTree([onlyLogo], { publishedOnly: true })[0].brands[0];
    expect(b.entityLogo).toBe('https://logo');
    expect(b.entityWebsite).toBeUndefined();
  });

  it('specs, priceAmount как число и как объект с toNumber', () => {
    const row = {
      slug: 'k',
      name: 'К',
      imageUrl: 'https://c.jpg',
      displayGroups: [
        {
          slug: 'b',
          name: 'B',
          brandEntity: null,
          sections: [
            {
              slug: 's',
              name: 'S',
              products: [
                {
                  publicId: 'p1',
                  name: 'P',
                  priceText: '10',
                  priceAmount: 100,
                  priceCurrency: 'EUR',
                  description: '',
                  imageUrl: 'https://i.jpg',
                  source: '',
                  published: true,
                  specs: { w: '1' },
                },
                {
                  publicId: 'p0',
                  name: 'Dec',
                  priceText: '0',
                  priceAmount: { toNumber: () => 42.25 },
                  priceCurrency: 'USD',
                  description: '',
                  imageUrl: 'https://i0.jpg',
                  source: '',
                  published: true,
                },
                {
                  publicId: 'p2',
                  name: 'NaN price',
                  priceText: '0',
                  priceAmount: 'not-a-number',
                  priceCurrency: null,
                  description: '',
                  imageUrl: 'https://i2.jpg',
                  source: '',
                  published: true,
                },
              ],
            },
          ],
        },
      ],
    };
    const out = formatCatalogTree([row], { publishedOnly: true });
    const [a, dec, nanP] = out[0].brands[0].subcategories[0].products;
    expect(a.specs).toEqual({ w: '1' });
    expect(a.priceAmount).toBe(100);
    expect(a.priceCurrency).toBe('EUR');
    expect(dec.priceAmount).toBe(42.25);
    expect(dec.priceCurrency).toBe('USD');
    expect(nanP.priceAmount).toBeUndefined();
  });

  it('товар без specs и с priceAmount null', () => {
    const row = {
      slug: 'k',
      name: 'К',
      imageUrl: 'https://c.jpg',
      displayGroups: [
        {
          slug: 'b',
          name: 'B',
          brandEntity: null,
          sections: [
            {
              slug: 's',
              name: 'S',
              products: [
                {
                  publicId: 'pn',
                  name: 'N',
                  priceText: '—',
                  priceAmount: null,
                  priceCurrency: 'RUB',
                  description: '',
                  imageUrl: 'https://i.jpg',
                  source: '',
                  published: true,
                  specs: null,
                },
              ],
            },
          ],
        },
      ],
    };
    const p = formatCatalogTree([row], { publishedOnly: true })[0].brands[0].subcategories[0].products[0];
    expect(p.specs).toBeUndefined();
    expect(p.priceAmount).toBeUndefined();
  });
});

describe('formatProductDetail', () => {
  it('null если нет данных', () => {
    expect(formatProductDetail(null)).toBeNull();
  });

  it('собирает карточку и categories/images', () => {
    const found = {
      product: {
        publicId: 'p1',
        name: 'N',
        priceText: '10',
        description: '',
        imageUrl: 'https://main.jpg',
        source: '',
        brandEntity: null,
        categories: [
          { isPrimary: true, category: { slug: 'k', name: 'К' } },
          { isPrimary: false, category: { slug: 'x', name: 'X' } },
        ],
        images: [
          { url: 'https://main.jpg', sortOrder: 0 },
          { url: 'https://g2.jpg', sortOrder: 1 },
        ],
      },
      category: { slug: 'k', name: 'К' },
      displayGroup: { slug: 'g', name: 'G', brandEntity: null },
      section: { name: 'Секция' },
    };
    const d = formatProductDetail(found);
    expect(d.id).toBe('p1');
    expect(d.categoryId).toBe('k');
    expect(d.brandId).toBe('g');
    expect(d.subcategoryName).toBe('Секция');
    expect(d.categories).toHaveLength(2);
    expect(d.categories[0].isPrimary).toBe(true);
    expect(d.images).toEqual(['https://main.jpg', 'https://g2.jpg']);
  });

  it('бренд с product.brandEntity и без categories', () => {
    const found = {
      product: {
        publicId: 'p1',
        name: 'N',
        priceText: '10',
        description: '',
        imageUrl: 'https://main.jpg',
        source: '',
        brandEntity: {
          slug: 'ent',
          name: 'Ent',
          logoUrl: 'https://logo',
          website: 'https://site',
        },
        categories: [],
        images: [],
      },
      category: { slug: 'k', name: 'К' },
      displayGroup: { slug: 'g', name: 'G', brandEntity: null },
      section: { name: 'Секция' },
    };
    const d = formatProductDetail(found);
    expect(d.entitySlug).toBe('ent');
    expect(d.entityLogo).toBe('https://logo');
    expect(d.entityWebsite).toBe('https://site');
    expect(d.categories).toBeUndefined();
  });
});

describe('DEFAULT_IMAGE', () => {
  it('непустая строка URL', () => {
    expect(DEFAULT_IMAGE).toMatch(/^https:/);
  });
});
