import { makeTech, makeTopic } from '../testing/tech.factory';
import { groupByArea } from './catalog-areas';

const TOPICS = [makeTopic('fundamentos', { beginner: 1, intermediate: 0, advanced: 0 })];

describe('groupByArea', () => {
  it('groups in area order and drops empty areas', () => {
    const html = makeTech(TOPICS);
    const sql = { ...makeTech(TOPICS), slug: 'sql', area: 'databases' as const };
    const areas = groupByArea([sql, html]);

    expect(areas.map((area) => area.slug)).toEqual(['frontend', 'databases']);
    expect(areas[0]?.label).toBe('Frontend');
    expect(areas[1]?.techs.map((tech) => tech.slug)).toEqual(['sql']);
  });
});
