import { TestBed } from '@angular/core/testing';
import { FAVORITES_STORAGE_KEY, STORAGE_PREFIX } from '@/core/constants/storage.constants';
import { FavoritesStore } from './favorites.store';

const STORAGE_KEY = STORAGE_PREFIX + FAVORITES_STORAGE_KEY;

describe('FavoritesStore', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => vi.restoreAllMocks());

  it('toggles favorites and persists them', () => {
    const store = TestBed.inject(FavoritesStore);

    store.toggle('mdn');
    store.toggle('figma');
    store.toggle('mdn');

    expect(store.has('figma')).toBe(true);
    expect(store.has('mdn')).toBe(false);
    expect(store.count()).toBe(1);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')).toEqual(['figma']);
  });

  it('restores saved favorites without duplicates', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['mdn', 'mdn', 'figma']));
    const store = TestBed.inject(FavoritesStore);
    expect([...store.ids()]).toEqual(['mdn', 'figma']);
  });

  it('discards an invalid stored value', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ mdn: true }));
    const store = TestBed.inject(FavoritesStore);
    expect(store.count()).toBe(0);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
