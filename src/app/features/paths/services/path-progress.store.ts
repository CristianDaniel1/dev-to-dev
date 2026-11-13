import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PATHS_STORAGE_KEY } from '@/core/constants/storage.constants';
import { PersistentStorage } from '@/core/services/persistent-storage';
import type { PathChecklist } from '../interfaces/path-checklist.interface';
import { isPathChecklist } from '../lib/path-progress-shape';

/**
 * Steps of the learning paths the user marked as done, kept only in this browser. Empty on the
 * server, so prerendered pages show every step as not done.
 */
@Injectable({ providedIn: 'root' })
export class PathProgressStore {
  private readonly storage = inject(PersistentStorage);
  private readonly checklist = signal<PathChecklist>({});

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    const stored = this.storage.read(PATHS_STORAGE_KEY, isPathChecklist);
    if (stored) this.checklist.set(stored);
  }

  /**
   * Tells whether a step is done. Reactive inside `computed` and templates.
   *
   * @param path - Path slug.
   * @param step - Step id.
   * @returns True when the user marked the step as done.
   */
  isDone(path: string, step: string): boolean {
    return this.checklist()[path]?.includes(step) ?? false;
  }

  /**
   * Counts the done steps among the steps a path has today, ignoring removed ones.
   *
   * @param path - Path slug.
   * @param steps - Current step ids of the path.
   * @returns How many of them are done.
   */
  doneCount(path: string, steps: readonly string[]): number {
    return steps.filter((step) => this.isDone(path, step)).length;
  }

  /**
   * Marks a step as done, or as not done when it already is, and persists the checklist.
   *
   * @param path - Path slug.
   * @param step - Step id.
   */
  toggle(path: string, step: string): void {
    this.checklist.update((checklist) => {
      const done = checklist[path] ?? [];
      const next = done.includes(step) ? done.filter((id) => id !== step) : [...done, step];
      return { ...checklist, [path]: next };
    });
    this.storage.write(PATHS_STORAGE_KEY, this.checklist());
  }
}
