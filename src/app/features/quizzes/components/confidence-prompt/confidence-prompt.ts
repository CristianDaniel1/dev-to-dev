import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import type { Confidence } from '@/core/interfaces/progress.interface';
import { CONFIDENCE_CHOICES } from '../../data/session-choices.data';

/** Asks how sure the user is; each choice submits the answer with that confidence. */
@Component({
  selector: 'app-confidence-prompt',
  templateUrl: './confidence-prompt.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ConfidencePrompt {
  readonly canSubmit = input.required<boolean>();
  readonly submitted = output<Confidence>();

  protected readonly choices = CONFIDENCE_CHOICES;
}
