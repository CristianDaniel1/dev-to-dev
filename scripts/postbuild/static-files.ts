import { copyFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  BROWSER_DIR,
  CSR_FALLBACK_FILE,
  NOT_FOUND_DIR,
  PUBLIC_ORIGIN,
} from './postbuild.constants';

/** Moves the prerendered not-found page to 404.html, which Vercel serves for unknown URLs. */
export const exposeNotFoundPage = async (): Promise<void> => {
  await copyFile(join(NOT_FOUND_DIR, 'index.html'), join(BROWSER_DIR, '404.html'));
  await rm(NOT_FOUND_DIR, { recursive: true });
};

/** Deletes the client-side rendering fallback. */
export const removeCsrFallback = async (): Promise<void> => {
  await rm(CSR_FALLBACK_FILE, { force: true });
};

/**
 * Writes sitemap.xml with one entry per route.
 *
 * @param routes - Route paths to list.
 */
export const writeSitemap = async (routes: readonly string[]): Promise<void> => {
  const urls = routes
    .map((route) => `  <url><loc>${PUBLIC_ORIGIN}${route === '/' ? '' : route}</loc></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(join(BROWSER_DIR, 'sitemap.xml'), xml);
};

/** Writes robots.txt allowing everything and pointing to the sitemap. */
export const writeRobots = async (): Promise<void> => {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${PUBLIC_ORIGIN}/sitemap.xml\n`;
  await writeFile(join(BROWSER_DIR, 'robots.txt'), robots);
};
