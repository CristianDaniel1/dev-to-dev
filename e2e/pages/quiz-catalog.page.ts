import type { Locator, Page } from '@playwright/test';

/** Quiz catalog with one card per tech. */
export class QuizCatalogPage {
  readonly title: Locator;

  constructor(readonly page: Page) {
    this.title = page.getByRole('heading', { level: 1, name: 'Quizzes' });
  }

  async open() {
    await this.page.goto('/quizzes');
  }

  /**
   * Finds the card of a tech.
   *
   * @param name - Tech name, e.g. 'JavaScript'.
   * @returns The card link.
   */
  techCard(name: string): Locator {
    return this.page.getByRole('link').filter({ has: this.page.getByRole('heading', { name }) });
  }
}
