/**
 * JPEG/PNG из public/assets/Svetlana Ushakova → JPEG в public/assets/svetlana-ushakova/
 * Имена только латиница в нижнем регистре: imgl0584-hdr.jpg
 * Запуск: npm run optimize:svetlana
 */
import sharp from 'sharp';
import { mkdir, readdir, stat } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const inputDir = path.join(root, 'public', 'assets', 'Svetlana Ushakova');
const outputDir = path.join(root, 'public', 'assets', 'svetlana-ushakova');

const MAX_EDGE = 2000;
const JPEG_QUALITY = 82;

function toAsciiJpegName(fileName) {
  const base = fileName.replace(/\.(jpe?g|png)$/i, '');
  const safe = base
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  return `${safe || 'image'}.jpg`;
}

async function main() {
  let files;
  try {
    files = await readdir(inputDir);
  } catch (e) {
    console.error('Папка не найдена:', inputDir);
    console.error(e.message);
    process.exit(1);
  }

  await mkdir(outputDir, { recursive: true });

  const images = files.filter((f) => /\.(jpe?g|png)$/i.test(f));
  if (!images.length) {
    console.log('Нет JPEG/PNG во входной папке.');
    return;
  }

  for (const name of images.sort()) {
    const inputPath = path.join(inputDir, name);
    const st = await stat(inputPath);
    if (!st.isFile()) continue;

    const outName = toAsciiJpegName(name);
    const outputPath = path.join(outputDir, outName);

    await sharp(inputPath)
      .rotate()
      .resize({
        width: MAX_EDGE,
        height: MAX_EDGE,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toFile(outputPath);

    const inMb = (st.size / 1024 / 1024).toFixed(2);
    const outSt = await stat(outputPath);
    const outMb = (outSt.size / 1024 / 1024).toFixed(2);
    console.log(`${name} → svetlana-ushakova/${outName}  (${inMb} MB → ${outMb} MB)`);
  }

  console.log('Готово.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
