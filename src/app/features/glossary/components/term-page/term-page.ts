import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Breadcrumb } from '@/shared/components/breadcrumb/breadcrumb';
import { EmptyState } from '@/shared/components/empty-state/empty-state';
import { Icon } from '@/shared/components/icon/icon';
import { GLOSSARY } from '@/shared/generated/glossary';
import { GLOSSARY_BREADCRUMB } from '../../data/glossary-breadcrumb.data';
import { GLOSSARY_GROUP_NAMES } from '../../data/glossary-group-names.data';
import { findTerm } from '../../lib/find-term';
import { termNeighbors } from '../../lib/term-neighbors';

/** Page of one glossary term: definition, example, where to practice and what to read. */
@Component({
  selector: 'app-term-page',
  imports: [RouterLink, Breadcrumb, EmptyState, Icon],
  templateUrl: './term-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermPage {
  /** Route param, bound by `withComponentInputBinding`. */
  readonly termo = input.required<string>();

  protected readonly trail = GLOSSARY_BREADCRUMB;
  protected readonly groupNames = GLOSSARY_GROUP_NAMES;

  protected readonly entry = computed(() => findTerm(this.termo()));
  protected readonly neighbors = computed(() => termNeighbors(GLOSSARY.terms, this.termo()));
}
