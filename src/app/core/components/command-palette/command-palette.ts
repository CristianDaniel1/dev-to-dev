import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  type ElementRef,
  afterRenderEffect,
  computed,
  inject,
  linkedSignal,
  resource,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Icon } from '@/shared/components/icon/icon';
import type { SearchEntry } from '@/shared/interfaces/search.interface';
import { MAX_SEARCH_RESULTS } from '../../constants/search.constants';
import { SEARCH_KIND_LABELS } from '../../data/search-labels.data';
import { SEARCH_PAGES } from '../../data/search-pages.data';
import { nextListIndex } from '../../lib/list-navigation';
import { isPaletteShortcut } from '../../lib/palette-shortcut';
import { reportError } from '../../lib/report-error';
import { searchEntries } from '../../lib/search';
import { CommandPaletteStore } from '../../services/command-palette.store';

/**
 * Global search (Ctrl+K): pages, quizzes, topics, questions and resources. A native modal
 * `<dialog>` with the combobox pattern; the search index loads on the first opening.
 */
@Component({
  selector: 'app-command-palette',
  imports: [Icon],
  templateUrl: './command-palette.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown)': 'onShortcut($event)' },
})
export class CommandPalette {
  protected readonly store = inject(CommandPaletteStore);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly input = viewChild.required<ElementRef<HTMLInputElement>>('input');
  private readonly results = viewChild<ElementRef<HTMLElement>>('results');

  protected readonly kindLabels = SEARCH_KIND_LABELS;
  protected readonly query = signal('');
  private readonly hasOpened = linkedSignal<boolean, boolean>({
    source: () => this.store.isOpen(),
    computation: (isOpen, previous) => isOpen || (previous?.value ?? false),
  });
  private readonly index = resource({
    params: () => (this.hasOpened() ? true : undefined),
    loader: () => import('@/shared/generated/search-index').then((module) => module.SEARCH_INDEX),
  });
  private readonly entries = computed(() => [...SEARCH_PAGES, ...(this.index.value() ?? [])]);
  protected readonly matches = computed(() =>
    this.query().trim()
      ? searchEntries(this.entries(), this.query(), MAX_SEARCH_RESULTS)
      : SEARCH_PAGES,
  );
  protected readonly activeIndex = linkedSignal(() => (this.matches(), 0));
  protected readonly activeId = computed(() =>
    this.matches().length ? `palette-option-${this.activeIndex()}` : null,
  );
  protected readonly announcement = computed(() => {
    if (!this.query().trim()) return '';
    const count = this.matches().length;
    if (!count) return 'Nenhum resultado.';
    return count === 1 ? '1 resultado.' : `${count} resultados.`;
  });

  constructor() {
    afterRenderEffect({ write: () => this.syncDialog() });
    afterRenderEffect(() => {
      const index = this.activeIndex();
      this.results()
        ?.nativeElement.querySelector(`#palette-option-${index}`)
        ?.scrollIntoView({ block: 'nearest' });
    });
  }

  protected onShortcut(event: KeyboardEvent): void {
    if (!isPaletteShortcut(event)) return;
    event.preventDefault();
    this.store.toggle();
  }

  /** Arrow keys, Home, End and Enter from the search box (they bubble up to the dialog). */
  protected onListKeydown(event: KeyboardEvent): void {
    if (event.target !== this.input().nativeElement) return;
    const next = nextListIndex(event.key, this.activeIndex(), this.matches().length);
    if (next !== null) {
      event.preventDefault();
      this.activeIndex.set(next);
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      const entry = this.matches()[this.activeIndex()];
      if (entry) this.activate(entry);
    }
  }

  protected onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) this.store.close();
  }

  /**
   * Opens a result: navigates inside the app or opens an external resource in a new tab.
   *
   * @param entry - Chosen result.
   */
  protected activate(entry: SearchEntry): void {
    this.store.close();
    if (entry.external) {
      this.document.defaultView?.open(entry.link, '_blank', 'noopener');
      return;
    }
    this.router
      .navigate([entry.link], { queryParams: entry.queryParams })
      .catch((error: unknown) => reportError('palette: navigation failed', error));
  }

  private syncDialog(): void {
    const dialog = this.dialog().nativeElement;
    if (this.store.isOpen() && !dialog.open) {
      this.query.set('');
      this.input().nativeElement.value = '';
      dialog.showModal();
      this.input().nativeElement.focus();
    }
    if (!this.store.isOpen() && dialog.open) dialog.close();
  }
}
