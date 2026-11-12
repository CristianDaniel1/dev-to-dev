import { EMPTY_RESOURCE_FILTERS } from '../constants/resource-filters.constants';
import type { ResourceFilters } from '../interfaces/resource-filters.interface';
import {
  countActiveFilters,
  hasActiveFilters,
  toResourceFilters,
  toResourceQuery,
} from './resource-params';

describe('toResourceFilters', () => {
  it('reads every filter from pt-BR query values', () => {
    expect(
      toResourceFilters({
        q: ' fontes ',
        tipo: 'ferramenta',
        preco: 'gratuito',
        idioma: 'pt',
        tech: 'css',
        favoritos: '1',
        ordem: 'nome',
      }),
    ).toEqual<ResourceFilters>({
      query: 'fontes',
      type: 'tool',
      pricing: 'free',
      language: 'pt',
      tech: 'css',
      onlyFavorites: true,
      sort: 'name',
    });
  });

  it('falls back to no filter for missing or unknown values', () => {
    expect(toResourceFilters({ tipo: 'tool', preco: 'barato', tech: 'cobol' })).toEqual(
      EMPTY_RESOURCE_FILTERS,
    );
  });
});

describe('toResourceQuery', () => {
  it('leaves defaults out of the URL', () => {
    expect(Object.values(toResourceQuery(EMPTY_RESOURCE_FILTERS)).every((v) => v === null)).toBe(
      true,
    );
  });

  it('round-trips through toResourceFilters', () => {
    const filters: ResourceFilters = {
      ...EMPTY_RESOURCE_FILTERS,
      query: 'git',
      type: 'practice',
      sort: 'name',
    };
    const query = toResourceQuery(filters);
    expect(query).toMatchObject({ q: 'git', tipo: 'pratica', ordem: 'nome' });
    expect(toResourceFilters(query)).toEqual(filters);
  });
});

describe('hasActiveFilters', () => {
  it('ignores the order', () => {
    expect(hasActiveFilters({ ...EMPTY_RESOURCE_FILTERS, sort: 'name' })).toBe(false);
    expect(hasActiveFilters({ ...EMPTY_RESOURCE_FILTERS, onlyFavorites: true })).toBe(true);
  });
});

describe('countActiveFilters', () => {
  it('counts the filters besides search and order', () => {
    expect(
      countActiveFilters({
        ...EMPTY_RESOURCE_FILTERS,
        query: 'git',
        sort: 'name',
        tech: 'git',
        onlyFavorites: true,
      }),
    ).toBe(2);
  });
});
