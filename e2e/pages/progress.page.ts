import type { Locator, Page } from '@playwright/test';
import { waitForHydration } from '../helpers/hydration';

/** Personal progress page with the backup controls. */
export class ProgressPage {
  readonly downloadButton: Locator;
  readonly importInput: Locator;
  readonly replaceButton: Locator;
  readonly clearButton: Locator;
  readonly confirmClearButton: Locator;
  readonly status: Locator;

  constructor(readonly page: Page) {
    this.downloadButton = page.getByRole('button', { name: 'Baixar backup' });
    this.importInput = page.getByLabel('Importar backup');
    this.replaceButton = page.getByRole('button', { name: 'Substituir meu progresso' });
    this.clearButton = page.getByRole('button', { name: 'Apagar meu progresso' });
    this.confirmClearButton = page.getByRole('button', { name: 'Apagar tudo' });
    this.status = page.getByRole('status');
  }

  async open() {
    await this.page.goto('/progresso');
    await waitForHydration(this.page);
  }

  /**
   * Finds the number shown for a headline stat.
   *
   * @param label - Stat label, e.g. 'Respondidas'.
   * @returns The value element.
   */
  stat(label: string): Locator {
    return this.page.locator('dt', { hasText: label }).locator('xpath=following-sibling::dd[1]');
  }
}
