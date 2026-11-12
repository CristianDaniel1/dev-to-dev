import type { SessionRecord } from '@/core/interfaces/progress.interface';
import type { TechSummary } from '@/shared/interfaces/content.interface';
import type { HistoryEntry } from '../interfaces/progress-overview.interface';

const titleOf = (session: SessionRecord, techs: readonly TechSummary[]): string => {
  const name = techs.find((tech) => tech.slug === session.tech)?.name ?? session.tech;
  switch (session.kind) {
    case 'review':
      return 'Revisão';
    case 'random':
      return 'Aleatório';
    case 'exam':
      return `Simulado de ${name}`;
    default:
      return name;
  }
};

/**
 * Turns the most recent sessions into history rows.
 *
 * @param sessions - Saved sessions, newest first.
 * @param techs - Published techs, for their names.
 * @param limit - Maximum number of rows.
 * @returns The rows, newest first.
 */
export const historyEntries = (
  sessions: readonly SessionRecord[],
  techs: readonly TechSummary[],
  limit: number,
): HistoryEntry[] =>
  sessions.slice(0, limit).map((session) => ({
    title: titleOf(session, techs),
    correct: session.correct,
    total: session.total,
    finishedAt: session.finishedAt,
  }));
