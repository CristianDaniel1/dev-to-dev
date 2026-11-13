import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Icon } from '@/shared/components/icon/icon';
import type { Resource } from '@/shared/interfaces/resource.interface';
import {
  LANGUAGE_LABELS,
  LANGUAGE_TAGS,
  PRICING_LABELS,
  RESOURCE_TYPE_LABELS,
  TECH_LABELS,
} from '../../data/resource-labels.data';
import { FavoriteToggle } from '../favorite-toggle/favorite-toggle';
import { ResourceFavicon } from '../resource-favicon/resource-favicon';

/** One resource as a bibliography entry: what it is, why it is recommended and its details. */
@Component({
  selector: 'app-resource-item',
  imports: [Icon, FavoriteToggle, ResourceFavicon],
  templateUrl: './resource-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ResourceItem {
  readonly resource = input.required<Resource>();
  /** Heading level of the resource name, so it fits the page outline. */
  readonly headingLevel = input<2 | 3>(3);

  protected readonly typeLabels = RESOURCE_TYPE_LABELS;
  protected readonly pricingLabels = PRICING_LABELS;
  protected readonly techLabels = TECH_LABELS;
  protected readonly languageTags = computed(() =>
    this.resource()
      .languages.map((language) => LANGUAGE_TAGS[language])
      .join(' / '),
  );
  protected readonly languageNames = computed(() =>
    this.resource()
      .languages.map((language) => LANGUAGE_LABELS[language])
      .join(' e '),
  );
}
