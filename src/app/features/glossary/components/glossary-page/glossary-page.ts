import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectIsHydrated } from '@/core/lib/hydration';
import { PageHeader } from '@/shared/components/page-header/page-header';
import { GLOSSARY } from '@/shared/generated/glossary';
import { GLOSSARY_GROUP_NAMES } from '../../data/glossary-group-names.data';
import { letterAnchor, letterSections } from '../../lib/letter-sections';
import { GroupFilter } from '../group-filter/group-filter';
import { LetterNav } from '../letter-nav/letter-nav';

/** Glossary index: every term from A to Z, filterable by tech. */
@Component({
  selector: 'app-glossary-page',
  imports: [RouterLink, PageHeader, GroupFilter, LetterNav],
  templateUrl: './glossary-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlossaryPage {
  /** `grupo` query param, bound by `withComponentInputBinding`. */
  readonly grupo = input<string>();

  private readonly isHydrated = injectIsHydrated();

  protected readonly groups = GLOSSARY.groups;
  protected readonly groupNames = GLOSSARY_GROUP_NAMES;
  protected readonly anchor = letterAnchor;

  /** The filter only applies after hydration, so the first render matches the prerendered list. */
  protected readonly activeGroup = computed(() =>
    this.isHydrated() ? this.groups.find((group) => group.slug === this.grupo()) : undefined,
  );
  protected readonly terms = computed(() => {
    const group = this.activeGroup();
    return group ? GLOSSARY.terms.filter((term) => term.group === group.slug) : GLOSSARY.terms;
  });
  protected readonly sections = computed(() => letterSections(this.terms()));
}
