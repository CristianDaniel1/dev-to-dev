import { techListFromParam } from './tech-list';

const AVAILABLE = ['html', 'css', 'javascript'];

describe('techListFromParam', () => {
  it('keeps known techs in catalog order', () => {
    expect(techListFromParam('javascript, html,cobol', AVAILABLE)).toEqual(['html', 'javascript']);
  });

  it('falls back to every tech', () => {
    expect(techListFromParam(undefined, AVAILABLE)).toEqual(AVAILABLE);
    expect(techListFromParam('cobol', AVAILABLE)).toEqual(AVAILABLE);
  });
});
