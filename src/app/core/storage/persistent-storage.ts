import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { reportError } from '@/core/error/report-error';

/** Prefix for every app key in localStorage. */
export const STORAGE_PREFIX = 'd2d:';

/** Type guard that checks the shape of a value read from storage. */
export type StorageValidator<T> = (value: unknown) => value is T;

/**
 * Safe localStorage access: a no-op on the server, never throws, and discards
 * corrupted or unexpectedly shaped values.
 */
@Injectable({ providedIn: 'root' })
export class PersistentStorage {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /**
   * Reads and deserializes a value.
   * @returns The validated value, or `null` if missing, corrupted or invalid.
   */
  read<T>(key: string, isValid: StorageValidator<T>): T | null {
    const raw = this.readRaw(key);
    if (raw === null) return null;
    try {
      const parsed: unknown = JSON.parse(raw);
      if (isValid(parsed)) return parsed;
      reportError(`storage:invalid-shape:${key}`, parsed);
    } catch (error) {
      reportError(`storage:corrupted:${key}`, error);
    }
    this.remove(key);
    return null;
  }

  /** Serializes and writes a value. Returns `false` if it could not be written. */
  write(key: string, value: unknown): boolean {
    if (!this.isBrowser) return false;
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (error) {
      reportError(`storage:write:${key}`, error);
      return false;
    }
  }

  /** Reads a raw string value without deserializing. */
  readRaw(key: string): string | null {
    if (!this.isBrowser) return null;
    try {
      return localStorage.getItem(STORAGE_PREFIX + key);
    } catch (error) {
      reportError(`storage:read:${key}`, error);
      return null;
    }
  }

  /** Writes a raw string value without serializing. */
  writeRaw(key: string, value: string): boolean {
    if (!this.isBrowser) return false;
    try {
      localStorage.setItem(STORAGE_PREFIX + key, value);
      return true;
    } catch (error) {
      reportError(`storage:write:${key}`, error);
      return false;
    }
  }

  /** Removes a key. */
  remove(key: string): void {
    if (!this.isBrowser) return;
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (error) {
      reportError(`storage:remove:${key}`, error);
    }
  }
}
