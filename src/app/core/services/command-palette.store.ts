import { Injectable, signal } from '@angular/core';

/** Open state of the command palette, shared by the header button and the shortcut. */
@Injectable({ providedIn: 'root' })
export class CommandPaletteStore {
  private readonly openState = signal(false);

  readonly isOpen = this.openState.asReadonly();

  open(): void {
    this.openState.set(true);
  }

  close(): void {
    this.openState.set(false);
  }

  toggle(): void {
    this.openState.update((isOpen) => !isOpen);
  }
}
