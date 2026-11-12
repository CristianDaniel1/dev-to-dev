import { makeResource } from '../testing/resource.factory';
import { collectionEntries } from './collection-entries';

describe('collectionEntries', () => {
  it('resolves items in the collection order and skips unknown ids', () => {
    const mdn = makeResource({ id: 'mdn' });
    const figma = makeResource({ id: 'figma' });
    const entries = collectionEntries(
      {
        slug: 'kit',
        name: 'Kit',
        description: 'Um kit.',
        items: [
          { resourceId: 'figma', note: 'Primeiro.' },
          { resourceId: 'missing', note: 'Some.' },
          { resourceId: 'mdn', note: 'Depois.' },
        ],
      },
      [mdn, figma],
    );
    expect(entries).toEqual([
      { resource: figma, note: 'Primeiro.' },
      { resource: mdn, note: 'Depois.' },
    ]);
  });
});
