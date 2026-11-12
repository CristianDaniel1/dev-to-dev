import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { injectIsHydrated } from '@/core/lib/hydration';
import { Icon } from '@/shared/components/icon/icon';
import type { Resource } from '@/shared/interfaces/resource.interface';
import { FavoritesStore } from '../../services/favorites.store';

/** Saves or removes a resource from the favorites. Shows "not saved" until hydration. */
@Component({
  selector: 'app-favorite-toggle',
  imports: [Icon],
  templateUrl: './favorite-toggle.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteToggle {
  readonly resource = input.required<Resource>();

  private readonly favorites = inject(FavoritesStore);
  protected readonly isHydrated = injectIsHydrated();
  protected readonly isSaved = computed(
    () => this.isHydrated() && this.favorites.has(this.resource().id),
  );

  protected toggle(): void {
    this.favorites.toggle(this.resource().id);
  }
}
