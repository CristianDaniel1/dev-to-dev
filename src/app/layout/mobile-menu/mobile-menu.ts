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
import { TEXT } from '@/core/i18n/pt-br';
import { Icon } from '@/shared/icon/icon';
import type { NavLink } from '@/layout/nav-links';

/** Full-screen navigation menu for small screens, built on a native `<dialog>`. */
@Component({
  selector: 'app-mobile-menu',
  imports: [RouterLink, RouterLinkActive, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog
      #dialog
      id="mobile-menu"
      [attr.aria-label]="text.nav.label"
      class="m-0 h-dvh max-h-none w-full max-w-none bg-paper p-0 text-ink"
      (close)="open.set(false)"
    >
      <div class="container-page flex h-(--header-h) items-center justify-end">
        <button
          type="button"
          class="btn-icon"
          [attr.aria-label]="text.menu.close"
          (click)="open.set(false)"
        >
          <app-icon name="close" />
        </button>
      </div>
      <nav class="container-page pt-4">
        <ul class="flex flex-col">
          @for (link of links(); track link.path) {
            <li class="border-b border-line">
              <a
                [routerLink]="link.path"
                routerLinkActive="highlight"
                ariaCurrentWhenActive="page"
                class="inline-block py-5 text-3xl font-bold [font-stretch:82%]"
                (click)="open.set(false)"
              >
                {{ link.label }}
              </a>
            </li>
          }
        </ul>
      </nav>
    </dialog>
  `,
})
export class MobileMenu {
  readonly open = model(false);
  readonly links = input.required<readonly NavLink[]>();

  protected readonly text = TEXT;
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    afterRenderEffect({
      write: () => {
        const dialog = this.dialog().nativeElement;
        if (this.open() && !dialog.open) dialog.showModal();
        if (!this.open() && dialog.open) dialog.close();
      },
    });
  }
}
