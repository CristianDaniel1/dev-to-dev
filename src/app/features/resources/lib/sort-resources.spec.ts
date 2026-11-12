import { makeResource } from '../testing/resource.factory';
import { sortResources } from './sort-resources';

const ZED = makeResource({ id: 'zed', name: 'Zed' });
const ASTRO = makeResource({ id: 'astro', name: 'astro' });
const FEATURED = makeResource({ id: 'mdn', name: 'MDN', featured: true });

describe('sortResources', () => {
  it('puts featured first and keeps the authored order', () => {
    expect(sortResources([ZED, ASTRO, FEATURED], 'curated')).toEqual([FEATURED, ZED, ASTRO]);
  });

  it('orders by name ignoring case', () => {
    expect(sortResources([ZED, FEATURED, ASTRO], 'name')).toEqual([ASTRO, FEATURED, ZED]);
  });

  it('does not mutate the input', () => {
    const input = [ZED, ASTRO];
    sortResources(input, 'name');
    expect(input).toEqual([ZED, ASTRO]);
  });
});
