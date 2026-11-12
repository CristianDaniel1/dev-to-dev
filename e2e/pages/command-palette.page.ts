import type { Locator, Page } from '@playwright/test';
import { waitForHydration } from '../helpers/hydration';

/** Command palette (Ctrl+K) available on every page. */
export class CommandPalettePage {
  readonly trigger: Locator;
  readonly dialog: Locator;
  readonly input: Locator;
  readonly options: Locator;
  readonly noResults: Locator;

  constructor(readonly page: Page) {
    this.trigger = page.getByRole('banner').getByRole('button', { name: 'Buscar' });
    this.dialog = page.getByRole('dialog', { name: 'Buscar no Dev to Dev' });
    this.input = this.dialog.getByRole('combobox', { name: 'Buscar' });
    this.options = this.dialog.getByRole('option');
    this.noResults = this.dialog.getByText(/Nada encontrado para/);
  }

  /**
   * Opens a page and waits until the shortcut works.
   *
   * @param path - Page path.
   */
  async goto(path = '/') {
    await this.page.goto(path);
    await waitForHydration(this.page);
  }

  async openWithShortcut() {
    await this.page.keyboard.press('ControlOrMeta+k');
  }

  /**
   * Types a search in the palette.
   *
   * @param query - Text to search.
   */
  async search(query: string) {
    await this.input.fill(query);
  }

  /**
   * Finds a result by its title.
   *
   * @param title - Result title.
   * @returns The option.
   */
  option(title: string): Locator {
    return this.options.filter({ hasText: title });
  }
}
