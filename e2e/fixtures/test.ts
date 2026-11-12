import { test as base, expect } from '@playwright/test';
import { stubFavicons } from '../helpers/external-requests';
import { trackPageErrors } from '../helpers/page-errors';
import { HomePage } from '../pages/home.page';
import { LayoutPage } from '../pages/layout.page';
import { QuizCatalogPage } from '../pages/quiz-catalog.page';
import { ProgressPage } from '../pages/progress.page';
import { QuizSessionPage } from '../pages/quiz-session.page';
import { RandomSetupPage } from '../pages/random-setup.page';
import { ResourceHubPage } from '../pages/resource-hub.page';
import { ReviewPage } from '../pages/review.page';
import { TechOverviewPage } from '../pages/tech-overview.page';

interface Fixtures {
  /** Pattern of the console errors a test expects; any other fails it. */
  allowedConsoleErrors: RegExp | null;
  /** Fails the test when the page threw or logged an unexpected console error. */
  failOnPageErrors: void;
  /** Keeps third-party requests (favicons) out of the tests. */
  offlineFavicons: void;
  layout: LayoutPage;
  home: HomePage;
  catalog: QuizCatalogPage;
  techOverview: TechOverviewPage;
  session: QuizSessionPage;
  resources: ResourceHubPage;
  review: ReviewPage;
  randomSetup: RandomSetupPage;
  progressPage: ProgressPage;
}

export const test = base.extend<Fixtures>({
  allowedConsoleErrors: [null, { option: true }],

  failOnPageErrors: [
    async ({ page, allowedConsoleErrors }, use) => {
      const errors = trackPageErrors(page, allowedConsoleErrors);
      await use();
      expect(errors, 'page errors').toEqual([]);
    },
    { auto: true },
  ],

  offlineFavicons: [
    async ({ page }, use) => {
      await stubFavicons(page);
      await use();
    },
    { auto: true },
  ],

  layout: async ({ page }, use) => {
    await use(new LayoutPage(page));
  },

  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  catalog: async ({ page }, use) => {
    await use(new QuizCatalogPage(page));
  },

  techOverview: async ({ page }, use) => {
    await use(new TechOverviewPage(page));
  },

  session: async ({ page }, use) => {
    await use(new QuizSessionPage(page));
  },

  resources: async ({ page }, use) => {
    await use(new ResourceHubPage(page));
  },

  review: async ({ page }, use) => {
    await use(new ReviewPage(page));
  },

  randomSetup: async ({ page }, use) => {
    await use(new RandomSetupPage(page));
  },

  progressPage: async ({ page }, use) => {
    await use(new ProgressPage(page));
  },
});

export { expect };
