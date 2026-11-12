import { isControlTarget, isTypingTarget, optionIndexForKey } from './keyboard';

describe('optionIndexForKey', () => {
  it('maps letters and digits to positions', () => {
    expect(optionIndexForKey('a')).toBe(0);
    expect(optionIndexForKey('D')).toBe(3);
    expect(optionIndexForKey('1')).toBe(0);
    expect(optionIndexForKey('6')).toBe(5);
  });

  it('ignores other keys', () => {
    expect(optionIndexForKey('g')).toBe(-1);
    expect(optionIndexForKey('7')).toBe(-1);
    expect(optionIndexForKey('Enter')).toBe(-1);
  });
});

describe('event targets', () => {
  it('detects typing fields', () => {
    expect(isTypingTarget(document.createElement('input'))).toBe(true);
    expect(isTypingTarget(document.createElement('div'))).toBe(false);
    expect(isTypingTarget(null)).toBe(false);
  });

  it('detects buttons, links and their children', () => {
    const button = document.createElement('button');
    const icon = document.createElement('span');
    button.appendChild(icon);
    expect(isControlTarget(button)).toBe(true);
    expect(isControlTarget(icon)).toBe(true);
    expect(isControlTarget(document.body)).toBe(false);
  });
});
