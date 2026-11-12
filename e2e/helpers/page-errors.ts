import type { Page } from '@playwright/test';

/**
 * Collects uncaught exceptions and console errors of a page.
 *
 * @param page - Page to watch.
 * @param allowed - Pattern of the console errors a test expects, or null for none.
 * @returns The list that receives each error, filled while the test runs.
 */
export const trackPageErrors = (page: Page, allowed: RegExp | null = null): string[] => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(`${page.url()} ${error.message}`));
  page.on('console', (message) => {
    if (message.type() !== 'error') return;
    if (allowed?.test(message.text())) return;
    errors.push(`${page.url()} ${message.text()}`);
  });
  return errors;
};
