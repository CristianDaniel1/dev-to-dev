import { toRandomQuery } from './random-params';

const ALL = ['html', 'css', 'javascript'];

describe('toRandomQuery', () => {
  it('lists the chosen techs and the other choices', () => {
    expect(
      toRandomQuery({
        techs: ['html', 'css'],
        allTechs: ALL,
        level: 'advanced',
        size: 20,
        onlyUnanswered: true,
      }),
    ).toEqual({ techs: 'html,css', nivel: 'avancado', qtd: 20, novas: '1' });
  });

  it('leaves the techs out when all are chosen', () => {
    expect(
      toRandomQuery({ techs: ALL, allTechs: ALL, level: null, size: null, onlyUnanswered: false }),
    ).toEqual({ techs: null, nivel: null, qtd: 'todas', novas: null });
  });
});
