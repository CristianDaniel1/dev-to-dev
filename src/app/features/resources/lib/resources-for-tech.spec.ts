import { makeResource } from '../testing/resource.factory';
import { resourcesForTech } from './resources-for-tech';

describe('resourcesForTech', () => {
  const css = makeResource({ id: 'css', techs: ['css'] });
  const featuredCss = makeResource({ id: 'featured', techs: ['css', 'html'], featured: true });
  const git = makeResource({ id: 'git', techs: ['git'] });

  it('keeps the tagged resources, featured first, up to the limit', () => {
    expect(resourcesForTech([css, git, featuredCss], 'css', 5)).toEqual([featuredCss, css]);
    expect(resourcesForTech([css, git, featuredCss], 'css', 1)).toEqual([featuredCss]);
  });

  it('returns nothing for a tech without resources', () => {
    expect(resourcesForTech([css, git], 'sql', 5)).toEqual([]);
  });
});
