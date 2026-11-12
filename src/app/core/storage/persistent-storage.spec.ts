import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PersistentStorage, STORAGE_PREFIX } from './persistent-storage';

interface Sample {
  count: number;
}

const isSample = (value: unknown): value is Sample =>
  typeof value === 'object' && value !== null && typeof (value as Sample).count === 'number';

describe('PersistentStorage', () => {
  let storage: PersistentStorage;

  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    storage = TestBed.inject(PersistentStorage);
  });

  afterEach(() => vi.restoreAllMocks());

  it('writes with the prefix and reads back the validated value', () => {
    expect(storage.write('sample', { count: 3 })).toBe(true);
    expect(localStorage.getItem(`${STORAGE_PREFIX}sample`)).toBe('{"count":3}');
    expect(storage.read('sample', isSample)).toEqual({ count: 3 });
  });

  it('returns null for a missing key', () => {
    expect(storage.read('missing', isSample)).toBeNull();
  });

  it('discards corrupted JSON instead of throwing', () => {
    localStorage.setItem(`${STORAGE_PREFIX}sample`, '{not json');
    expect(storage.read('sample', isSample)).toBeNull();
    expect(localStorage.getItem(`${STORAGE_PREFIX}sample`)).toBeNull();
  });

  it('discards values with an unexpected shape', () => {
    localStorage.setItem(`${STORAGE_PREFIX}sample`, '{"count":"three"}');
    expect(storage.read('sample', isSample)).toBeNull();
    expect(localStorage.getItem(`${STORAGE_PREFIX}sample`)).toBeNull();
  });

  it('does not throw when localStorage rejects the write', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Quota exceeded', 'QuotaExceededError');
    });
    expect(storage.write('sample', { count: 1 })).toBe(false);
  });
});

describe('PersistentStorage on the server', () => {
  it('never touches localStorage', () => {
    TestBed.configureTestingModule({ providers: [{ provide: PLATFORM_ID, useValue: 'server' }] });
    const getItem = vi.spyOn(Storage.prototype, 'getItem');
    const storage = TestBed.inject(PersistentStorage);

    expect(storage.readRaw('theme')).toBeNull();
    expect(storage.write('theme', 'dark')).toBe(false);
    expect(getItem).not.toHaveBeenCalled();
    vi.restoreAllMocks();
  });
});
