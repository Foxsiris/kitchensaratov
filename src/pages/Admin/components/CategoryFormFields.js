import React from 'react';
import { Label, Input, ErrorText } from '../AdminUI';

/**
 * Название и URL картинки категории.
 */
export function CategoryFormFields({ values, onChange, errors = {} }) {
  const { name, image } = values;
  return (
    <>
      <Label>Название *</Label>
      <Input value={name} onChange={(e) => onChange('name', e.target.value)} />
      {errors.name && <ErrorText>{errors.name}</ErrorText>}

      <Label>URL изображения</Label>
      <Input value={image} onChange={(e) => onChange('image', e.target.value)} placeholder="https://..." />
      {errors.image && <ErrorText>{errors.image}</ErrorText>}
    </>
  );
}
