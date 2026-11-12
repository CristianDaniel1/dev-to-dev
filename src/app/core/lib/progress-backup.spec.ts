import { parseProgressBackup } from './progress-backup';

const ENTRY = {
  tech: 'html',
  topic: 'fundamentos',
  attempts: 2,
  correctCount: 1,
  lastCorrect: true,
  lastConfidence: 'sure',
  box: 2,
  lastAnsweredAt: 1,
  nextReviewAt: 2,
};
const SESSION = { tech: 'html', kind: 'practice', total: 5, correct: 3, finishedAt: 1 };

describe('parseProgressBackup', () => {
  it('accepts a valid backup', () => {
    const backup = { version: 1, questions: { q1: ENTRY }, sessions: [SESSION] };
    expect(parseProgressBackup(JSON.stringify(backup))).toEqual(backup);
  });

  it('rejects invalid JSON, other versions and malformed entries', () => {
    expect(parseProgressBackup('not json')).toBeNull();
    expect(
      parseProgressBackup(JSON.stringify({ version: 2, questions: {}, sessions: [] })),
    ).toBeNull();
    expect(
      parseProgressBackup(
        JSON.stringify({ version: 1, questions: { q1: { ...ENTRY, box: 'x' } }, sessions: [] }),
      ),
    ).toBeNull();
    expect(
      parseProgressBackup(JSON.stringify({ version: 1, questions: {}, sessions: [{ total: 1 }] })),
    ).toBeNull();
  });
});
