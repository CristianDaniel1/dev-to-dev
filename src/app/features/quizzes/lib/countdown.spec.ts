import { formatCountdown, timerWarning } from './countdown';

describe('formatCountdown', () => {
  it('formats minutes and seconds, rounding up', () => {
    expect(formatCountdown(545_000)).toBe('9:05');
    expect(formatCountdown(500)).toBe('0:01');
    expect(formatCountdown(-10)).toBe('0:00');
  });
});

describe('timerWarning', () => {
  it('warns in the last five minutes and at the end', () => {
    expect(timerWarning(600_000)).toBe('');
    expect(timerWarning(240_000)).toBe('Faltam 5 minutos.');
    expect(timerWarning(30_000)).toBe('Falta 1 minuto.');
    expect(timerWarning(0)).toBe('O tempo acabou.');
  });
});
