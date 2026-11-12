import { optionValue } from './option-value';

describe('optionValue', () => {
  const options = [
    { value: null, label: 'Todos' },
    { value: 'tool' as const, label: 'Ferramenta' },
  ];

  it('maps the select value back to the option value', () => {
    expect(optionValue(options, 'tool')).toBe('tool');
    expect(optionValue(options, '')).toBeNull();
    expect(optionValue(options, 'unknown')).toBeNull();
  });
});
