import { toGrade } from './grade';

describe('toGrade', () => {
  it('scales to 10 with one decimal and a comma', () => {
    expect(toGrade(7, 10)).toBe('7,0');
    expect(toGrade(2, 3)).toBe('6,7');
    expect(toGrade(0, 0)).toBe('0,0');
  });
});
