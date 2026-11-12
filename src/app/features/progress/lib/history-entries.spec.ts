import type { TechSummary } from '@/shared/interfaces/content.interface';
import { historyEntries } from './history-entries';

const TECHS = [{ slug: 'css', name: 'CSS' }] as TechSummary[];

describe('historyEntries', () => {
  it('titles each session by kind and tech, up to the limit', () => {
    const rows = historyEntries(
      [
        { tech: 'css', kind: 'exam', total: 20, correct: 15, finishedAt: 3 },
        { tech: '', kind: 'review', total: 5, correct: 5, finishedAt: 2 },
        { tech: 'css', total: 10, correct: 7, finishedAt: 1 },
      ],
      TECHS,
      2,
    );
    expect(rows.map((row) => row.title)).toEqual(['Simulado de CSS', 'Revisão']);
  });

  it('reads sessions without a kind as practice', () => {
    expect(
      historyEntries([{ tech: 'css', total: 1, correct: 1, finishedAt: 1 }], TECHS, 5)[0]?.title,
    ).toBe('CSS');
  });
});
