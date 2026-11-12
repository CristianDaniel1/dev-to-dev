import { ChangeDetectionStrategy, Component, DOCUMENT, inject, signal } from '@angular/core';
import type { ProgressState } from '@/core/interfaces/progress.interface';
import { parseProgressBackup } from '@/core/lib/progress-backup';
import { ProgressStore } from '@/core/services/progress.store';
import type { PendingImport } from '../../interfaces/progress-overview.interface';
import { backupFileName } from '../../lib/backup-file-name';

/**
 * Backup of the progress: download it as JSON, restore it from a file or erase it. Replacing
 * and erasing ask for confirmation first.
 */
@Component({
  selector: 'app-progress-backup',
  templateUrl: './progress-backup.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBackup {
  private readonly progress = inject(ProgressStore);
  private readonly document = inject(DOCUMENT);

  private readonly pendingState = signal<ProgressState | null>(null);
  protected readonly pending = signal<PendingImport | null>(null);
  protected readonly isConfirmingClear = signal(false);
  protected readonly message = signal('');
  protected readonly isError = signal(false);

  protected download(): void {
    const blob = new Blob([this.progress.exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = this.document.createElement('a');
    link.href = url;
    link.download = backupFileName(Date.now());
    link.click();
    URL.revokeObjectURL(url);
    this.notify('Backup baixado.');
  }

  protected async readFile(input: HTMLInputElement): Promise<void> {
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    const state = parseProgressBackup(await file.text());
    if (!state) {
      this.notify('Esse arquivo não é um backup válido do Dev to Dev.', true);
      return;
    }
    this.pendingState.set(state);
    this.pending.set({
      questionCount: Object.keys(state.questions).length,
      sessionCount: state.sessions.length,
    });
    this.message.set('');
  }

  protected confirmImport(): void {
    const state = this.pendingState();
    if (!state) return;
    this.progress.replace(state);
    this.cancelImport();
    this.notify('Progresso importado.');
  }

  protected cancelImport(): void {
    this.pendingState.set(null);
    this.pending.set(null);
  }

  protected confirmClear(): void {
    this.progress.clear();
    this.isConfirmingClear.set(false);
    this.notify('Progresso apagado.');
  }

  private notify(text: string, isError = false): void {
    this.message.set(text);
    this.isError.set(isError);
  }
}
