import type { SessionQueryInput } from '../interfaces/session.interface';
import { toSessionConfig, toSessionQuery } from './session-params';

const EMPTY_QUERY: SessionQueryInput = {
  topico: undefined,
  nivel: undefined,
  qtd: undefined,
  novas: undefined,
  ids: undefined,
};

describe('toSessionConfig', () => {
  it('uses defaults when the URL has no params', () => {
    expect(toSessionConfig(EMPTY_QUERY)).toEqual({
      filters: { topics: [], level: null, onlyUnanswered: false, ids: [] },
      limit: 10,
    });
  });

  it('parses every param', () => {
    const config = toSessionConfig({
      topico: 'fundamentos, semantica',
      nivel: 'avancado',
      qtd: '20',
      novas: '1',
      ids: 'q1,q2',
    });
    expect(config).toEqual({
      filters: {
        topics: ['fundamentos', 'semantica'],
        level: 'advanced',
        onlyUnanswered: true,
        ids: ['q1', 'q2'],
      },
      limit: 20,
    });
  });

  it('accepts "todas", caps large sizes and falls back on invalid ones', () => {
    expect(toSessionConfig({ ...EMPTY_QUERY, qtd: 'todas' }).limit).toBeNull();
    expect(toSessionConfig({ ...EMPTY_QUERY, qtd: '5000' }).limit).toBe(100);
    expect(toSessionConfig({ ...EMPTY_QUERY, qtd: 'abc' }).limit).toBe(10);
    expect(toSessionConfig({ ...EMPTY_QUERY, nivel: 'expert' }).filters.level).toBeNull();
  });
});

describe('toSessionQuery', () => {
  it('leaves defaults out of the URL', () => {
    expect(
      toSessionQuery({ topics: [], level: null, size: 10, onlyUnanswered: false, minutes: null }),
    ).toEqual({ topico: null, nivel: null, qtd: 10, novas: null, tempo: null });
  });

  it('keeps the exam duration', () => {
    expect(
      toSessionQuery({ topics: [], level: null, size: 20, onlyUnanswered: false, minutes: 30 }),
    ).toMatchObject({ qtd: 20, tempo: 30 });
  });

  it('round-trips with toSessionConfig', () => {
    const query = toSessionQuery({
      topics: ['semantica'],
      level: 'intermediate',
      size: null,
      onlyUnanswered: true,
      minutes: null,
    });
    const config = toSessionConfig({
      topico: query.topico ?? undefined,
      nivel: query.nivel ?? undefined,
      qtd: String(query.qtd),
      novas: query.novas ?? undefined,
      ids: undefined,
    });
    expect(config).toEqual({
      filters: { topics: ['semantica'], level: 'intermediate', onlyUnanswered: true, ids: [] },
      limit: null,
    });
  });
});

describe('toSessionConfig default size', () => {
  it('uses the given default when the URL has no size', () => {
    expect(toSessionConfig(EMPTY_QUERY, 20).limit).toBe(20);
  });
});
