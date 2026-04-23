/**
 * Запускается в postbuild: пишет build/sitemap.xml и build/robots.txt
 * при REACT_APP_SITE_URL (origin без / на конце), например https://www.example.com
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildDir = path.join(__dirname, '..', 'build');
const base = (process.env.REACT_APP_SITE_URL || '').replace(/\/$/, '');

if (!fs.existsSync(buildDir)) {
  process.stderr.write('generate-sitemap: build/ not found, skip\n');
  process.exit(0);
}

const adminOnlyRobots = `User-agent: *
Disallow: /admin/
`;

if (!base) {
  process.stderr.write('generate-sitemap: REACT_APP_SITE_URL not set; only robots (Disallow /admin/)\n');
  fs.writeFileSync(path.join(buildDir, 'robots.txt'), adminOnlyRobots, 'utf8');
  process.exit(0);
}

const paths = ['/', '/catalog', '/about', '/kitchen/1', '/kitchen/2', '/kitchen/3'];
const now = new Date().toISOString().slice(0, 10);

const body = paths
  .map((p) => {
    const loc = `${base}${p}`;
    const pr = p === '/' ? '1.0' : p.startsWith('/kitchen') ? '0.7' : '0.8';
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${pr}</priority>
  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), xml, 'utf8');
fs.writeFileSync(
  path.join(buildDir, 'robots.txt'),
  `${adminOnlyRobots}
Sitemap: ${base}/sitemap.xml
`,
  'utf8'
);
process.stdout.write(`generate-sitemap: ${base} → sitemap.xml, robots.txt\n`);
