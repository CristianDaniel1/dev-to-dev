import type { Locator, Page } from '@playwright/test';
import { waitForHydration } from '../helpers/hydration';

/** Learning paths index and path pages. */
export class PathsPage {
  readonly progress: Locator;

  constructor(readonly page: Page) {
    this.progress = page.getByRole('status').filter({ hasText: /etapas concluídas/ });
  }

  /**
   * Opens a paths page and waits for hydration.
   *
   * @param path - Page path, '/trilhas' by default.
   */
  async open(path = '/trilhas') {
    await this.page.goto(path);
    await waitForHydration(this.page);
  }

  /**
   * Finds a step of the open path.
   *
   * @param position - Step number, starting at 1.
   * @param title - Step title.
   * @returns The step article.
   */
  step(position: number, title: string): Locator {
    return this.page.getByRole('article', { name: `Etapa ${position}: ${title}` });
  }

  /**
   * Finds the done toggle of a step.
   *
   * @param step - Step article.
   * @returns The toggle button.
   */
  doneToggle(step: Locator): Locator {
    return step.getByRole('button', { name: 'Concluí esta etapa' });
  }
}
