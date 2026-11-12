import { test as base, expect } from '@playwright/test';
import { trackPageErrors } from '../helpers/page-errors';
import { HomePage } from '../pages/home.page';
import { LayoutPage } from '../pages/layout.page';
import { QuizCatalogPage } from '../pages/quiz-catalog.page';
import { QuizSessionPage } from '../pages/quiz-session.page';
import { TechOverviewPage } from '../pages/tech-overview.page';

interface Fixtures {
  /** Pattern of the console errors a test expects; any other fails it. */
  allowedConsoleErrors: RegExp | null;
  /** Fails the test when the page threw or logged an unexpected console error. */
  failOnPageErrors: void;
  layout: LayoutPage;
  home: HomePage;
  catalog: QuizCatalogPage;
  techOverview: TechOverviewPage;
  session: QuizSessionPage;
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
});

export { expect };
