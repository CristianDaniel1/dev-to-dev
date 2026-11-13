import { test as base, expect } from '@playwright/test';
import { blockThirdPartyRequests } from '../helpers/external-requests';
import { trackPageErrors } from '../helpers/page-errors';
import { CommandPalettePage } from '../pages/command-palette.page';
import { GlossaryPage } from '../pages/glossary.page';
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
  /** Aborts requests to other origins, so the app is tested without third parties. */
  noThirdPartyRequests: void;
  layout: LayoutPage;
  home: HomePage;
  catalog: QuizCatalogPage;
  techOverview: TechOverviewPage;
  session: QuizSessionPage;
  resources: ResourceHubPage;
  review: ReviewPage;
  randomSetup: RandomSetupPage;
  progressPage: ProgressPage;
  palette: CommandPalettePage;
  glossary: GlossaryPage;
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

  noThirdPartyRequests: [
    async ({ page, baseURL }, use) => {
      if (!baseURL) throw new Error('Set use.baseURL in playwright.config.ts');
      await blockThirdPartyRequests(page, baseURL);
      await use();
    },
    { auto: true },
  ],

  glossary: async ({ page }, use) => {
    await use(new GlossaryPage(page));
  },

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

  palette: async ({ page }, use) => {
    await use(new CommandPalettePage(page));
  },
});

export { expect };
