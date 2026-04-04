import { describe, it, expect } from 'vitest';
import { isAllowedImageReference, isAllowedOptionalLogoReference } from './imageRef.js';

describe('imageRef', () => {
  it('isAllowedImageReference: http(s) и /api/media/uuid', () => {
    expect(isAllowedImageReference('https://a.com/x.jpg')).toBe(true);
    expect(isAllowedImageReference('http://a.com/x.jpg')).toBe(true);
    expect(isAllowedImageReference('/api/media/11111111-2222-5222-8222-333333333333')).toBe(true);
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
});
