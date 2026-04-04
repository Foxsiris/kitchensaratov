import React from 'react';
import styled from 'styled-components';
import { FiTrash2, FiPlus } from 'react-icons/fi';
import { Label, Input, Textarea, ErrorText, Button, IconButton } from '../AdminUI';
import { ImageUrlOrUploadField } from './ImageUrlOrUploadField';

const MediaSection = styled.div`
  padding: ${(p) => p.theme.spacing.md};
  margin-bottom: ${(p) => p.theme.spacing.md};
  background: ${(p) => p.theme.colors.light};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: 10px;
`;

const SectionLead = styled.p`
  margin: 0 0 ${(p) => p.theme.spacing.md};
  font-size: ${(p) => p.theme.fontSizes.xs};
  line-height: 1.5;
  color: ${(p) => p.theme.colors.gray};
`;

const SectionTitle = styled.div`
  font-size: ${(p) => p.theme.fontSizes.sm};
  font-weight: 600;
  color: ${(p) => p.theme.colors.primary};
  margin-bottom: ${(p) => p.theme.spacing.xs};
`;

const ExtraPhotoCard = styled.div`
  padding: 10px 12px 12px;
  margin-bottom: ${(p) => p.theme.spacing.sm};
  background: ${(p) => p.theme.colors.white};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: 8px;
  box-shadow: ${(p) => p.theme.shadows.sm};
`;

const ExtraPhotoToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.spacing.sm};
  margin-bottom: 6px;
`;

const SlotLabel = styled.span`
  font-size: ${(p) => p.theme.fontSizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${(p) => p.theme.colors.grayDark};
`;

const AddPhotoButton = styled(Button).attrs({ type: 'button', $variant: 'secondary' })`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  margin-top: ${(p) => p.theme.spacing.xs};
  padding: 10px ${(p) => p.theme.spacing.md};
  border-style: dashed;
  border-color: ${(p) => p.theme.colors.grayLight};
  color: ${(p) => p.theme.colors.grayDark};
  font-weight: 500;

  &:hover {
    border-style: dashed;
    border-color: ${(p) => p.theme.colors.primary};
    color: ${(p) => p.theme.colors.primary};
    background: ${(p) => p.theme.colors.white};
  }
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

      <MediaSection>
        <SectionTitle>Главное изображение</SectionTitle>
        <SectionLead>URL или загрузка; превью над кнопкой (крупное).</SectionLead>
        <ImageUrlOrUploadField
          hideLabel
          label=""
          value={image}
          onChange={(v) => onChange('image', v)}
          error={errors.image}
          uploadImage={uploadImage}
          embedded
        />
      </MediaSection>

      <MediaSection>
        <SectionTitle>Дополнительные фото</SectionTitle>
        <SectionLead>Каждое фото — блок; превью над кнопкой (компактное).</SectionLead>
        {extraImages.map((url, i) => (
          <ExtraPhotoCard key={i}>
            <ExtraPhotoToolbar>
              <SlotLabel>Фото {i + 2}</SlotLabel>
              <IconButton
                type="button"
                aria-label={`Удалить фото ${i + 2}`}
                onClick={() => onChange('extraImages', extraImages.filter((_, j) => j !== i))}
              >
                <FiTrash2 size={16} strokeWidth={2} />
              </IconButton>
            </ExtraPhotoToolbar>
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
              embedded
              compactPreview
              placeholder={`URL или файл, фото ${i + 2}`}
            />
          </ExtraPhotoCard>
        ))}
        <AddPhotoButton onClick={() => onChange('extraImages', [...extraImages, ''])}>
          <FiPlus size={16} strokeWidth={2} aria-hidden />
          Добавить фото
        </AddPhotoButton>
        {errors.extraImages && <ErrorText>{errors.extraImages}</ErrorText>}
      </MediaSection>

      <Label>Источник (отображается в карточке)</Label>
      <Input value={source} onChange={(e) => onChange('source', e.target.value)} placeholder="rimi-mebel.ru" />
    </>
  );
}
