import { LEVEL_PARAMS } from '@/shared/data/content-labels.data';
import { levelFromParam } from '@/shared/lib/level-param';
import {
  ALL_QUESTIONS_PARAM,
  DEFAULT_SESSION_SIZE,
  MAX_SESSION_SIZE,
} from '../constants/session.constants';
import type {
  SessionConfig,
  SessionQueryInput,
  SessionQueryParams,
  SessionSetup,
} from '../interfaces/session.interface';

const parseList = (value: string | undefined): string[] =>
  value
    ?.split(',')
    .map((item) => item.trim())
    .filter(Boolean) ?? [];

const parseLimit = (value: string | undefined, defaultSize: number): number | null => {
  if (value === ALL_QUESTIONS_PARAM) return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? Math.min(parsed, MAX_SESSION_SIZE) : defaultSize;
};

/**
 * Turns the practice route query params into a session config (without the seed).
 *
 * @param query - Raw query params from the URL.
 * @param defaultSize - Session size when the URL does not set one.
 * @returns Filters and limit of the session.
 */
export const toSessionConfig = (
  query: SessionQueryInput,
  defaultSize = DEFAULT_SESSION_SIZE,
): Omit<SessionConfig, 'seed'> => ({
  filters: {
    topics: parseList(query.topico),
    level: levelFromParam(query.nivel),
    onlyUnanswered: query.novas === '1',
    ids: parseList(query.ids),
  },
  limit: parseLimit(query.qtd, defaultSize),
});

/**
 * Turns the setup form choices into practice route query params.
 *
 * @param setup - Choices made in the form.
 * @returns Query params; `null` values are left out of the URL.
 */
export const toSessionQuery = (setup: SessionSetup): SessionQueryParams => ({
  topico: setup.topics.join(',') || null,
  nivel: setup.level ? LEVEL_PARAMS[setup.level] : null,
  qtd: setup.size ?? ALL_QUESTIONS_PARAM,
  novas: setup.onlyUnanswered ? '1' : null,
  tempo: setup.minutes,
});
