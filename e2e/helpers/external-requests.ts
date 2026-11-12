import type { Page } from '@playwright/test';
import { FAVICON_SERVICE_PATTERN, TRANSPARENT_PNG } from '../constants/e2e.constants';

/**
 * Answers favicon requests locally, so tests never depend on a third-party service.
 *
 * @param page - Page to stub.
 */
export const stubFavicons = async (page: Page): Promise<void> => {
  await page.route(FAVICON_SERVICE_PATTERN, (route) =>
    route.fulfill({ status: 200, contentType: 'image/png', body: TRANSPARENT_PNG }),
  );
};
