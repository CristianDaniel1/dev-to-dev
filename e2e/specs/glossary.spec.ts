import { expect, test } from '../fixtures/test';

test.describe('Glossary', () => {
  test('lists the terms from A to Z and filters them by tech', async ({ page, glossary }) => {
    await glossary.open();
    await expect(glossary.term('Closure')).toBeVisible();

    await glossary.group('SQL').click();

    await expect(page).toHaveURL(/\/glossario\?grupo=sql$/);
    await expect(glossary.count).toHaveText('10 termos de SQL');
    await expect(glossary.term('JOIN')).toBeVisible();
    await expect(glossary.term('Closure')).toBeHidden();
  });

  test('jumps to a letter from the index', async ({ page, glossary }) => {
    await glossary.open();

    await glossary.letters.getByRole('link', { name: 'R', exact: true }).click();

    await expect(page).toHaveURL(/#letra-r$/);
    await expect(glossary.section('R')).toBeInViewport();
  });

  test('a term page explains the term and links to practice and related terms', async ({
    page,
    glossary,
  }) => {
    await glossary.open('/glossario/closure');

    await expect(page.getByRole('heading', { level: 1, name: 'Closure' })).toBeVisible();
    await expect(page.getByText('Também chamado de fechamento')).toBeVisible();
    await expect(
      page.getByRole('region', { name: 'Pratique' }).getByRole('link', { name: 'Funções' }).first(),
    ).toHaveAttribute('href', '/quizzes/javascript/praticar?topico=funcoes');

    await page
      .getByRole('region', { name: 'Termos relacionados' })
      .getByRole('link', { name: 'Escopo' })
      .click();
    await expect(page.getByRole('heading', { level: 1, name: 'Escopo' })).toBeVisible();
  });
});
