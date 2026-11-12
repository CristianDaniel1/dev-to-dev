import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyState } from '@/shared/components/empty-state/empty-state';
import { PageHeader } from '@/shared/components/page-header/page-header';

/** Resource hub page. Placeholder until Phase 2. */
@Component({
  selector: 'app-resource-catalog',
  imports: [EmptyState, PageHeader],
  templateUrl: './resource-catalog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceCatalog {}
