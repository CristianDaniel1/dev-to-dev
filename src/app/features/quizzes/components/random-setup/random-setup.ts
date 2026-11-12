import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeader } from '@/shared/components/page-header/page-header';
import { LEVELS } from '@/shared/constants/content.constants';
import { LEVEL_LABELS } from '@/shared/data/content-labels.data';
import { CATALOG } from '@/shared/generated/catalog';
import type { Level } from '@/shared/interfaces/content.interface';
import { DEFAULT_SESSION_SIZE } from '../../constants/session.constants';
import { SESSION_SIZES } from '../../data/session-choices.data';
import { countMixedAvailable } from '../../lib/mixed-available';
import { toRandomQuery } from '../../lib/random-params';

/** Random mode setup: pick techs, level and size, then start a mixed practice session. */
@Component({
  selector: 'app-random-setup',
  imports: [RouterLink, PageHeader],
  templateUrl: './random-setup.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomSetup {
  protected readonly allTechs = CATALOG.techs;
  protected readonly levels = LEVELS;
  protected readonly levelLabels = LEVEL_LABELS;
  protected readonly sizes = SESSION_SIZES;

  protected readonly techs = signal<readonly string[]>(CATALOG.techs.map((tech) => tech.slug));
  protected readonly level = signal<Level | null>(null);
  protected readonly size = signal<number | null>(DEFAULT_SESSION_SIZE);
  protected readonly onlyUnanswered = signal(false);

  private readonly chosen = computed(() =>
    this.allTechs.filter((tech) => this.techs().includes(tech.slug)),
  );
  protected readonly availableCount = computed(() =>
    countMixedAvailable(this.chosen(), this.level()),
  );
  protected readonly sessionCount = computed(() => {
    const size = this.size();
    return size === null ? this.availableCount() : Math.min(size, this.availableCount());
  });
  protected readonly queryParams = computed(() =>
    toRandomQuery({
      techs: this.techs(),
      allTechs: this.allTechs.map((tech) => tech.slug),
      level: this.level(),
      size: this.size(),
      onlyUnanswered: this.onlyUnanswered(),
    }),
  );

  protected isChosen(slug: string): boolean {
    return this.techs().includes(slug);
  }

  protected toggleTech(slug: string): void {
    this.techs.update((techs) =>
      techs.includes(slug) ? techs.filter((tech) => tech !== slug) : [...techs, slug],
    );
  }
}
