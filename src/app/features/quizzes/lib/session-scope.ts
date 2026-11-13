import type { SessionKind } from '@/core/interfaces/progress.interface';
import type { Question, TechSummary } from '@/shared/interfaces/content.interface';
import type { SessionScope } from '../interfaces/session-scope.interface';

/** Accent of sessions that mix techs (graphite, the color of the pencil marks). */
const MIXED_COLOR = 'var(--color-ink)';

const byTopic = (question: Question): string => question.topic;
const byTech = (question: Question): string => question.tech;

/**
 * Builds the scope of a practice or exam session of one tech, with results by topic.
 *
 * @param tech - The tech.
 * @param kind - 'practice' or 'exam'.
 * @returns The session scope.
 */
export const techScope = (tech: TechSummary, kind: 'practice' | 'exam'): SessionScope => ({
  kind,
  title: kind === 'exam' ? `Simulado de ${tech.name}` : tech.name,
  color: tech.color,
  tech,
  techs: [tech.slug],
  groups: tech.topics.map((topic) => ({ key: topic.slug, name: topic.name, color: tech.color })),
  groupOf: byTopic,
  exitLink: `/quizzes/${tech.slug}`,
  setupLink: `/quizzes/${tech.slug}`,
  retryRoute: ['/quizzes', tech.slug, 'praticar'],
  retryParams: {},
  restartLabel: 'Nova sessão com os mesmos filtros',
  setupLabel: 'Mudar filtros',
  emptyHeading: 'Nenhuma pergunta com esses filtros',
  emptyDescription:
    'Você já respondeu todas, ou a combinação de tópico e nível não tem perguntas. Ajuste os filtros e comece de novo.',
});

/**
 * Builds the scope of a session that mixes techs (review or random), with results by tech.
 *
 * @param techs - Techs in the session, in catalog order.
 * @param kind - 'review' or 'random'.
 * @returns The session scope.
 */
export const mixedScope = (
  techs: readonly TechSummary[],
  kind: Extract<SessionKind, 'review' | 'random'>,
): SessionScope => {
  const setupLink = kind === 'review' ? '/revisao' : '/aleatorio';
  const isReview = kind === 'review';
  return {
    kind,
    title: kind === 'review' ? 'Revisão' : 'Aleatório',
    color: MIXED_COLOR,
    tech: null,
    techs: techs.map((tech) => tech.slug),
    groups: techs.map((tech) => ({ key: tech.slug, name: tech.name, color: tech.color })),
    groupOf: byTech,
    exitLink: setupLink,
    setupLink,
    retryRoute: ['/aleatorio', 'praticar'],
    retryParams: { techs: techs.map((tech) => tech.slug).join(',') },
    restartLabel: isReview ? null : 'Nova rodada com as mesmas escolhas',
    setupLabel: isReview ? 'Voltar para a revisão' : 'Mudar tecnologias',
    emptyHeading: isReview ? 'Nada para revisar agora' : 'Nenhuma pergunta com essas escolhas',
    emptyDescription: isReview
      ? 'As perguntas que você errar ou acertar no chute voltam para cá no dia certo.'
      : 'Escolha mais tecnologias ou outro nível e comece de novo.',
  };
};
