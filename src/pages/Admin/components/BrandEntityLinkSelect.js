import React from 'react';
import { Label, Select } from '../AdminUI';

/**
 * Выбор привязки витринной группы к записи справочника производителей.
 * @param {'create' | 'edit'} variant — create: авто / не привязывать / список; edit: не привязывать / список
 */
export function BrandEntityLinkSelect({ variant, value, onChange, brandEntities }) {
  return (
    <>
      <Label>Производитель (справочник)</Label>
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        {variant === 'create' && (
          <option value="__auto__">Автоматически (по названию группы)</option>
        )}
        <option value="__none__">{variant === 'create' ? 'Не привязывать' : 'Не привязан'}</option>
        {brandEntities.map((ent) => (
          <option key={ent.slug} value={ent.slug}>
            {ent.name} ({ent.slug})
          </option>
        ))}
      </Select>
    </>
  );
}
