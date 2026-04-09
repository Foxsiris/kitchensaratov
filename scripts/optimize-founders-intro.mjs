/**
 * IMG_4617.PNG → public/assets/founders-intro.jpg
 * Запуск: node scripts/optimize-founders-intro.mjs
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const inputPath = path.join(root, 'public', 'assets', 'IMG_4617.PNG');
const outputPath = path.join(root, 'public', 'assets', 'founders-intro.jpg');

const MAX_EDGE = 1600;
const JPEG_QUALITY = 85;

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

console.log('OK → public/assets/founders-intro.jpg');
