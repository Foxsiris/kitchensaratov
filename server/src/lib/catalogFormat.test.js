import { describe, it, expect } from 'vitest';
import { formatCatalogTree, formatProductDetail, DEFAULT_IMAGE } from './catalogFormat.js';

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
});

describe('DEFAULT_IMAGE', () => {
  it('непустая строка URL', () => {
    expect(DEFAULT_IMAGE).toMatch(/^https:/);
  });
});
