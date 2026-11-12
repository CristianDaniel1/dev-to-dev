import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FAVORITES_STORAGE_KEY } from '@/core/constants/storage.constants';
import { PersistentStorage } from '@/core/services/persistent-storage';
import { isFavoriteIds } from '../lib/favorite-ids';

/**
 * Resources saved as favorites, kept only in this browser. Empty on the server, so prerendered
 * pages show every resource as not saved.
 */
@Injectable({ providedIn: 'root' })
export class FavoritesStore {
  private readonly storage = inject(PersistentStorage);
  private readonly list = signal<readonly string[]>([]);

  /** Saved ids, for fast lookups. */
  readonly ids = computed<ReadonlySet<string>>(() => new Set(this.list()));
  readonly count = computed(() => this.list().length);

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    const stored = this.storage.read(FAVORITES_STORAGE_KEY, isFavoriteIds);
    if (stored) this.list.set([...new Set(stored)]);
  }

  /**
   * Tells whether a resource is saved. Reactive inside `computed` and templates.
   *
   * @param id - Resource id.
   * @returns True when the resource is a favorite.
   */
  has(id: string): boolean {
    return this.ids().has(id);
  }

  /**
   * Saves a resource, or removes it when it is already saved, and persists the list.
   *
   * @param id - Resource id.
   */
  toggle(id: string): void {
    this.list.update((ids) =>
      ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id],
    );
    this.storage.write(FAVORITES_STORAGE_KEY, this.list());
  }
}
