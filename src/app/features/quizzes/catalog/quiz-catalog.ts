import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyState } from '@/shared/empty-state/empty-state';
import { PageHeader } from '@/shared/page-header/page-header';

/** Quiz catalog. Placeholder until the quiz engine lands (Phase 1). */
@Component({
  selector: 'app-quiz-catalog',
  imports: [EmptyState, PageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container-page">
      <app-page-header
        heading="Quizzes"
        intro="Pratique por tecnologia, tópico e nível, com explicação para cada alternativa."
      />
      <app-empty-state
        icon="quiz"
        heading="Os primeiros quizzes estão sendo escritos"
        description="HTML, CSS e JavaScript chegam primeiro, seguidos de TypeScript, React, Angular, Git e SQL. Enquanto isso, teste a pergunta de exemplo na página inicial."
      />
    </div>
  `,
})
export class QuizCatalog {}
