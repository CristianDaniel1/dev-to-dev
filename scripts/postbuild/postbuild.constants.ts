import { join } from 'node:path';
import { SITE_URL } from '../../src/app/core/constants/site.constants';

/** Public origin used in the sitemap; the SITE_URL env var overrides the app constant. */
export const PUBLIC_ORIGIN = (process.env['SITE_URL'] ?? SITE_URL).replace(/\/$/, '');

/** Folder with the static build served by Vercel. */
export const BROWSER_DIR = join('dist', 'dev-to-dev', 'browser');

/** Folder of the prerendered not-found route. */
export const NOT_FOUND_DIR = join(BROWSER_DIR, '404');

/** Client-side rendering fallback that a fully prerendered site does not need. */
export const CSR_FALLBACK_FILE = join(BROWSER_DIR, 'index.csr.html');

/** Marker of pages that must stay out of the sitemap. */
export const NOINDEX_MARKER = 'content="noindex"';
