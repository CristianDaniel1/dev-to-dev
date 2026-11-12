import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { injectIsHydrated } from '@/core/lib/hydration';
import { EmptyState } from '@/shared/components/empty-state/empty-state';
import {
  PRICINGS,
  RESOURCE_LANGUAGES,
  RESOURCE_TECHS,
  RESOURCE_TYPES,
} from '@/shared/constants/resource.constants';
import { RESOURCE_LIBRARY } from '@/shared/generated/resource-library';
import { EMPTY_RESOURCE_FILTERS } from '../../constants/resource-filters.constants';
import {
  LANGUAGE_LABELS,
  PRICING_LABELS,
  RESOURCE_TYPE_LABELS,
  TECH_LABELS,
} from '../../data/resource-labels.data';
import type { ResourceFilters } from '../../interfaces/resource-filters.interface';
import { filterOptions } from '../../lib/filter-options';
import { filterResources } from '../../lib/filter-resources';
import { resourceCountLabel } from '../../lib/resource-count-label';
import { hasActiveFilters, toResourceFilters, toResourceQuery } from '../../lib/resource-params';
import { sortResources } from '../../lib/sort-resources';
import { FavoritesStore } from '../../services/favorites.store';
import { ResourceCard } from '../resource-card/resource-card';
import { ResourceFilterBar } from '../resource-filter-bar/resource-filter-bar';

/**
 * Filterable resource list. Filters live in the URL query, so a filtered list can be shared and
 * the back button undoes a filter. Prerendered unfiltered; the URL filters apply after hydration.
 */
@Component({
  selector: 'app-resource-browser',
  imports: [EmptyState, ResourceCard, ResourceFilterBar],
  templateUrl: './resource-browser.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceBrowser {
  /** Category slug to list; every resource when omitted. */
  readonly category = input<string>();
  readonly heading = input('Todos os recursos');

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly favorites = inject(FavoritesStore);
  private readonly isHydrated = injectIsHydrated();
  private readonly queryParams = toSignal(this.route.queryParamMap, { requireSync: true });

  protected readonly filters = computed<ResourceFilters>(() => {
    if (!this.isHydrated()) return EMPTY_RESOURCE_FILTERS;
    const params = this.queryParams();
    return toResourceFilters({
      q: params.get('q'),
      tipo: params.get('tipo'),
      preco: params.get('preco'),
      idioma: params.get('idioma'),
      tech: params.get('tech'),
      favoritos: params.get('favoritos'),
      ordem: params.get('ordem'),
    });
  });

  private readonly listed = computed(() => {
    const category = this.category();
    return category
      ? RESOURCE_LIBRARY.resources.filter((resource) => resource.category === category)
      : RESOURCE_LIBRARY.resources;
  });

  protected readonly results = computed(() =>
    sortResources(
      filterResources(this.listed(), this.filters(), this.favorites.ids()),
      this.filters().sort,
    ),
  );
  protected readonly countLabel = computed(() => resourceCountLabel(this.results().length));
  protected readonly isFiltering = computed(() => hasActiveFilters(this.filters()));
  protected readonly hasNoFavorites = computed(
    () => this.filters().onlyFavorites && this.favorites.count() === 0,
  );

  protected readonly typeOptions = computed(() =>
    filterOptions(
      RESOURCE_TYPES,
      this.listed().map((resource) => resource.type),
      RESOURCE_TYPE_LABELS,
    ),
  );
  protected readonly techOptions = computed(() =>
    filterOptions(
      RESOURCE_TECHS,
      this.listed().flatMap((resource) => resource.techs),
      TECH_LABELS,
    ),
  );
  protected readonly pricingOptions = computed(() =>
    filterOptions(
      PRICINGS,
      this.listed().map((resource) => resource.pricing),
      PRICING_LABELS,
    ),
  );
  protected readonly languageOptions = computed(() =>
    filterOptions(
      RESOURCE_LANGUAGES,
      this.listed().flatMap((resource) => resource.languages),
      LANGUAGE_LABELS,
    ),
  );

  /**
   * Applies a filter change through the URL.
   *
   * @param patch - Changed filters.
   * @param replaceUrl - Replace the history entry instead of adding one (used while typing).
   */
  protected update(patch: Partial<ResourceFilters>, replaceUrl = false): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: toResourceQuery({ ...this.filters(), ...patch }),
      replaceUrl,
      scroll: 'manual',
    });
  }

  protected search(query: string): void {
    this.update({ query }, true);
  }

  protected clear(): void {
    this.update({ ...EMPTY_RESOURCE_FILTERS, sort: this.filters().sort });
  }
}
