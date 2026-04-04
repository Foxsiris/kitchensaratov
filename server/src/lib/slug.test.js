import { describe, it, expect } from 'vitest';
import { toSlug, uniqueSlug } from './slug.js';

describe('toSlug', () => {
  it('null и undefined', () => {
    expect(toSlug(null)).toBe('');
    expect(toSlug(undefined)).toBe('');
  });

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

  it('несколько коллизий подряд', () => {
    const existing = new Set(['slug', 'slug-1', 'slug-2']);
    expect(uniqueSlug('slug', existing)).toBe('slug-3');
  });

  it('пустой base: при занятом «item» следующий id — "-1"', () => {
    expect(uniqueSlug('', new Set(['item']))).toBe('-1');
  });
});

describe('toSlug — пустая строка', () => {
  it('возвращает пустую строку', () => {
    expect(toSlug('   ')).toBe('');
  });
});
