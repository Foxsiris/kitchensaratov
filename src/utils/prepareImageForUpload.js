/**
 * Подготовка изображения перед загрузкой в админку: как в scripts/optimize-*-images.mjs
 * (sharp: rotate по EXIF, вписывание в квадрат max edge, JPEG quality ~82).
 * В браузере — canvas; GIF не трогаем (анимация и ограничения canvas).
 */

export const ADMIN_IMAGE_MAX_EDGE = 2000;
/** Canvas toBlob: 0..1; в sharp-скриптах quality: 82 */
export const ADMIN_IMAGE_JPEG_QUALITY = 0.82;

function jpegFileName(originalName) {
  const base = String(originalName || 'image').replace(/\.[^.]+$/, '') || 'image';
  return `${base}.jpg`;
}

async function decodeForCanvas(file) {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch {
      /* старые браузеры / неподдерживаемый вариант */
    }
  }
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Не удалось прочитать изображение'));
    };
    img.src = url;
  });
}

/**
 * @param {File} file
 * @returns {Promise<File>}
 */
export async function prepareImageForUpload(file) {
  if (!file?.type?.startsWith('image/')) return file;
  if (file.type === 'image/gif') return file;

  let source;
  try {
    source = await decodeForCanvas(file);
  } catch (e) {
    throw e instanceof Error ? e : new Error('Не удалось прочитать изображение');
  }

  const w = source.width;
  const h = source.height;
  if (!w || !h) {
    if (typeof source.close === 'function') source.close();
    return file;
  }

  const scale = Math.min(1, ADMIN_IMAGE_MAX_EDGE / Math.max(w, h));
  const tw = Math.max(1, Math.round(w * scale));
  const th = Math.max(1, Math.round(h * scale));

  const canvas = document.createElement('canvas');
  canvas.width = tw;
  canvas.height = th;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    if (typeof source.close === 'function') source.close();
    return file;
  }
  ctx.drawImage(source, 0, 0, tw, th);
  if (typeof source.close === 'function') source.close();

  const blob = await new Promise((resolve) => {
    canvas.toBlob((b) => resolve(b), 'image/jpeg', ADMIN_IMAGE_JPEG_QUALITY);
  });

  if (!blob) return file;
  return new File([blob], jpegFileName(file.name), {
    type: 'image/jpeg',
    lastModified: Date.now(),
  });
}
