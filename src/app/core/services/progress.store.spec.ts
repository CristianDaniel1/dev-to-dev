import { TestBed } from '@angular/core/testing';
import { PROGRESS_STORAGE_KEY, STORAGE_PREFIX } from '../constants/storage.constants';
import { ProgressStore } from './progress.store';

const STORAGE_KEY = STORAGE_PREFIX + PROGRESS_STORAGE_KEY;
const QUESTION = { id: 'html-fundamentos-001', tech: 'html', topic: 'fundamentos' };

describe('ProgressStore', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => vi.restoreAllMocks());

  it('records answers, moves Leitner boxes and persists', () => {
    const store = TestBed.inject(ProgressStore);

    store.recordAnswer(QUESTION, true, 'sure', 1000);
    store.recordAnswer(QUESTION, true, 'sure', 2000);

    const progress = store.questions()[QUESTION.id];
    expect(progress).toMatchObject({ attempts: 2, correctCount: 2, box: 2, lastAnsweredAt: 2000 });
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}').questions[QUESTION.id].box).toBe(
      2,
    );
  });

  it('counts answered and mastered questions per tech and topic', () => {
    const store = TestBed.inject(ProgressStore);
    store.recordAnswer(QUESTION, true, 'sure');
    store.recordAnswer({ ...QUESTION, id: 'html-fundamentos-002' }, true, 'guess');
    store.recordAnswer(
      { id: 'html-semantica-001', tech: 'html', topic: 'semantica' },
      false,
      'sure',
    );
    store.recordAnswer({ id: 'css-layout-001', tech: 'css', topic: 'layout' }, true, 'sure');

    expect(store.statsFor('html')).toEqual({ answered: 3, mastered: 1 });
    expect(store.statsFor('html', 'fundamentos')).toEqual({ answered: 2, mastered: 1 });
    expect(store.statsFor('react')).toEqual({ answered: 0, mastered: 0 });
  });

  it('restores saved progress and ignores invalid data', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 99 }));
    expect(TestBed.inject(ProgressStore).questions()).toEqual({});
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('keeps the session history newest first', () => {
    const store = TestBed.inject(ProgressStore);
    store.recordSession({ tech: 'html', total: 10, correct: 7, finishedAt: 1 });
    store.recordSession({ tech: 'css', total: 5, correct: 5, finishedAt: 2 });

    expect(store.sessions().map((session) => session.tech)).toEqual(['css', 'html']);
  });

  it('replaces, exports and clears the whole progress', () => {
    const store = TestBed.inject(ProgressStore);
    store.recordAnswer(QUESTION, true, 'sure', 1000);
    const exported = store.exportJson();

    store.clear();
    expect(store.questions()).toEqual({});
    expect(localStorage.getItem(STORAGE_KEY)).toContain('"questions":{}');

    store.replace(JSON.parse(exported));
    expect(Object.keys(store.questions())).toEqual([QUESTION.id]);
  });
});
