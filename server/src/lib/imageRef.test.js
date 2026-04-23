import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { isAllowedImageReference, isAllowedOptionalLogoReference } from './imageRef.js';

describe('imageRef', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('isAllowedImageReference: https и /api/media/uuid; http без env — нет', () => {
    expect(isAllowedImageReference('https://a.com/x.jpg')).toBe(true);
    expect(isAllowedImageReference('http://a.com/x.jpg')).toBe(false);
    expect(isAllowedImageReference('/api/media/11111111-2222-5222-8222-333333333333')).toBe(true);
  });

  it('isAllowedImageReference: http при ALLOW_HTTP_IMAGE_URLS=1', () => {
    vi.stubEnv('ALLOW_HTTP_IMAGE_URLS', '1');
    expect(isAllowedImageReference('http://a.com/x.jpg')).toBe(true);
  });

  it('isAllowedImageReference: отклоняет пустое и прочие пути', () => {
    expect(isAllowedImageReference('')).toBe(false);
    expect(isAllowedImageReference('   ')).toBe(false);
    expect(isAllowedImageReference('/uploads/x.jpg')).toBe(false);
    expect(isAllowedImageReference('//evil.com')).toBe(false);
  });

  it('isAllowedOptionalLogoReference: null и пусто', () => {
    expect(isAllowedOptionalLogoReference(null)).toBe(true);
    expect(isAllowedOptionalLogoReference('')).toBe(true);
    expect(isAllowedOptionalLogoReference('  ')).toBe(true);
  });

  it('isAllowedOptionalLogoReference: неверная непустая строка', () => {
    expect(isAllowedOptionalLogoReference('/uploads/x.png')).toBe(false);
  });
});
