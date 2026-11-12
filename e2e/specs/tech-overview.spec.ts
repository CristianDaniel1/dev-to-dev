import { EMPTY_FILTER } from '../constants/e2e.constants';
import { expect, test } from '../fixtures/test';

test.describe('Session setup', () => {
  test('builds the practice URL from the chosen filters', async ({ page, techOverview }) => {
    await techOverview.open('css');
    await techOverview.toggleTopic('Layout');
    await techOverview.chooseLevel('Intermediário');
    await techOverview.chooseSize('Todas');

    await expect(techOverview.availability).toContainText(/\d+ de \d+ perguntas disponíveis/);
    await techOverview.startButton.click();

    await expect(page).toHaveURL(/\/quizzes\/css\/praticar\?/);
    const url = new URL(page.url());
    expect(url.searchParams.get('topico')).toBe('layout');
    expect(url.searchParams.get('nivel')).toBe('intermediario');
    expect(url.searchParams.get('qtd')).toBe('todas');
  });

  test('explains when no question matches', async ({ techOverview }) => {
    await techOverview.open(EMPTY_FILTER.tech);
    await techOverview.toggleTopic(EMPTY_FILTER.topic);
    await techOverview.chooseLevel(EMPTY_FILTER.level);

    await expect(techOverview.noMatches).toBeVisible();
    await expect(techOverview.startButton).toBeHidden();
  });
});
