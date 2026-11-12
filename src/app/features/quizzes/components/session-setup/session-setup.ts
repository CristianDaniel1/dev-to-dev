import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LEVELS } from '@/shared/constants/content.constants';
import { LEVEL_LABELS } from '@/shared/data/content-labels.data';
import type { Level, TechSummary } from '@/shared/interfaces/content.interface';
import {
  DEFAULT_EXAM_SIZE,
  DEFAULT_SESSION_SIZE,
  EXAM_DURATIONS,
} from '../../constants/session.constants';
import { MODE_CHOICES, SESSION_SIZES } from '../../data/session-choices.data';
import type { ModeChoice } from '../../interfaces/choice.interface';
import { countAvailable } from '../../lib/available-count';
import { toSessionQuery } from '../../lib/session-params';

/** Form that sets up a practice or exam session and links to it with the chosen filters. */
@Component({
  selector: 'app-session-setup',
  imports: [RouterLink],
  templateUrl: './session-setup.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionSetup {
  readonly tech = input.required<TechSummary>();

  protected readonly levels = LEVELS;
  protected readonly levelLabels = LEVEL_LABELS;
  protected readonly sizes = SESSION_SIZES;
  protected readonly modes = MODE_CHOICES;
  protected readonly durations = EXAM_DURATIONS;

  protected readonly topics = signal<readonly string[]>([]);
  protected readonly level = signal<Level | null>(null);
  protected readonly size = signal<number | null>(DEFAULT_SESSION_SIZE);
  protected readonly onlyUnanswered = signal(false);
  protected readonly mode = signal<ModeChoice>(MODE_CHOICES[0] as ModeChoice);
  protected readonly minutes = signal<number | null>(null);
  protected readonly isExam = computed(() => this.mode().value === 'exam');
  protected readonly route = computed(() => [
    '/quizzes',
    this.tech().slug,
    this.isExam() ? 'simulado' : 'praticar',
  ]);

  protected readonly availableCount = computed(() =>
    countAvailable(this.tech(), this.topics(), this.level()),
  );
  protected readonly sessionCount = computed(() => {
    const size = this.size();
    return size === null ? this.availableCount() : Math.min(size, this.availableCount());
  });
  protected readonly queryParams = computed(() =>
    toSessionQuery({
      topics: this.topics(),
      level: this.level(),
      size: this.size(),
      onlyUnanswered: this.onlyUnanswered(),
      minutes: this.isExam() ? this.minutes() : null,
    }),
  );

  protected chooseMode(mode: ModeChoice): void {
    this.mode.set(mode);
    this.size.set(mode.value === 'exam' ? DEFAULT_EXAM_SIZE : DEFAULT_SESSION_SIZE);
  }

  protected isTopicSelected(slug: string): boolean {
    return this.topics().includes(slug);
  }

  protected toggleTopic(slug: string): void {
    this.topics.update((topics) =>
      topics.includes(slug) ? topics.filter((topic) => topic !== slug) : [...topics, slug],
    );
  }
}
