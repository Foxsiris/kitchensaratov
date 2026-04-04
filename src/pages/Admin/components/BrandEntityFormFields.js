import React from 'react';
import styled from 'styled-components';
import { Label, Input, Textarea, Text } from '../AdminUI';

const Grid2Styled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(p) => p.theme.spacing.md};
  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

/**
 * Поля формы справочника производителя (создание и редактирование).
 */
export function BrandEntityFormFields({ mode, values, onChange, slugReadOnly }) {
  const { name, slug, logoUrl, website, description, sortOrder } = values;

  return (
    <>
      {mode === 'edit' && slugReadOnly && (
        <Text style={{ marginBottom: 12, fontSize: '13px' }}>
          Идентификатор (slug): <code>{slugReadOnly}</code>
        </Text>
      )}
      <Grid2Styled>
        <div>
          <Label>Название *</Label>
          <Input
            value={name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Например: Rimi"
          />
        </div>
        {mode === 'create' && (
          <div>
            <Label>Slug (необязательно)</Label>
            <Input
              value={slug}
              onChange={(e) => onChange('slug', e.target.value)}
              placeholder="Из названия, если пусто"
            />
          </div>
        )}
      </Grid2Styled>
      <Label>URL логотипа</Label>
      <Input value={logoUrl} onChange={(e) => onChange('logoUrl', e.target.value)} placeholder="https://..." />
      <Label>Сайт</Label>
      <Input value={website} onChange={(e) => onChange('website', e.target.value)} placeholder="https://..." />
      <Label>Описание</Label>
      <Textarea value={description} onChange={(e) => onChange('description', e.target.value)} rows={3} />
      {mode === 'edit' && (
        <>
          <Label>Порядок сортировки</Label>
          <Input
            type="number"
            value={sortOrder}
            onChange={(e) => onChange('sortOrder', e.target.value)}
          />
        </>
      )}
    </>
  );
}
