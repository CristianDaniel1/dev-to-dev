import {
  ASSIGNMENT_QUESTION_ID,
  MISSING_QUESTION_ID,
  SMOKE_TAG,
  STRING_CONCAT_QUESTION_ID,
} from '../constants/e2e.constants';
import { expect, test } from '../fixtures/test';
import { readProgress } from '../helpers/storage';

test.describe('Practice session', () => {
  test(
    'runs a whole session with the keyboard and saves the progress',
    { tag: SMOKE_TAG },
    async ({ page, techOverview, session, catalog }) => {
      await test.step('start a five-question session', async () => {
        await techOverview.open('html');
        await techOverview.chooseSize('5');
        // The link is rendered on the next change detection; wait for it before clicking.
        await expect(techOverview.startButton).toHaveAttribute('href', /qtd=5/);
        await techOverview.startButton.click();
        await expect(page).toHaveURL(/praticar\?.*qtd=5/);
      });

      await test.step('answer every question', async () => {
        for (let position = 1; position <= 5; position++) {
          await expect(session.counter).toHaveText(`Pergunta ${position} de 5`);
          await session.answerWithKeyboard();
          await session.continueWithEnter();
        }
      });

      await test.step('see the results and the review', async () => {
        await expect(session.score).toBeVisible();
        await expect(session.reviewHeading).toBeVisible();
        await expect(session.resultsHeading).toBeFocused();
      });

      await test.step('find the progress saved', async () => {
        const progress = await readProgress(page);
        expect(Object.keys(progress?.questions ?? {})).toHaveLength(5);
        expect(progress?.sessions).toHaveLength(1);

        await catalog.open();
        await expect(catalog.techCard('HTML').getByText(/ 5 de \d+ respondidas/)).toBeVisible();
      });
    },
  );

  test('explains a wrong answer and offers to retry it', async ({ page, session }) => {
    await session.open('javascript', `ids=${STRING_CONCAT_QUESTION_ID}`);
    await session.option('4').click();
    await session.submit('Chutei');

    await expect(session.feedback).toHaveText('Não foi dessa vez.');
    await expect(page.getByText(/converte o outro para string e concatena/)).toBeVisible();

    await session.nextButton.click();
    await expect(session.retryMistakesLink).toHaveText('Refazer a que ficou para revisão');
  });

  test('goes through two questions with the buttons', async ({ session }) => {
    await session.open('javascript', `ids=${STRING_CONCAT_QUESTION_ID},${ASSIGNMENT_QUESTION_ID}`);

    await expect(session.counter).toHaveText('Pergunta 1 de 2');
    await session.answerWithKeyboard('Chutei');
    await session.nextButton.click();

    await expect(session.counter).toHaveText('Pergunta 2 de 2');
    await session.answerWithKeyboard('Chutei');
    await session.nextButton.click();

    await expect(session.score).toBeVisible();
  });

  test('locks the options after answering', async ({ session }) => {
    await session.open('javascript', `ids=${ASSIGNMENT_QUESTION_ID}`);
    await session.answerWithKeyboard();

    const selectedBefore = await session.options.evaluateAll((buttons) =>
      buttons.map((button) => button.getAttribute('aria-pressed')),
    );
    await session.page.keyboard.press('b');
    const selectedAfter = await session.options.evaluateAll((buttons) =>
      buttons.map((button) => button.getAttribute('aria-pressed')),
    );
    expect(selectedAfter).toEqual(selectedBefore);
  });

  test('shows an empty state when no question matches', async ({ session }) => {
    await session.open('react', `ids=${MISSING_QUESTION_ID}`);

    await expect(session.emptyState).toBeVisible();
  });
});
