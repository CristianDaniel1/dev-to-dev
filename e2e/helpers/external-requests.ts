import type { Page } from '@playwright/test';

/**
 * Aborts every request outside the app's own origin, so tests never depend on third parties and
 * an unexpected external request surfaces as a page error.
 *
 * @param page - Page to guard.
 * @param baseURL - Origin of the app under test.
 */
export const blockThirdPartyRequests = async (page: Page, baseURL: string): Promise<void> => {
  const appOrigin = new URL(baseURL).origin;
  await page.route(
    (url) => url.origin !== appOrigin,
    (route) => route.abort(),
  );
};
