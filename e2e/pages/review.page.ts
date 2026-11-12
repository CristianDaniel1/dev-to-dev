import type { Locator, Page } from '@playwright/test';
import { waitForHydration } from '../helpers/hydration';

/** Spaced review overview. */
export class ReviewPage {
  readonly dueSummary: Locator;
  readonly startButton: Locator;
  readonly nothingYet: Locator;

  constructor(readonly page: Page) {
    this.dueSummary = page.getByText(/\d+ perguntas? para revisar/);
    this.startButton = page.getByRole('link', { name: 'Começar a revisão' });
    this.nothingYet = page.getByRole('heading', { name: 'Ainda não há o que revisar' });
  }

  async open() {
    await this.page.goto('/revisao');
    await waitForHydration(this.page);
  }
}
