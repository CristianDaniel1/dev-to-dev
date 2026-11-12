import type { Locator, Page } from '@playwright/test';
import { waitForHydration } from '../helpers/hydration';

/** Home page and its sample question. */
export class HomePage {
  readonly sampleQuestion: Locator;
  readonly wrongFeedback: Locator;
  readonly rightFeedback: Locator;
  readonly answerAgainButton: Locator;

  constructor(readonly page: Page) {
    this.sampleQuestion = page.getByRole('article', {
      name: 'O que este código imprime no console?',
    });
    this.wrongFeedback = this.sampleQuestion.getByText('Não foi dessa vez.');
    this.rightFeedback = this.sampleQuestion.getByText('Você acertou.');
    this.answerAgainButton = this.sampleQuestion.getByRole('button', { name: 'Responder de novo' });
  }

  async open() {
    await this.page.goto('/');
    await waitForHydration(this.page);
  }

  /**
   * Answers the sample question.
   *
   * @param optionText - Visible text of the option, e.g. '"null"'.
   */
  async answer(optionText: string) {
    await this.sampleQuestion.getByRole('button', { name: optionText }).click();
  }
}
