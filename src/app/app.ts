import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommandPalette } from '@/core/components/command-palette/command-palette';
import { Footer } from '@/core/components/footer/footer';
import { Header } from '@/core/components/header/header';
import { UI_TEXT } from '@/core/data/ui-text.data';

/** Application shell: skip link, header, routed content, footer and the command palette. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommandPalette, Header, Footer],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex min-h-dvh flex-col' },
})
export class App {
  protected readonly text = UI_TEXT;
}
