import { pluralize, productCount, brandCount } from './pluralize';

describe('pluralize', () => {
  test('1 → one form', () => {
    expect(pluralize(1, ['товар', 'товара', 'товаров'])).toBe('товар');
    expect(pluralize(21, ['товар', 'товара', 'товаров'])).toBe('товар');
  });

  test('2–4 → few', () => {
    expect(pluralize(2, ['товар', 'товара', 'товаров'])).toBe('товара');
    expect(pluralize(4, ['товар', 'товара', 'товаров'])).toBe('товара');
    expect(pluralize(22, ['товар', 'товара', 'товаров'])).toBe('товара');
  });

  test('11–14 → many', () => {
    expect(pluralize(11, ['товар', 'товара', 'товаров'])).toBe('товаров');
    expect(pluralize(12, ['товар', 'товара', 'товаров'])).toBe('товаров');
    expect(pluralize(14, ['товар', 'товара', 'товаров'])).toBe('товаров');
  });

  test('5+ → many', () => {
    expect(pluralize(5, ['товар', 'товара', 'товаров'])).toBe('товаров');
    expect(pluralize(0, ['товар', 'товара', 'товаров'])).toBe('товаров');
  });
});

describe('productCount', () => {
  test('склонение товаров', () => {
    expect(productCount(1)).toBe('товар');
    expect(productCount(3)).toBe('товара');
    expect(productCount(5)).toBe('товаров');
  });
});

describe('brandCount', () => {
  test('склонение брендов', () => {
    expect(brandCount(1)).toBe('бренд');
    expect(brandCount(2)).toBe('бренда');
    expect(brandCount(5)).toBe('брендов');
  });
});
