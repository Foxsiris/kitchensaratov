/** Галереи блока «Реализованное с дизайнерами»: URL для lightbox */

const asset = (folder, file) =>
  `${process.env.PUBLIC_URL || ''}/assets/${folder}/${file}`;

const ELENA_FILES = [
  'son01731.jpg',
  'son01752.jpg',
  'son01763.jpg',
  'son01771.jpg',
  'son01777.jpg',
  'son01780.jpg',
  'son01784.jpg',
  'son01802.jpg',
  'son01811.jpg',
  'son01818.jpg',
  'son01826.jpg',
  'son01874.jpg',
  'son01880.jpg',
  'son01883.jpg',
  'son01885.jpg',
  'son01891.jpg',
  'son01903.jpg',
  'son01920.jpg',
  'son01927.jpg',
  'son01942-1.jpg',
  'son01949.jpg',
  'son01964.jpg',
  'son01973.jpg',
  'son01978.jpg',
  'son02002.jpg',
  'son02017.jpg',
  'son02026.jpg',
  'son02049.jpg',
  'son02058.jpg',
];

export const ELENA_GALLERY_URLS = ELENA_FILES.map((f) =>
  asset('elena-perezhogina', f)
);

const USHAKOVA_MANIFEST = `${process.env.PUBLIC_URL || ''}/assets/designer-galleries/svetlana-ushakova.json`;
const POTAPOVA_MANIFEST = `${process.env.PUBLIC_URL || ''}/assets/designer-galleries/ekaterina-potapova.json`;
const KONDRATIEVA_MANIFEST = `${process.env.PUBLIC_URL || ''}/assets/designer-galleries/kondratieva.json`;

/**
 * @param {string} projectId
 * @returns {Promise<string[]>}
 */
export async function loadDesignerGalleryUrls(projectId) {
  if (projectId === 'perezhogina') {
    return ELENA_GALLERY_URLS.slice();
  }
  if (projectId === 'ushakova') {
    const res = await fetch(USHAKOVA_MANIFEST);
    if (!res.ok) throw new Error('manifest');
    /** @type {string[]} */
    const names = await res.json();
    return names.map((n) => asset('svetlana-ushakova', n));
  }
  if (projectId === 'potapova') {
    const res = await fetch(POTAPOVA_MANIFEST);
    if (!res.ok) throw new Error('manifest');
    /** @type {string[]} */
    const names = await res.json();
    return names.map((n) => asset('ekaterina-potapova', n));
  }
  if (projectId === 'kondratieva') {
    const res = await fetch(KONDRATIEVA_MANIFEST);
    if (!res.ok) throw new Error('manifest');
    /** @type {string[]} */
    const names = await res.json();
    return names.map((n) => asset('kondratieva', n));
  }
  return [];
}
