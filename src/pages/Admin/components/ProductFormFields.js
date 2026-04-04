import React from 'react';
import { Label, Input, Textarea, ErrorText } from '../AdminUI';

/**
 * Поля формы товара (добавление и редактирование).
 * onChange(field, value)
 */
export function ProductFormFields({
  values,
  onChange,
  errors = {},
  namePlaceholder = 'Название модели',
}) {
  const { name, price, description, image, source } = values;
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

      <Label>URL изображения</Label>
      <Input value={image} onChange={(e) => onChange('image', e.target.value)} placeholder="https://..." />
      {errors.image && <ErrorText>{errors.image}</ErrorText>}

      <Label>Источник (отображается в карточке)</Label>
      <Input value={source} onChange={(e) => onChange('source', e.target.value)} placeholder="rimi-mebel.ru" />
    </>
  );
}
