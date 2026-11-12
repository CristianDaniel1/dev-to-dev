import {
  type ElementRef,
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  afterRenderEffect,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { Icon } from '@/shared/components/icon/icon';
import type {
  Pricing,
  ResourceLanguage,
  ResourceTech,
  ResourceType,
} from '@/shared/interfaces/resource.interface';
import { SORT_OPTIONS } from '../../data/sort-options.data';
import type { FilterOption } from '../../interfaces/filter-option.interface';
import type { ResourceFilters } from '../../interfaces/resource-filters.interface';
import { optionValue } from '../../lib/option-value';
import { countActiveFilters } from '../../lib/resource-params';

/** Search box and filter controls of a resource list. Stateless: it reports every change. */
@Component({
  selector: 'app-resource-filter-bar',
  imports: [Icon],
  templateUrl: './resource-filter-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceFilterBar {
  readonly filters = input.required<ResourceFilters>();
  readonly typeOptions = input.required<readonly FilterOption<ResourceType>[]>();
  readonly techOptions = input.required<readonly FilterOption<ResourceTech>[]>();
  readonly pricingOptions = input.required<readonly FilterOption<Pricing>[]>();
  readonly languageOptions = input.required<readonly FilterOption<ResourceLanguage>[]>();

  /** A filter changed; holds only the changed fields. */
  readonly filtersChange = output<Partial<ResourceFilters>>();
  /** The search text changed (on every keystroke). */
  readonly searchChange = output<string>();

  protected readonly sortOptions = SORT_OPTIONS;
  /** Whether the filters are open on small screens; they are always visible on large ones. */
  protected readonly isExpanded = signal(false);
  protected readonly activeCount = computed(() => countActiveFilters(this.filters()));
  private readonly document = inject(DOCUMENT);
  private readonly searchInput = viewChild.required<ElementRef<HTMLInputElement>>('search');

  constructor() {
    // The search box is uncontrolled while the user types in it; it only follows the URL when
    // the query changes from elsewhere (clearing the filters, going back in history).
    afterRenderEffect(() => {
      const query = this.filters().query;
      const element = this.searchInput().nativeElement;
      if (this.document.activeElement !== element && element.value.trim() !== query) {
        element.value = query;
      }
    });
  }

  protected selectType(raw: string): void {
    this.filtersChange.emit({ type: optionValue(this.typeOptions(), raw) });
  }

  protected selectTech(raw: string): void {
    this.filtersChange.emit({ tech: optionValue(this.techOptions(), raw) });
  }

  protected selectSort(raw: string): void {
    this.filtersChange.emit({ sort: optionValue(this.sortOptions, raw) ?? 'curated' });
  }
}
