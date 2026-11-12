import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Breadcrumb } from '@/shared/components/breadcrumb/breadcrumb';
import { EmptyState } from '@/shared/components/empty-state/empty-state';
import { RESOURCE_BREADCRUMB } from '../../data/resource-breadcrumb.data';
import { findCategory } from '../../lib/find-category';
import { resourceCountLabel } from '../../lib/resource-count-label';
import { ResourceBrowser } from '../resource-browser/resource-browser';

/** Page of one resource category, with the same filters as the hub. */
@Component({
  selector: 'app-category-page',
  imports: [RouterLink, Breadcrumb, EmptyState, ResourceBrowser],
  templateUrl: './category-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPage {
  /** Route param, bound by `withComponentInputBinding`. */
  readonly categoria = input.required<string>();

  protected readonly trail = RESOURCE_BREADCRUMB;

  protected readonly category = computed(() => findCategory(this.categoria()));
  protected readonly countLabel = computed(() =>
    resourceCountLabel(this.category()?.resourceCount ?? 0),
  );
}
