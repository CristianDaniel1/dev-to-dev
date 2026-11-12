import type { SessionRecord } from '@/core/interfaces/progress.interface';
import type { TechSummary } from '@/shared/interfaces/content.interface';
import type { ResumeTarget } from '../interfaces/resume-target.interface';

/**
 * Picks where to continue from the last session: its tech page, the review or the random mode.
 *
 * @param session - Most recent session, if any.
 * @param techs - Published techs.
 * @returns The target, or `null` when there is no session or its tech no longer exists.
 */
export const resumeTarget = (
  session: SessionRecord | undefined,
  techs: readonly TechSummary[],
): ResumeTarget | null => {
  if (!session) return null;
  const score = { correct: session.correct, total: session.total };
  if (session.kind === 'review') return { title: 'Revisão', link: '/revisao', ...score };
  if (session.kind === 'random') return { title: 'Aleatório', link: '/aleatorio', ...score };
  const tech = techs.find((candidate) => candidate.slug === session.tech);
  if (!tech) return null;
  const title = session.kind === 'exam' ? `Simulado de ${tech.name}` : tech.name;
  return { title, link: `/quizzes/${tech.slug}`, ...score };
};
