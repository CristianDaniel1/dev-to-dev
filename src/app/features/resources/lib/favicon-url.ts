import { FAVICON_SERVICE_URL } from '../constants/resource-display.constants';

/**
 * Builds the favicon URL of a domain.
 *
 * @param domain - Host name, e.g. 'developer.mozilla.org'.
 * @returns The icon URL on the favicon service.
 */
export const faviconUrl = (domain: string): string =>
  `${FAVICON_SERVICE_URL}${encodeURIComponent(domain)}.ico`;
