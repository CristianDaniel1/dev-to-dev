import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RESOURCE_INDEX } from '@/shared/generated/resource-index';

/** Index of the resource categories, like the index of a book, with a count per entry. */
@Component({
  selector: 'app-category-index',
  imports: [RouterLink],
  templateUrl: './category-index.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryIndex {
  protected readonly categories = RESOURCE_INDEX.categories;
}
