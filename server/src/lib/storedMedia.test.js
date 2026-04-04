import { describe, it, expect } from 'vitest';
import { isStoredMediaId } from './storedMedia.js';

describe('storedMedia', () => {
  it('валидный UUID v4-подобный id', () => {
    expect(isStoredMediaId('11111111-2222-5222-8222-333333333333')).toBe(true);
  });

  it('отклоняет неверный формат', () => {
    expect(isStoredMediaId('not-uuid')).toBe(false);
    expect(isStoredMediaId('')).toBe(false);
  });
});
