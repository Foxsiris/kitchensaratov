import { describe, it, expect } from 'vitest';
import { catalogInclude } from './catalogQueries.js';

describe('catalogInclude', () => {
  it('publishedOnly=true добавляет where по published', () => {
    const inc = catalogInclude(true);
    expect(inc.displayGroups.include.sections.include.products.where).toEqual({ published: true });
  });

  it('publishedOnly=false не фильтрует товары', () => {
    const inc = catalogInclude(false);
    expect(inc.displayGroups.include.sections.include.products.where).toBeUndefined();
  });

  it('содержит нужные вложенности', () => {
    const inc = catalogInclude(true);
    expect(inc.displayGroups.include.brandEntity).toBe(true);
    expect(inc.displayGroups.include.sections.include.products.orderBy).toEqual({ sortOrder: 'asc' });
  });
});
