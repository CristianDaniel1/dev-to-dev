import { copyFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

/** Public origin used in the sitemap. Keep in sync with SITE_URL in src/app/core/seo/site.ts. */
const SITE_URL = (process.env.SITE_URL ?? 'https://dev-to-dev.vercel.app').replace(/\/$/, '');
const BROWSER_DIR = join('dist', 'dev-to-dev', 'browser');
const NOT_FOUND_DIR = join(BROWSER_DIR, '404');

async function findPrerenderedPages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const pages = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) pages.push(...(await findPrerenderedPages(fullPath)));
    else if (entry.name === 'index.html') pages.push(fullPath);
  }
  return pages;
}

function toRoutePath(indexFile) {
  const folder = relative(BROWSER_DIR, indexFile).split(sep).slice(0, -1).join('/');
  return folder ? `/${folder}` : '/';
}

async function exposeNotFoundPage() {
  await copyFile(join(NOT_FOUND_DIR, 'index.html'), join(BROWSER_DIR, '404.html'));
  await rm(NOT_FOUND_DIR, { recursive: true });
}

async function writeSitemap(routes) {
  const urls = routes
    .sort()
    .map((route) => `  <url><loc>${SITE_URL}${route === '/' ? '' : route}</loc></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(join(BROWSER_DIR, 'sitemap.xml'), xml);
}

async function writeRobots() {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  await writeFile(join(BROWSER_DIR, 'robots.txt'), robots);
}

try {
  await stat(BROWSER_DIR);
  await exposeNotFoundPage();
  await rm(join(BROWSER_DIR, 'index.csr.html'), { force: true });
  const routes = (await findPrerenderedPages(BROWSER_DIR)).map(toRoutePath);
  await writeSitemap(routes);
  await writeRobots();
  console.log(`postbuild: 404.html, robots.txt and sitemap.xml (${routes.length} routes) written.`);
} catch (error) {
  console.error('postbuild failed:', error);
  process.exit(1);
}
