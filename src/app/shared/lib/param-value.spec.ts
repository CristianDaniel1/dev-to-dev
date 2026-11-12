import { valueFromParam } from './param-value';

const VALUES = ['free', 'paid'] as const;
const PARAMS = { free: 'gratuito', paid: 'pago' };

describe('valueFromParam', () => {
  it('maps a query value back to its value', () => {
    expect(valueFromParam(VALUES, PARAMS, 'pago')).toBe('paid');
  });

  it('returns null for missing or unknown params', () => {
    expect(valueFromParam(VALUES, PARAMS, undefined)).toBeNull();
    expect(valueFromParam(VALUES, PARAMS, 'paid')).toBeNull();
  });
});
