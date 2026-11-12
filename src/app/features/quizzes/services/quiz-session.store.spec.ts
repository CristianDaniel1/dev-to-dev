import { TestBed } from '@angular/core/testing';
import { ProgressStore } from '@/core/services/progress.store';
import type { SessionConfig } from '../interfaces/session.interface';
import { techScope } from '../lib/session-scope';
import { makeQuestion } from '../testing/question.factory';
import { makeTech, makeTopic } from '../testing/tech.factory';
import { QuizSessionStore } from './quiz-session.store';

const TECH = makeTech([makeTopic('fundamentos', { beginner: 2, intermediate: 0, advanced: 0 })]);
const MULTIPLE = makeQuestion({ id: 'q2', kind: 'multiple', correct: ['a', 'b'] });
const PRACTICE = techScope(TECH, 'practice');
const EXAM = techScope(TECH, 'exam');
const QUESTIONS = [makeQuestion({ id: 'q1' }), MULTIPLE];
const CONFIG: SessionConfig = {
  filters: { topics: [], level: null, onlyUnanswered: false, ids: [] },
  limit: null,
  seed: 1,
};

describe('QuizSessionStore', () => {
  let store: QuizSessionStore;
  let progress: ProgressStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [QuizSessionStore] });
    store = TestBed.inject(QuizSessionStore);
    progress = TestBed.inject(ProgressStore);
  });

  const answerCurrent = (correctly: boolean): void => {
    const question = store.current()?.question;
    if (!question) throw new Error('no current question');
    const ids = correctly ? question.correct : ['c'];
    ids.forEach((id) => store.toggle(id));
    store.submit('sure');
  };

  it('starts with every matching question', () => {
    store.start(PRACTICE, QUESTIONS, CONFIG);
    expect(store.status()).toBe('active');
    expect(store.total()).toBe(2);
  });

  it('reports an empty session when nothing matches', () => {
    store.start(PRACTICE, QUESTIONS, {
      ...CONFIG,
      filters: { ...CONFIG.filters, level: 'advanced' },
    });
    expect(store.status()).toBe('empty');
  });

  it('replaces the selection for single choice and toggles for multiple choice', () => {
    store.start(PRACTICE, [makeQuestion({ id: 'q1' })], CONFIG);
    store.toggle('a');
    store.toggle('b');
    expect(store.selection()).toEqual(['b']);

    store.start(PRACTICE, [MULTIPLE], CONFIG);
    store.toggle('a');
    store.toggle('b');
    store.toggle('a');
    expect(store.selection()).toEqual(['b']);
  });

  it('reveals the answer, records progress and locks the selection', () => {
    store.start(PRACTICE, QUESTIONS, CONFIG);
    answerCurrent(true);

    expect(store.isRevealed()).toBe(true);
    expect(store.currentAnswer()?.correct).toBe(true);
    expect(Object.keys(progress.questions())).toHaveLength(1);

    store.toggle('c');
    expect(store.selection()).not.toContain('c');
  });

  it('toggles options by position for keyboard shortcuts', () => {
    store.start(PRACTICE, [makeQuestion({ id: 'q1' })], CONFIG);
    store.toggleAt(0);
    expect(store.selection()).toHaveLength(1);
    store.toggleAt(9);
    expect(store.selection()).toHaveLength(1);
  });

  it('does not submit without a selection', () => {
    store.start(PRACTICE, QUESTIONS, CONFIG);
    store.submit('sure');
    expect(store.isRevealed()).toBe(false);
  });

  it('finishes after the last question and summarizes', () => {
    store.start(PRACTICE, QUESTIONS, CONFIG);
    answerCurrent(true);
    store.next();
    answerCurrent(false);
    store.next();

    expect(store.status()).toBe('finished');
    expect(store.summary()).toMatchObject({ total: 2, correct: 1, percentage: 50 });
    expect(progress.sessions()).toHaveLength(1);
  });

  it('records exam answers without revealing them and finishes after the last', () => {
    store.start(EXAM, QUESTIONS, CONFIG, 1000);
    expect(store.deadline()).toBe(1000);

    store.toggleAt(0);
    store.submitExam();
    expect(store.index()).toBe(1);
    expect(store.isRevealed()).toBe(false);

    store.toggleAt(0);
    store.submitExam();
    expect(store.status()).toBe('finished');
    expect(progress.sessions()[0]).toMatchObject({ tech: 'html', kind: 'exam', total: 2 });
  });

  it('ends an exam when time runs out, counting unanswered questions as wrong', () => {
    store.start(EXAM, QUESTIONS, CONFIG, 1000);
    store.toggleAt(0);
    store.submitExam();
    store.expire();

    expect(store.status()).toBe('finished');
    expect(store.summary()).toMatchObject({ total: 2, unanswered: 1 });
    store.toggleAt(0);
    expect(store.selection()).toEqual([]);
  });
});
