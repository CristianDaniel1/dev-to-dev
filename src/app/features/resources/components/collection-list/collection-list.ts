import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RESOURCE_INDEX } from '@/shared/generated/resource-index';
import { resourceCountLabel } from '../../lib/resource-count-label';

/** Curated collections, each a short sequence of resources for one goal. */
@Component({
  selector: 'app-collection-list',
  imports: [RouterLink],
  templateUrl: './collection-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionList {
  protected readonly collections = RESOURCE_INDEX.collections;
  protected readonly countLabel = resourceCountLabel;
}
