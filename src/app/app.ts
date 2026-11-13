import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommandPalette } from '@/core/components/command-palette/command-palette';
import { Footer } from '@/core/components/footer/footer';
import { Header } from '@/core/components/header/header';
import { UI_TEXT } from '@/core/data/ui-text.data';
import { isPaletteShortcut } from '@/core/lib/palette-shortcut';
import { CommandPaletteStore } from '@/core/services/command-palette.store';

/**
 * Application shell: skip link, header, routed content, footer and the command palette. The
 * palette loads when the browser is idle, or as soon as it is opened.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommandPalette, Header, Footer],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex min-h-dvh flex-col', '(document:keydown)': 'onShortcut($event)' },
})
export class App {
  protected readonly text = UI_TEXT;
  protected readonly palette = inject(CommandPaletteStore);

  protected onShortcut(event: KeyboardEvent): void {
    if (!isPaletteShortcut(event)) return;
    event.preventDefault();
    this.palette.toggle();
  }
}
