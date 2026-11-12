import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeader } from '@/shared/components/page-header/page-header';
import { CategoryIndex } from '../category-index/category-index';
import { CollectionList } from '../collection-list/collection-list';
import { ResourceBrowser } from '../resource-browser/resource-browser';

/** Resource hub page: collections, the category index and every resource with filters. */
@Component({
  selector: 'app-resource-hub',
  imports: [PageHeader, CategoryIndex, CollectionList, ResourceBrowser],
  templateUrl: './resource-hub.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceHub {}
