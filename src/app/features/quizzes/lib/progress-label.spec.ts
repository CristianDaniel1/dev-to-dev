import { progressLabel, toPercent } from './progress-label';

describe('toPercent', () => {
  it('converts and caps at 100', () => {
    expect(toPercent(5, 20)).toBe(25);
    expect(toPercent(30, 20)).toBe(100);
    expect(toPercent(3, 0)).toBe(0);
  });
});

describe('progressLabel', () => {
  it('describes empty and partial progress', () => {
    expect(progressLabel(0, 0, 22)).toBe('Nenhuma pergunta respondida ainda');
    expect(progressLabel(8, 5, 22)).toBe('5 dominadas, 8 de 22 respondidas');
  });
});
