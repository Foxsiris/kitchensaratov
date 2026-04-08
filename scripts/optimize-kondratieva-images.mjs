/**
 * JPEG/PNG из public/assets/Kondratieva_source → JPEG в public/assets/kondratieva/
 * + manifest public/assets/designer-galleries/kondratieva.json
 * Запуск: npm run optimize:kondratieva
 */
import sharp from 'sharp';
import { mkdir, readdir, stat, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const inputDir = path.join(root, 'public', 'assets', 'Kondratieva_source');
const outputDir = path.join(root, 'public', 'assets', 'kondratieva');
const manifestDir = path.join(root, 'public', 'assets', 'designer-galleries');
const manifestPath = path.join(manifestDir, 'kondratieva.json');

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

function uniqueOutName(desired, used) {
  if (!used.has(desired)) {
    used.add(desired);
    return desired;
  }
  const stem = desired.replace(/\.jpg$/i, '');
  let n = 2;
  let candidate;
  do {
    candidate = `${stem}-${n}.jpg`;
    n += 1;
  } while (used.has(candidate));
  used.add(candidate);
  return candidate;
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
  await mkdir(manifestDir, { recursive: true });

  const images = files.filter((f) => /\.(jpe?g|png)$/i.test(f));
  if (!images.length) {
    console.log('Нет JPEG/PNG во входной папке.');
    return;
  }

  const used = new Set();
  const manifestNames = [];

  for (const name of images.sort()) {
    const inputPath = path.join(inputDir, name);
    const st = await stat(inputPath);
    if (!st.isFile()) continue;

    const desired = toAsciiJpegName(name);
    const outName = uniqueOutName(desired, used);
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

    manifestNames.push(outName);

    const inMb = (st.size / 1024 / 1024).toFixed(2);
    const outSt = await stat(outputPath);
    const outMb = (outSt.size / 1024 / 1024).toFixed(2);
    console.log(`${name} → kondratieva/${outName}  (${inMb} MB → ${outMb} MB)`);
  }

  manifestNames.sort();
  await writeFile(manifestPath, JSON.stringify(manifestNames), 'utf8');
  console.log(`→ designer-galleries/kondratieva.json (${manifestNames.length} файлов)`);
  console.log('Готово.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
