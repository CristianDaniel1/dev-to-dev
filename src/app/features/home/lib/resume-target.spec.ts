import type { TechSummary } from '@/shared/interfaces/content.interface';
import { resumeTarget } from './resume-target';

const TECHS = [{ slug: 'css', name: 'CSS' }] as TechSummary[];
const BASE = { total: 10, correct: 7, finishedAt: 1 };

describe('resumeTarget', () => {
  it('leads to the tech page after a practice or an exam', () => {
    expect(resumeTarget({ ...BASE, tech: 'css' }, TECHS)).toEqual({
      title: 'CSS',
      link: '/quizzes/css',
      correct: 7,
      total: 10,
    });
    expect(resumeTarget({ ...BASE, tech: 'css', kind: 'exam' }, TECHS)?.title).toBe(
      'Simulado de CSS',
    );
  });

  it('leads to the review or random mode after mixed sessions', () => {
    expect(resumeTarget({ ...BASE, tech: '', kind: 'review' }, TECHS)?.link).toBe('/revisao');
    expect(resumeTarget({ ...BASE, tech: '', kind: 'random' }, TECHS)?.link).toBe('/aleatorio');
  });

  it('returns null without a session or for an unknown tech', () => {
    expect(resumeTarget(undefined, TECHS)).toBeNull();
    expect(resumeTarget({ ...BASE, tech: 'cobol' }, TECHS)).toBeNull();
  });
});
