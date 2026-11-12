import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  afterRenderEffect,
  input,
  model,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '@/shared/components/icon/icon';
import { UI_TEXT } from '../../data/ui-text.data';
import type { NavLink } from '../../interfaces/nav-link.interface';

/** Full-screen navigation menu for small screens, built on a native `<dialog>`. */
@Component({
  selector: 'app-mobile-menu',
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './mobile-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenu {
  readonly open = model(false);
  readonly links = input.required<readonly NavLink[]>();

  protected readonly text = UI_TEXT;
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    afterRenderEffect({ write: () => this.syncDialog() });
  }

  private syncDialog(): void {
    const dialog = this.dialog().nativeElement;
    if (this.open() && !dialog.open) dialog.showModal();
    if (!this.open() && dialog.open) dialog.close();
  }
}
