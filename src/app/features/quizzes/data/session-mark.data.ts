import type { SessionMark } from '../interfaces/session.interface';

/** Bubble classes of each mark in the session map. */
export const SESSION_MARK_CLASSES: Record<SessionMark, string> = {
  pending: '',
  current: 'border-ink border-2 text-ink',
  answered: 'bubble-filled',
  correct: 'bubble-correct',
  wrong: 'bubble-wrong',
};
