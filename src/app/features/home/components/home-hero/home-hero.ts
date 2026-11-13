import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CATALOG } from '@/shared/generated/catalog';
import { DEMO_QUESTION } from '../../data/demo-question.data';
import { PRACTICE_STEPS } from '../../data/home-content.data';
import { sheetFields } from '../../lib/sheet-fields';
import { DemoQuestionCard } from '../demo-question/demo-question';
import { ExamTabs } from '../exam-tabs/exam-tabs';

/**
 * Home opening: headline, then a pile of exams with one tab per tech. The sheet on top is a
 * filled-in answer sheet with the sample question, the practice steps and the calls to action.
 */
@Component({
  selector: 'app-home-hero',
  imports: [RouterLink, DemoQuestionCard, ExamTabs],
  templateUrl: './home-hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHero {
  protected readonly question = DEMO_QUESTION;
  protected readonly fields = sheetFields(DEMO_QUESTION, CATALOG.techs);
  protected readonly steps = PRACTICE_STEPS;
}
