import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  afterNextRender,
  computed,
  input,
  output,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import type { SessionSummary } from '../../interfaces/scoring.interface';
import type { SessionScope } from '../../interfaces/session-scope.interface';
import type { ReviewItem } from '../../interfaces/session.interface';
import { toGrade } from '../../lib/grade';
import { resultHeadingFor } from '../../lib/result-heading';
import { ResultsReview } from '../results-review/results-review';

/** End-of-session report card: grade, score, results by group, next steps and the review. */
@Component({
  selector: 'app-session-results',
  imports: [RouterLink, ResultsReview],
  templateUrl: './session-results.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionResults {
  readonly scope = input.required<SessionScope>();
  readonly summary = input.required<SessionSummary>();
  readonly reviewItems = input.required<readonly ReviewItem[]>();
  readonly restart = output();

  protected readonly heading = computed(() => resultHeadingFor(this.summary().percentage));
  protected readonly grade = computed(() => toGrade(this.summary().correct, this.summary().total));
  protected readonly retryParams = computed(() => ({
    ...this.scope().retryParams,
    ids: this.summary().missedIds.join(','),
  }));

  private readonly headingElement = viewChild.required<ElementRef<HTMLElement>>('headingElement');

  constructor() {
    afterNextRender(() => this.headingElement().nativeElement.focus());
  }
}
