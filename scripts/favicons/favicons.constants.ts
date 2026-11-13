/** Favicon services tried in order; `{domain}` is replaced by the resource domain. */
export const FAVICON_SOURCE_URLS = [
  'https://www.google.com/s2/favicons?sz=64&domain={domain}',
  'https://icons.duckduckgo.com/ip3/{domain}.ico',
] as const;

/** How many favicons are downloaded at the same time. */
export const FAVICON_CONCURRENCY = 6;

/** Largest icon kept, in bytes; bigger files are skipped. */
export const FAVICON_MAX_BYTES = 16 * 1024;
