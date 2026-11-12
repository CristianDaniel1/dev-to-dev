import type { Locator, Page } from '@playwright/test';
import { waitForHydration } from '../helpers/hydration';

/** Tech page: topics and the session setup form. */
export class TechOverviewPage {
  readonly setup: Locator;
  readonly startButton: Locator;
  readonly availability: Locator;
  readonly noMatches: Locator;

  constructor(readonly page: Page) {
    this.setup = page.getByRole('region', { name: 'Montar sessão' });
    this.startButton = this.setup.getByRole('link', { name: 'Começar a praticar' });
    this.availability = this.setup.getByText(/perguntas disponíveis/);
    this.noMatches = this.setup.getByText('Nenhuma pergunta com esses filtros.', { exact: false });
  }

  /**
   * Opens the page of a tech.
   *
   * @param slug - Tech slug, e.g. 'html'.
   */
  async open(slug: string) {
    await this.page.goto(`/quizzes/${slug}`);
    await waitForHydration(this.page);
  }

  /**
   * Toggles a topic filter.
   *
   * @param name - Topic name.
   */
  async toggleTopic(name: string) {
    await this.setup.getByRole('button', { name, exact: true }).click();
  }

  /**
   * Picks a difficulty level.
   *
   * @param label - Level label, e.g. 'Avançado'.
   */
  async chooseLevel(label: string) {
    await this.setup
      .getByRole('group', { name: 'Nível' })
      .getByText(label, { exact: true })
      .click();
  }

  /**
   * Picks how many questions the session has.
   *
   * @param label - Size label, e.g. '5' or 'Todas'.
   */
  async chooseSize(label: string) {
    await this.setup
      .getByRole('group', { name: 'Perguntas por sessão' })
      .getByText(label, { exact: true })
      .click();
  }
}
