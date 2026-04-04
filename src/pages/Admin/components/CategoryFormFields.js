import React from 'react';
import { Label, Input, ErrorText } from '../AdminUI';
import { ImageUrlOrUploadField } from './ImageUrlOrUploadField';

/**
 * Название и URL картинки категории (или загрузка в БД).
 */
export function CategoryFormFields({ values, onChange, errors = {}, uploadImage }) {
  const { name, image } = values;
  return (
    <>
      <Label>Название *</Label>
      <Input value={name} onChange={(e) => onChange('name', e.target.value)} />
      {errors.name && <ErrorText>{errors.name}</ErrorText>}

      <ImageUrlOrUploadField
        label="Изображение"
        value={image}
        onChange={(v) => onChange('image', v)}
        error={errors.image}
        uploadImage={uploadImage}
      />
    </>
  );
}
