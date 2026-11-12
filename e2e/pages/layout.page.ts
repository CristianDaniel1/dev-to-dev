import type { Locator, Page } from '@playwright/test';

/** App shell shared by every page: header, theme toggle and mobile menu. */
export class LayoutPage {
  readonly html: Locator;
  readonly themeToggle: Locator;
  readonly openMenuButton: Locator;
  readonly mobileMenu: Locator;
  readonly mainHeading: Locator;

  constructor(readonly page: Page) {
    this.html = page.locator('html');
    this.themeToggle = page.getByRole('button', { name: 'Tema escuro' });
    this.openMenuButton = page.getByRole('button', { name: 'Abrir menu' });
    this.mobileMenu = page.getByRole('dialog', { name: 'Navegação principal' });
    this.mainHeading = page.getByRole('heading', { level: 1 });
  }

  /**
   * Opens a page of the app.
   *
   * @param path - Route path, e.g. '/sobre'.
   */
  async open(path: string) {
    await this.page.goto(path);
  }

  /**
   * Navigates through the mobile menu.
   *
   * @param label - Link text in the menu.
   */
  async navigateWithMobileMenu(label: string) {
    await this.openMenuButton.click();
    await this.mobileMenu.getByRole('link', { name: label }).click();
  }
}
