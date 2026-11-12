import { EMPTY_RESOURCE_FILTERS } from '../constants/resource-filters.constants';
import { makeResource } from '../testing/resource.factory';
import { filterResources } from './filter-resources';

const MDN = makeResource();
const FIGMA = makeResource({
  id: 'figma',
  name: 'Figma',
  domain: 'figma.com',
  description: 'Ferramenta de design de interfaces.',
  why: 'Os layouts chegam por ele.',
  type: 'tool',
  pricing: 'freemium',
  languages: ['en'],
  techs: [],
});
const RESOURCES = [MDN, FIGMA];
const NONE = new Set<string>();

describe('filterResources', () => {
  it('returns everything without filters', () => {
    expect(filterResources(RESOURCES, EMPTY_RESOURCE_FILTERS, NONE)).toEqual(RESOURCES);
  });

  it('combines filters', () => {
    const filters = {
      ...EMPTY_RESOURCE_FILTERS,
      pricing: 'free' as const,
      language: 'pt' as const,
    };
    expect(filterResources(RESOURCES, filters, NONE)).toEqual([MDN]);
  });

  it('filters by tech and type', () => {
    expect(filterResources(RESOURCES, { ...EMPTY_RESOURCE_FILTERS, tech: 'css' }, NONE)).toEqual([
      MDN,
    ]);
    expect(filterResources(RESOURCES, { ...EMPTY_RESOURCE_FILTERS, type: 'tool' }, NONE)).toEqual([
      FIGMA,
    ]);
  });

  it('searches every word, ignoring case and accents', () => {
    const search = (query: string) =>
      filterResources(RESOURCES, { ...EMPTY_RESOURCE_FILTERS, query }, NONE);
    expect(search('DOCUMENTAÇÃO web')).toEqual([MDN]);
    expect(search('figma.com')).toEqual([FIGMA]);
    expect(search('design web')).toEqual([]);
  });

  it('keeps only favorites when asked', () => {
    const filters = { ...EMPTY_RESOURCE_FILTERS, onlyFavorites: true };
    expect(filterResources(RESOURCES, filters, new Set(['figma']))).toEqual([FIGMA]);
  });
});
