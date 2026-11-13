import type { Locator, Page } from '@playwright/test';
import { waitForHydration } from '../helpers/hydration';

/** Glossary index and term pages. */
export class GlossaryPage {
  readonly groupFilter: Locator;
  readonly letters: Locator;
  readonly count: Locator;

  constructor(readonly page: Page) {
    this.groupFilter = page.getByRole('navigation', { name: 'Filtrar por tecnologia' });
    this.letters = page.getByRole('navigation', { name: 'Ir para a letra' });
    this.count = page.getByRole('status').filter({ hasText: /\d+ termos/ });
  }

  /**
   * Opens a glossary page and waits for hydration.
   *
   * @param path - Page path, '/glossario' by default; may include a query string.
   */
  async open(path = '/glossario') {
    await this.page.goto(path);
    await waitForHydration(this.page);
  }

  /**
   * Finds the link of a term in the index or among related terms.
   *
   * @param name - Term name, e.g. 'Closure'.
   * @returns The term link.
   */
  term(name: string): Locator {
    return this.page.getByRole('main').getByRole('link', { name, exact: true });
  }

  /**
   * Finds a group filter link.
   *
   * @param name - Group name, e.g. 'SQL'.
   * @returns The filter link (its name ends with the term count).
   */
  group(name: string): Locator {
    return this.groupFilter.getByRole('link', { name: new RegExp(`^${name} \\d+$`) });
  }

  /**
   * Finds the section of a letter.
   *
   * @param letter - Uppercase letter.
   * @returns The section region.
   */
  section(letter: string): Locator {
    return this.page.getByRole('region', { name: `Letra ${letter}` });
  }
}
