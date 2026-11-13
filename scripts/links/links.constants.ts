/** How many links are checked at the same time. */
export const LINK_CHECK_CONCURRENCY = 8;

/** Time limit of each request, in milliseconds. */
export const LINK_CHECK_TIMEOUT_MS = 20_000;

/** Browser-like user agent; some sites reject requests without one. */
export const LINK_CHECK_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

/** Statuses of sites that refuse automated requests; the link must be checked by hand. */
export const BLOCKED_STATUSES: readonly number[] = [401, 403, 429];
