import { isValidCatalogImageUrl, STORED_IMAGE_PATH_RE } from './imageUrl';

describe('imageUrl', () => {
  test('внешний URL', () => {
    expect(isValidCatalogImageUrl('https://example.com/a.jpg')).toBe(true);
    expect(isValidCatalogImageUrl('http://x/y')).toBe(true);
  });

  test('путь загруженного файла', () => {
    const id = '11111111-2222-5222-8222-333333333333';
    expect(STORED_IMAGE_PATH_RE.test(`/api/media/${id}`)).toBe(true);
    expect(isValidCatalogImageUrl(`/api/media/${id}`)).toBe(true);
  });

  test('пусто допустимо', () => {
    expect(isValidCatalogImageUrl('')).toBe(true);
    expect(isValidCatalogImageUrl('   ')).toBe(true);
  });

  test('мусор не проходит', () => {
    expect(isValidCatalogImageUrl('/api/media/wrong')).toBe(false);
    expect(isValidCatalogImageUrl('ftp://x')).toBe(false);
  });
});
