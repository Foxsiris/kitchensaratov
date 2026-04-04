import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { apiUrl } from '../../../config/api';
import { resolveImageSrcForDisplay } from '../../../utils/imageUrl';
import { Label, Input, ErrorText, Button } from '../AdminUI';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-top: 6px;
`;

const Preview = styled.div`
  margin-top: 10px;
  width: 140px;
  height: 90px;
  border-radius: 6px;
  background-color: ${(p) => p.theme.colors.light};
  background-image: url(${(p) => p.$src || 'none'});
  background-size: cover;
  background-position: center;
  border: 1px solid ${(p) => p.theme.colors.border};
`;

/**
 * Поле URL картинки + загрузка файла в БД (сохраняется путь `/api/media/:uuid`).
 */
export function ImageUrlOrUploadField({
  label,
  hideLabel,
  value,
  onChange,
  error,
  uploadImage,
  placeholder = 'https://... или загрузите файл с компьютера',
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

  return (
    <>
      {!hideLabel && label != null && <Label>{label}</Label>}
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      {uploadImage && (
        <Row>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            hidden
            onChange={handleFile}
          />
          <Button type="button" $variant="secondary" disabled={uploading} onClick={() => fileRef.current?.click()}>
            {uploading ? 'Загрузка…' : 'Загрузить с компьютера'}
          </Button>
        </Row>
      )}
      {(error || uploadError) && <ErrorText>{error || uploadError}</ErrorText>}
      {previewSrc ? <Preview $src={previewSrc} /> : null}
    </>
  );
}
