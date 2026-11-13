import type { Locator, Page } from '@playwright/test';
import { waitForHydration } from '../helpers/hydration';

/** Resource list pages (hub and categories): filters, results and favorites. */
export class ResourceHubPage {
  readonly filters: Locator;
  readonly searchBox: Locator;
  readonly status: Locator;
  readonly cards: Locator;
  readonly clearButton: Locator;
  readonly onlyFavorites: Locator;
  readonly emptyHeading: Locator;
  readonly showFiltersButton: Locator;

  constructor(readonly page: Page) {
    this.filters = page.getByRole('search', { name: 'Filtrar recursos' });
    this.searchBox = this.filters.getByRole('searchbox', { name: 'Buscar recursos' });
    this.status = page.getByRole('status');
    this.cards = page.getByRole('article');
    this.clearButton = page.getByRole('button', { name: 'Limpar filtros' }).first();
    this.onlyFavorites = this.filters.getByRole('checkbox', { name: 'Só meus favoritos' });
    this.emptyHeading = page.getByRole('heading', { name: 'Nenhum recurso com esses filtros' });
    this.showFiltersButton = this.filters.getByRole('button', { name: 'Mostrar filtros' });
  }

  /**
   * Opens a resource page and waits for hydration.
   *
   * @param path - Page path, '/recursos' by default; may include a query string.
   */
  async open(path = '/recursos') {
    await this.page.goto(path);
    await waitForHydration(this.page);
  }

  /** Opens the filter panel, which starts collapsed on small screens. */
  async revealFilters() {
    if (await this.showFiltersButton.isVisible()) await this.showFiltersButton.click();
  }

  /** Turns the "only my favorites" filter on. */
  async showOnlyFavorites() {
    await this.revealFilters();
    await this.onlyFavorites.check();
  }

  /**
   * Picks an option of a segmented filter.
   *
   * @param group - Filter name, e.g. 'Preço'.
   * @param label - Option label, e.g. 'Gratuito'.
   */
  async choose(group: 'Preço' | 'Idioma', label: string) {
    await this.revealFilters();
    await this.filters
      .getByRole('group', { name: group })
      .getByText(label, { exact: true })
      .click();
  }

  /**
   * Picks an option of a select filter.
   *
   * @param name - Select label, e.g. 'Tipo'.
   * @param label - Option label, e.g. 'Prática'.
   */
  async select(name: 'Tipo' | 'Tecnologia' | 'Ordem', label: string) {
    await this.revealFilters();
    await this.filters.getByRole('combobox', { name }).selectOption({ label });
  }

  /**
   * Finds the card of a resource.
   *
   * @param name - Resource name.
   * @returns The card.
   */
  card(name: string): Locator {
    return this.cards.filter({
      has: this.page.getByRole('link', { name: `${name} (abre em nova aba)`, exact: true }),
    });
  }

  /**
   * Finds the decorative site icon of a resource card (hidden from assistive technology).
   *
   * @param name - Resource name.
   * @returns The icon image.
   */
  siteIcon(name: string): Locator {
    return this.card(name).locator('img');
  }

  /**
   * Finds the selected option of a select filter.
   *
   * @param name - Select label, e.g. 'Tipo'.
   * @returns The checked option, whose text is the visible choice.
   */
  selectedOption(name: 'Tipo' | 'Tecnologia' | 'Ordem'): Locator {
    return this.filters.getByRole('combobox', { name }).locator('option:checked');
  }

  /**
   * Finds the favorite button of a resource.
   *
   * @param name - Resource name.
   * @returns The toggle button.
   */
  favoriteButton(name: string): Locator {
    return this.page.getByRole('button', { name: `Salvar ${name} nos favoritos` });
  }
}
