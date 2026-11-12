import { makeQuestion } from '../testing/question.factory';
import { makeTech, makeTopic } from '../testing/tech.factory';
import { mixedScope, techScope } from './session-scope';

const HTML = makeTech([makeTopic('fundamentos', { beginner: 1, intermediate: 0, advanced: 0 })]);
const CSS = { ...HTML, slug: 'css', name: 'CSS', color: '#2a4bcb' };

describe('session scopes', () => {
  it('groups a tech session by topic and retries in its practice route', () => {
    const scope = techScope(HTML, 'exam');
    expect(scope.title).toBe('Simulado de HTML');
    expect(scope.groups.map((group) => group.key)).toEqual(['fundamentos']);
    expect(scope.groupOf(makeQuestion({ topic: 'semantica' }))).toBe('semantica');
    expect(scope.retryRoute).toEqual(['/quizzes', 'html', 'praticar']);
  });

  it('groups a mixed session by tech and retries in the random route', () => {
    const scope = mixedScope([HTML, CSS], 'review');
    expect(scope.groups.map((group) => group.name)).toEqual(['HTML', 'CSS']);
    expect(scope.groupOf(makeQuestion({ tech: 'css' }))).toBe('css');
    expect(scope.retryParams).toEqual({ techs: 'html,css' });
    expect(scope.exitLink).toBe('/revisao');
  });
});
