import { SITE_URL } from '@/core/constants/site.constants';
import type { GlossaryTerm } from '@/shared/interfaces/glossary.interface';
import { glossaryJsonLd, termJsonLd } from './glossary-json-ld';

const TERM = {
  slug: 'closure',
  term: 'Closure',
  aka: ['fechamento'],
  shortText: 'Função que lembra o escopo.',
} as GlossaryTerm;

describe('termJsonLd', () => {
  it('describes the term inside the glossary set, followed by the breadcrumb', () => {
    const [definedTerm, breadcrumb] = termJsonLd(TERM);

    expect(definedTerm).toMatchObject({
      '@type': 'DefinedTerm',
      name: 'Closure',
      description: 'Função que lembra o escopo.',
      url: `${SITE_URL}/glossario/closure`,
      alternateName: ['fechamento'],
      inDefinedTermSet: { '@type': 'DefinedTermSet', url: `${SITE_URL}/glossario` },
    });
    expect(breadcrumb).toMatchObject({ '@type': 'BreadcrumbList' });
  });

  it('leaves out alternate names when the term has none', () => {
    const [definedTerm] = termJsonLd({ ...TERM, aka: [] });

    expect(definedTerm).not.toHaveProperty('alternateName');
  });
});

describe('glossaryJsonLd', () => {
  it('lists every term in the set', () => {
    const [set] = glossaryJsonLd([TERM]);

    expect(set).toMatchObject({
      '@type': 'DefinedTermSet',
      hasDefinedTerm: [{ '@type': 'DefinedTerm', name: 'Closure' }],
    });
  });
});
