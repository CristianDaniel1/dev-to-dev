import { TestBed } from '@angular/core/testing';
import { PATHS_STORAGE_KEY, STORAGE_PREFIX } from '@/core/constants/storage.constants';
import { PathProgressStore } from './path-progress.store';

const STORAGE_KEY = STORAGE_PREFIX + PATHS_STORAGE_KEY;

describe('PathProgressStore', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => vi.restoreAllMocks());

  it('marks and unmarks steps and persists the checklist', () => {
    const store = TestBed.inject(PathProgressStore);

    store.toggle('git-do-zero', 'commits');
    store.toggle('git-do-zero', 'branches');
    store.toggle('git-do-zero', 'commits');

    expect(store.isDone('git-do-zero', 'branches')).toBe(true);
    expect(store.isDone('git-do-zero', 'commits')).toBe(false);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')).toEqual({
      'git-do-zero': ['branches'],
    });
  });

  it('counts only the steps the path still has', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 'git-do-zero': ['commits', 'antigo'] }));
    const store = TestBed.inject(PathProgressStore);

    expect(store.doneCount('git-do-zero', ['commits', 'branches'])).toBe(1);
  });

  it('discards an invalid stored value', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['commits']));
    const store = TestBed.inject(PathProgressStore);

    expect(store.isDone('git-do-zero', 'commits')).toBe(false);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
