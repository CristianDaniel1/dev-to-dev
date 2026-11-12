import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageHeader } from '@/shared/components/page-header/page-header';
import { QuizContent } from '@/shared/services/quiz-content';
import { groupByArea } from '../../lib/catalog-areas';
import { TechCard } from '../tech-card/tech-card';

/** Quiz catalog page, grouped by area. */
@Component({
  selector: 'app-quiz-catalog',
  imports: [PageHeader, TechCard],
  templateUrl: './quiz-catalog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizCatalog {
  protected readonly areas = groupByArea(inject(QuizContent).catalog.techs);
}
