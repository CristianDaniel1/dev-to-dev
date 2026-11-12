import { filterOptions } from './filter-options';

describe('filterOptions', () => {
  it('lists "Todos" and the present values in canonical order', () => {
    const labels = { free: 'Gratuito', freemium: 'Freemium', paid: 'Pago' };
    expect(filterOptions(['free', 'freemium', 'paid'], ['paid', 'free', 'paid'], labels)).toEqual([
      { value: null, label: 'Todos' },
      { value: 'free', label: 'Gratuito' },
      { value: 'paid', label: 'Pago' },
    ]);
  });
});
