import type { Locator, Page } from '@playwright/test';
import { waitForHydration } from '../helpers/hydration';

/** Random mode setup. */
export class RandomSetupPage {
  readonly setup: Locator;
  readonly startButton: Locator;

  constructor(readonly page: Page) {
    this.setup = page.getByRole('region', { name: 'Montar rodada' });
    this.startButton = this.setup.getByRole('link', { name: 'Começar a rodada' });
  }

  async open() {
    await this.page.goto('/aleatorio');
    await waitForHydration(this.page);
  }

  /**
   * Toggles a tech chip.
   *
   * @param name - Tech name, e.g. 'CSS'.
   */
  async toggleTech(name: string) {
    await this.setup.getByRole('button', { name, exact: true }).click();
  }

  /**
   * Picks how many questions the round has.
   *
   * @param label - Size label, e.g. '5'.
   */
  async chooseSize(label: string) {
    await this.setup
      .getByRole('group', { name: 'Perguntas por rodada' })
      .getByText(label, { exact: true })
      .click();
  }
}
