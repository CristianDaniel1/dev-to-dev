import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageHeader } from '@/shared/components/page-header/page-header';
import { QuizContent } from '@/shared/services/quiz-content';
import { groupByArea } from '../../lib/catalog-areas';
import { PracticeModes } from '../practice-modes/practice-modes';
import { TechRow } from '../tech-row/tech-row';

/** Quiz catalog page: one row per tech, grouped by area. */
@Component({
  selector: 'app-quiz-catalog',
  imports: [PageHeader, PracticeModes, TechRow],
  templateUrl: './quiz-catalog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizCatalog {
  protected readonly areas = groupByArea(inject(QuizContent).catalog.techs);
}
