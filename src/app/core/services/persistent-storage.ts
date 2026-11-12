import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { STORAGE_PREFIX } from '../constants/storage.constants';
import type { StorageValidator } from '../interfaces/storage.interface';
import { reportError } from '../lib/report-error';

/**
 * Safe localStorage access: a no-op on the server, never throws, and discards corrupted or
 * unexpectedly shaped values.
 */
@Injectable({ providedIn: 'root' })
export class PersistentStorage {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /**
   * Reads and deserializes a value.
   *
   * @param key - Key without the app prefix.
   * @param isValid - Type guard for the expected shape.
   * @returns The validated value, or `null` if missing, corrupted or invalid.
   */
  read<T>(key: string, isValid: StorageValidator<T>): T | null {
    const raw = this.readRaw(key);
    if (raw === null) return null;
    try {
      const parsed: unknown = JSON.parse(raw);
      if (isValid(parsed)) return parsed;
      reportError(`storage: invalid shape (${key})`, parsed);
    } catch (error) {
      reportError(`storage: corrupted value (${key})`, error);
    }
    this.remove(key);
    return null;
  }

  /**
   * Serializes and writes a value.
   *
   * @param key - Key without the app prefix.
   * @param value - Any JSON-serializable value.
   * @returns False when it could not be written.
   */
  write(key: string, value: unknown): boolean {
    return this.writeRaw(key, JSON.stringify(value));
  }

  /**
   * Reads a raw string value without deserializing.
   *
   * @param key - Key without the app prefix.
   * @returns The stored string, or `null`.
   */
  readRaw(key: string): string | null {
    if (!this.isBrowser) return null;
    try {
      return localStorage.getItem(STORAGE_PREFIX + key);
    } catch (error) {
      reportError(`storage: read (${key})`, error);
      return null;
    }
  }

  /**
   * Writes a raw string value without serializing.
   *
   * @param key - Key without the app prefix.
   * @param value - String to store.
   * @returns False when it could not be written.
   */
  writeRaw(key: string, value: string): boolean {
    if (!this.isBrowser) return false;
    try {
      localStorage.setItem(STORAGE_PREFIX + key, value);
      return true;
    } catch (error) {
      reportError(`storage: write (${key})`, error);
      return false;
    }
  }

  /**
   * Removes a key.
   *
   * @param key - Key without the app prefix.
   */
  remove(key: string): void {
    if (!this.isBrowser) return;
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (error) {
      reportError(`storage: remove (${key})`, error);
    }
  }
}
