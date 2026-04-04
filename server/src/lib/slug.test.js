import { describe, it, expect } from 'vitest';
import { toSlug, uniqueSlug } from './slug.js';

describe('toSlug', () => {
  it('латиница и пробелы', () => {
    expect(toSlug('Hello World')).toBe('hello-world');
  });

  it('кириллица', () => {
    expect(toSlug('Кухни Rimi')).toBe('кухни-rimi');
  });

  it('убирает спецсимволы', () => {
    expect(toSlug('A!@#B')).toBe('ab');
  });
});

describe('uniqueSlug', () => {
  it('возвращает base если свободен', () => {
    expect(uniqueSlug('rimi', new Set(['other']))).toBe('rimi');
  });

  it('добавляет суффикс при коллизии', () => {
    const existing = new Set(['rimi', 'rimi-1']);
    expect(uniqueSlug('rimi', existing)).toBe('rimi-2');
  });
});
