import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Breadcrumb } from '@/shared/components/breadcrumb/breadcrumb';
import { EmptyState } from '@/shared/components/empty-state/empty-state';
import { RESOURCE_LIBRARY } from '@/shared/generated/resource-library';
import { RESOURCE_BREADCRUMB } from '../../data/resource-breadcrumb.data';
import { collectionEntries } from '../../lib/collection-entries';
import { ResourceCard } from '../resource-card/resource-card';

/** Page of one collection: its resources in order, each with a note on how to use it. */
@Component({
  selector: 'app-collection-page',
  imports: [RouterLink, Breadcrumb, EmptyState, ResourceCard],
  templateUrl: './collection-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionPage {
  /** Route param, bound by `withComponentInputBinding`. */
  readonly colecao = input.required<string>();

  protected readonly trail = RESOURCE_BREADCRUMB;

  protected readonly collection = computed(() =>
    RESOURCE_LIBRARY.collections.find((collection) => collection.slug === this.colecao()),
  );
  protected readonly entries = computed(() => {
    const collection = this.collection();
    return collection ? collectionEntries(collection, RESOURCE_LIBRARY.resources) : [];
  });
}
