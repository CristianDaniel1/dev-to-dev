import { resultHeadingFor } from './result-heading';

describe('resultHeadingFor', () => {
  it('picks the highest band reached', () => {
    expect(resultHeadingFor(100)).toBe('Gabaritou.');
    expect(resultHeadingFor(70)).toBe('Mandou bem.');
    expect(resultHeadingFor(69)).toBe('Está no caminho.');
    expect(resultHeadingFor(0)).toBe('Hora de revisar.');
  });
});
