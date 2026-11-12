import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyState } from '@/shared/empty-state/empty-state';
import { PageHeader } from '@/shared/page-header/page-header';

/** Resource hub. Placeholder until Phase 2. */
@Component({
  selector: 'app-resource-catalog',
  imports: [EmptyState, PageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container-page">
      <app-page-header
        heading="Recursos"
        intro="Documentações, ferramentas, cursos e referências escolhidos para o dia a dia de quem desenvolve."
      />
      <app-empty-state
        icon="bookmark"
        heading="A curadoria está em andamento"
        description="Cada recurso entra com descrição, categoria, preço e o motivo de estar aqui. A primeira leva cobre documentações, ferramentas, design, deploy e IA."
      />
    </div>
  `,
})
export class ResourceCatalog {}
