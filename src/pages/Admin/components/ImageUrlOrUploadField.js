import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { FiUpload } from 'react-icons/fi';
import { apiUrl } from '../../../config/api';
import { resolveImageSrcForDisplay } from '../../../utils/imageUrl';
import { Label, Input, Button } from '../AdminUI';

/** Группа URL + загрузка: без лишнего margin у инпута, ровные отступы как у одного поля. */
const FieldRoot = styled.div`
  margin-bottom: ${(p) => (p.$embedded ? 0 : p.theme.spacing.md)};
`;

const UrlInput = styled(Input)`
  margin-bottom: 0;
`;

/** Превью всегда над кнопкой «Загрузить» */
const UrlActionsStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-top: 8px;
`;

const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${(p) => p.theme.spacing.sm};
`;

/** Не secondary как у «Отмена» — вспомогательное действие к полю. */
const UploadButton = styled(Button).attrs({ type: 'button' })`
  padding: 8px 14px;
  font-size: ${(p) => p.theme.fontSizes.xs};
  font-weight: 500;
  border-radius: 6px;
  border-color: ${(p) => p.theme.colors.border};
  color: ${(p) => p.theme.colors.grayDark};
  background: ${(p) => p.theme.colors.white};
  box-shadow: ${(p) => p.theme.shadows.sm};

  &:hover:not(:disabled) {
    background: ${(p) => p.theme.colors.white};
    border-color: ${(p) => p.theme.colors.grayLight};
    color: ${(p) => p.theme.colors.primary};
    box-shadow: ${(p) => p.theme.shadows.md};
  }

  &:disabled {
    opacity: 0.55;
  }

  ${(p) =>
    p.$compact &&
    css`
      padding: 5px 11px;
      font-size: 11px;
      line-height: 1.25;
      font-weight: 500;
      border-radius: 5px;
      gap: 5px;
      box-shadow: none;
      background: ${p.theme.colors.white};

      &:hover:not(:disabled) {
        box-shadow: none;
        background: ${p.theme.colors.light};
      }
    `}
`;

const FieldError = styled.span`
  display: block;
  color: #c00;
  font-size: ${(p) => p.theme.fontSizes.xs};
  margin-top: 8px;
  line-height: 1.4;
`;

const Preview = styled.div`
  flex-shrink: 0;
  width: ${(p) => (p.$compact ? '104px' : '140px')};
  height: ${(p) => (p.$compact ? '64px' : '90px')};
  border-radius: ${(p) => (p.$compact ? '5px' : '6px')};
  background-color: ${(p) => p.theme.colors.white};
  background-image: url(${(p) => p.$src || 'none'});
  background-size: cover;
  background-position: center;
  border: 1px solid ${(p) => p.theme.colors.border};
  box-shadow: ${(p) => p.theme.shadows.sm};
`;

/**
 * Поле URL картинки + загрузка файла в БД (сохраняется путь `/api/media/:uuid`).
 * Превью (если URL валиден) — над кнопкой загрузки.
 */
export function ImageUrlOrUploadField({
  label,
  hideLabel,
  value,
  onChange,
  error,
  uploadImage,
  placeholder = 'https://... или загрузите файл с компьютера',
  /** Без нижнего внешнего отступа (внутри карточки) */
  embedded = false,
  /** Текст на кнопке загрузки */
  uploadButtonLabel = 'Загрузить с компьютера',
  /** Меньше превью (доп. фото в карточке товара) */
  compactPreview = false,
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileRef = useRef(null);

  const previewSrc = value?.trim() ? resolveImageSrcForDisplay(value, apiUrl) : '';

  const handleFile = async (e) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f || !uploadImage) return;
    setUploadError('');
    setUploading(true);
    try {
      const url = await uploadImage(f);
      onChange(url);
    } catch (err) {
      setUploadError(err.message || 'Не удалось загрузить');
    } finally {
      setUploading(false);
    }
  };

  const previewEl = previewSrc ? (
    <Preview $src={previewSrc} $compact={compactPreview} />
  ) : null;

  return (
    <FieldRoot $embedded={embedded}>
      {!hideLabel && label != null && <Label>{label}</Label>}
      <UrlInput value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      {uploadImage && (
        <UrlActionsStack>
          {previewEl}
          <ActionsRow>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              hidden
              onChange={handleFile}
            />
            <UploadButton
              $compact={compactPreview}
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
            >
              <FiUpload size={compactPreview ? 13 : 14} strokeWidth={2} aria-hidden />
              {uploading ? 'Загрузка…' : uploadButtonLabel}
            </UploadButton>
          </ActionsRow>
        </UrlActionsStack>
      )}
      {!uploadImage && previewEl}
      {(error || uploadError) && <FieldError>{error || uploadError}</FieldError>}
    </FieldRoot>
  );
}
