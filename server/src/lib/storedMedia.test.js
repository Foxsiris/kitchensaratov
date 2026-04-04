import { describe, it, expect } from 'vitest';
import { isStoredMediaId, isStoredMediaPath } from './storedMedia.js';

const VALID_PATH = '/api/media/11111111-2222-5222-8222-333333333333';

describe('storedMedia', () => {
  it('валидный UUID v4-подобный id', () => {
    expect(isStoredMediaId('11111111-2222-5222-8222-333333333333')).toBe(true);
  });

  it('отклоняет неверный формат', () => {
    expect(isStoredMediaId('not-uuid')).toBe(false);
    expect(isStoredMediaId('')).toBe(false);
    expect(isStoredMediaId(null)).toBe(false);
  });

  it('isStoredMediaPath: валидный путь и trim', () => {
    expect(isStoredMediaPath(VALID_PATH)).toBe(true);
    expect(isStoredMediaPath(`  ${VALID_PATH}  `)).toBe(true);
    expect(isStoredMediaPath('/api/media/not-uuid')).toBe(false);
    expect(isStoredMediaPath(null)).toBe(false);
  });
});
