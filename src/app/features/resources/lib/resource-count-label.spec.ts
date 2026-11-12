import { resourceCountLabel } from './resource-count-label';

describe('resourceCountLabel', () => {
  it('handles zero, one and many', () => {
    expect(resourceCountLabel(0)).toBe('Nenhum recurso');
    expect(resourceCountLabel(1)).toBe('1 recurso');
    expect(resourceCountLabel(12)).toBe('12 recursos');
  });
});
