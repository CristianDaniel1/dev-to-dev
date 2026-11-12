import { expect, type Locator, type Page } from '@playwright/test';

/** Confidence labels shown before revealing an answer. */
export type ConfidenceLabel = 'Tenho certeza' | 'Acho que sim' | 'Chutei';

/** Practice session: question, confidence, feedback and results. */
export class QuizSessionPage {
  readonly counter: Locator;
  readonly options: Locator;
  readonly multipleHint: Locator;
  readonly feedback: Locator;
  readonly nextButton: Locator;
  readonly resultsHeading: Locator;
  readonly score: Locator;
  readonly reviewHeading: Locator;
  readonly retryMistakesLink: Locator;
  readonly emptyState: Locator;
  readonly examSubmitButton: Locator;
  readonly timer: Locator;
  readonly unansweredNote: Locator;

  constructor(readonly page: Page) {
    this.counter = page.getByText(/Pergunta \d+ de \d+/);
    this.options = page.getByRole('list', { name: 'Alternativas' }).getByRole('button');
    this.multipleHint = page.getByText('Marque todas as alternativas corretas.');
    this.feedback = page.getByText(/Você acertou\.|Não foi dessa vez\./);
    this.nextButton = page.getByRole('button', { name: /^(Próxima pergunta|Ver resultado)$/ });
    this.resultsHeading = page.getByRole('heading', {
      level: 2,
      name: /Gabaritou|Mandou bem|Está no caminho|Hora de revisar/,
    });
    this.score = page.getByText(/\d+ de \d+ certas/);
    this.reviewHeading = page.getByRole('heading', { name: 'Revisão das perguntas' });
    this.retryMistakesLink = page.getByRole('link', {
      name: /^Refazer (a que ficou|as \d+ que ficaram) para revisão$/,
    });
    this.emptyState = page.getByRole('heading', { name: 'Nenhuma pergunta com esses filtros' });
    this.examSubmitButton = page.getByRole('button', {
      name: /^Responder e (seguir|ver o resultado)$/,
    });
    this.timer = page.getByRole('timer', { name: 'Tempo restante' });
    this.unansweredNote = page.getByText(/ficaram? sem resposta/);
  }

  /**
   * Opens a session directly by URL.
   *
   * @param slug - Tech slug.
   * @param query - Query string without the '?', e.g. 'qtd=5'.
   */
  async open(slug: string, query = '') {
    await this.page.goto(`/quizzes/${slug}/praticar${query ? `?${query}` : ''}`);
  }

  /**
   * Opens an exam directly by URL.
   *
   * @param slug - Tech slug.
   * @param query - Query string without the '?', e.g. 'tempo=10'.
   */
  async openExam(slug: string, query = '') {
    await this.page.goto(`/quizzes/${slug}/simulado${query ? `?${query}` : ''}`);
  }

  /**
   * Finds the session title in the header, e.g. 'Revisão'.
   *
   * @param title - Expected title.
   * @returns The title text.
   */
  title(title: string): Locator {
    return this.page.getByText(title, { exact: true }).first();
  }

  /**
   * Finds an option by its accessible name (the letter badge is hidden from it).
   *
   * @param name - Option text, e.g. '4'.
   * @returns The option button.
   */
  option(name: string): Locator {
    return this.page
      .getByRole('list', { name: 'Alternativas' })
      .getByRole('button', { name, exact: true });
  }

  /**
   * Submits the current selection with a confidence level.
   *
   * @param confidence - Label of the confidence button.
   */
  async submit(confidence: ConfidenceLabel = 'Tenho certeza') {
    await this.page.getByRole('button', { name: confidence }).click();
  }

  /**
   * Answers the current question with the keyboard: picks the first option (and the second for
   * multiple choice), submits and waits for the feedback.
   *
   * @param confidence - Label of the confidence button.
   */
  async answerWithKeyboard(confidence: ConfidenceLabel = 'Tenho certeza') {
    await expect(this.options.first()).toBeVisible();
    await this.page.keyboard.press('a');
    if (await this.multipleHint.isVisible()) await this.page.keyboard.press('b');
    await this.submit(confidence);
    await expect(this.feedback).toBeVisible();
  }

  /** Goes to the next question (or the results) with the Enter key. */
  async continueWithEnter() {
    await this.page.locator('body').press('Enter');
  }
}
