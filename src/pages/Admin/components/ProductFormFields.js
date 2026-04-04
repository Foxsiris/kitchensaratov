import React from 'react';
import styled from 'styled-components';
import { Label, Input, Textarea, ErrorText, Button } from '../AdminUI';
import { ImageUrlOrUploadField } from './ImageUrlOrUploadField';

const ExtraBlock = styled.div`
  margin-top: ${(p) => p.theme.spacing.md};
`;

const ExtraRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 10px;
`;

/**
 * Поля формы товара (добавление и редактирование).
 * onChange(field, value)
 */
export function ProductFormFields({
  values,
  onChange,
  errors = {},
  namePlaceholder = 'Название модели',
  uploadImage,
}) {
  const { name, price, description, image, source, extraImages = [] } = values;
  return (
    <>
      <Label>Название *</Label>
      <Input value={name} onChange={(e) => onChange('name', e.target.value)} placeholder={namePlaceholder} />
      {errors.name && <ErrorText>{errors.name}</ErrorText>}

      <Label>Цена</Label>
      <Input
        value={price}
        onChange={(e) => onChange('price', e.target.value)}
        placeholder="от 200 000 ₽  или  По запросу"
      />

      <Label>Описание</Label>
      <Textarea
        value={description}
        onChange={(e) => onChange('description', e.target.value)}
        placeholder="Краткое описание модели..."
      />

      <ImageUrlOrUploadField
        label="Изображение"
        value={image}
        onChange={(v) => onChange('image', v)}
        error={errors.image}
        uploadImage={uploadImage}
      />

      <ExtraBlock>
        <Label>Дополнительные фото</Label>
        {extraImages.map((url, i) => (
          <ExtraRow key={i}>
            <div style={{ flex: '1 1 220px', minWidth: 0 }}>
              <ImageUrlOrUploadField
                hideLabel
                label=""
                value={url}
                onChange={(v) => {
                  const next = [...extraImages];
                  next[i] = v;
                  onChange('extraImages', next);
                }}
                uploadImage={uploadImage}
                placeholder={`URL или файл, фото ${i + 2}`}
              />
            </div>
            <Button
              type="button"
              $variant="secondary"
              style={{ marginTop: 6, flexShrink: 0 }}
              onClick={() => onChange('extraImages', extraImages.filter((_, j) => j !== i))}
            >
              Удалить
            </Button>
          </ExtraRow>
        ))}
        <Button
          type="button"
          $variant="secondary"
          onClick={() => onChange('extraImages', [...extraImages, ''])}
        >
          + Добавить фото
        </Button>
        {errors.extraImages && <ErrorText>{errors.extraImages}</ErrorText>}
      </ExtraBlock>

      <Label>Источник (отображается в карточке)</Label>
      <Input value={source} onChange={(e) => onChange('source', e.target.value)} placeholder="rimi-mebel.ru" />
    </>
  );
}
