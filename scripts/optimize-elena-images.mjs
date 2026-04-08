/**
 * PNG из public/assets/Elena Perezhogina → JPEG в public/assets/elena-perezhogina/
 * Имена только латиница: son01752.jpg, son01942-1.jpg (вариант с NR-1 в конце имени файла).
 * Запуск: npm run optimize:elena
 */
import sharp from 'sharp';
import { mkdir, readdir, stat } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const inputDir = path.join(root, 'public', 'assets', 'Elena Perezhogina');
const outputDir = path.join(root, 'public', 'assets', 'elena-perezhogina');

const MAX_EDGE = 2000;
const JPEG_QUALITY = 82;

/** SON01752-….png → son01752.jpg; SON01942-…-NR-1.png → son01942-1.jpg */
function toAsciiJpegName(pngFileName) {
  const base = pngFileName.replace(/\.png$/i, '');
  const son = base.match(/^SON(\d+)/i);
  if (son) {
    const variant = /-NR-1$/i.test(base) ? '-1' : '';
    return `son${son[1]}${variant}.jpg`;
  }
  const safe = base
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
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

  const pngs = files.filter((f) => /\.png$/i.test(f));
  if (!pngs.length) {
    console.log('Нет PNG во входной папке.');
    return;
  }

  for (const name of pngs) {
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
    console.log(`${name} → elena-perezhogina/${outName}  (${inMb} MB → ${outMb} MB)`);
  }

  console.log('Готово.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
