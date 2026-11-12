import type {
  ProgressState,
  QuestionProgress,
  SessionRecord,
} from '../interfaces/progress.interface';

const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const isQuestionProgress = (value: unknown): value is QuestionProgress => {
  if (typeof value !== 'object' || !value) return false;
  const entry = value as Record<string, unknown>;
  return (
    typeof entry['tech'] === 'string' &&
    typeof entry['topic'] === 'string' &&
    isNumber(entry['attempts']) &&
    isNumber(entry['correctCount']) &&
    typeof entry['lastCorrect'] === 'boolean' &&
    ['sure', 'unsure', 'guess'].includes(entry['lastConfidence'] as string) &&
    isNumber(entry['box']) &&
    isNumber(entry['lastAnsweredAt']) &&
    isNumber(entry['nextReviewAt'])
  );
};

const isSessionRecord = (value: unknown): value is SessionRecord => {
  if (typeof value !== 'object' || !value) return false;
  const session = value as Record<string, unknown>;
  return (
    typeof session['tech'] === 'string' &&
    isNumber(session['total']) &&
    isNumber(session['correct']) &&
    isNumber(session['finishedAt'])
  );
};

/**
 * Parses a progress backup file, checking every entry, since it comes from outside the app.
 *
 * @param text - Contents of the JSON file.
 * @returns The progress state, or `null` when the file is not a valid backup.
 */
export const parseProgressBackup = (text: string): ProgressState | null => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return null;
  }
  if (typeof parsed !== 'object' || !parsed) return null;
  const candidate = parsed as Record<string, unknown>;
  const questions = candidate['questions'];
  const sessions = candidate['sessions'];
  if (candidate['version'] !== 1 || typeof questions !== 'object' || !questions) return null;
  if (!Array.isArray(sessions) || !sessions.every(isSessionRecord)) return null;
  if (!Object.values(questions).every(isQuestionProgress)) return null;
  return {
    version: 1,
    questions: questions as Record<string, QuestionProgress>,
    sessions,
  };
};
