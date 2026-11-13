import { isPathChecklist } from './path-progress-shape';

describe('isPathChecklist', () => {
  it('accepts step ids grouped by path', () => {
    expect(isPathChecklist({ 'git-do-zero': ['commits', 'branches'] })).toBe(true);
    expect(isPathChecklist({})).toBe(true);
  });

  it('rejects other shapes', () => {
    expect(isPathChecklist(['commits'])).toBe(false);
    expect(isPathChecklist({ 'git-do-zero': 'commits' })).toBe(false);
    expect(isPathChecklist({ 'git-do-zero': [1] })).toBe(false);
    expect(isPathChecklist(null)).toBe(false);
  });
});
