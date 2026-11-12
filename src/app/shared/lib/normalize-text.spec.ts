import { normalizeText } from './normalize-text';

describe('normalizeText', () => {
  it('lowercases, strips accents and trims', () => {
    expect(normalizeText('  Formulários e Ações ')).toBe('formularios e acoes');
  });
});
