import { ASSIGNMENT_QUESTION_ID, STRING_CONCAT_QUESTION_ID } from '../constants/e2e.constants';
import { expect, test } from '../fixtures/test';
import { dueProgress, seedProgress } from '../helpers/progress-data';
import { readProgress } from '../helpers/storage';

const TWO_KNOWN = `ids=${STRING_CONCAT_QUESTION_ID},${ASSIGNMENT_QUESTION_ID}`;

test.describe('Exam', () => {
  test('hides the answers until the end', async ({ page, session }) => {
    await session.openExam('javascript', TWO_KNOWN);
    await expect(session.title('Simulado de JavaScript')).toBeVisible();

    for (let position = 1; position <= 2; position++) {
      await expect(session.counter).toHaveText(`Questão ${position} de 2`);
      await expect(session.examSubmitButton).toBeDisabled();
      await page.keyboard.press('a');
      await expect(session.feedback).toBeHidden();
      await session.examSubmitButton.click();
    }

    await expect(session.resultsHeading).toBeFocused();
    await expect(session.score).toBeVisible();
    expect((await readProgress(page))?.sessions[0]).toMatchObject({ kind: 'exam', total: 2 });
  });

  test('ends when the time runs out', async ({ page, session }) => {
    await page.clock.install();
    await session.openExam('javascript', `${TWO_KNOWN}&tempo=10`);
    await expect(session.timer).toHaveText('10:00');

    await page.clock.fastForward('10:01');

    await expect(session.resultsHeading).toBeVisible();
    await expect(session.unansweredNote).toContainText('2 perguntas ficaram sem resposta');
  });

  test('is set up from the tech page', async ({ page, techOverview }) => {
    await techOverview.open('css');
    await techOverview.setup.getByRole('group', { name: 'Modo' }).getByText('Simulado').click();
    await techOverview.setup.getByRole('group', { name: 'Tempo' }).getByText('20 min').click();

    const start = techOverview.setup.getByRole('link', { name: 'Começar o simulado' });
    await expect(start).toHaveAttribute('href', /\/quizzes\/css\/simulado\?.*tempo=20/);
    await expect(start).toHaveAttribute('href', /qtd=20/);
    await start.click();
    await expect(page).toHaveURL(/simulado/);
  });
});

test.describe('Spaced review', () => {
  test('explains that there is nothing to review yet', async ({ review }) => {
    await review.open();
    await expect(review.nothingYet).toBeVisible();
  });

  test('reviews the questions that are due', async ({ page, review, session }) => {
    await seedProgress(page, dueProgress([STRING_CONCAT_QUESTION_ID]));
    await review.open();
    await expect(review.dueSummary).toHaveText('1 pergunta para revisar');

    await review.startButton.click();
    await expect(session.title('Revisão')).toBeVisible();
    await expect(session.counter).toHaveText('Questão 1 de 1');
    await session.option('"22"').click();
    await session.submit();
    await session.nextButton.click();

    await expect(session.resultsHeading).toHaveText('Gabaritou.');
    const stored = await readProgress(page);
    expect(stored?.questions[STRING_CONCAT_QUESTION_ID]?.box).toBe(2);
  });
});

test.describe('Random mode', () => {
  test('mixes only the chosen techs', async ({ page, randomSetup, session }) => {
    await randomSetup.open();
    await randomSetup.chooseOnlyTech('CSS');
    await randomSetup.chooseSize('5');

    await expect(randomSetup.startButton).toHaveAttribute('href', /techs=css&qtd=5/);
    await randomSetup.startButton.click();

    await expect(session.title('Aleatório')).toBeVisible();
    await expect(session.counter).toHaveText('Questão 1 de 5');
  });
});

test.describe('Progress page', () => {
  test('shows the numbers and backs up, restores and erases the progress', async ({
    page,
    progressPage,
  }) => {
    const backup = dueProgress([STRING_CONCAT_QUESTION_ID, ASSIGNMENT_QUESTION_ID]);
    await seedProgress(page, dueProgress([STRING_CONCAT_QUESTION_ID]));
    await progressPage.open();
    await expect(progressPage.stat('Respondidas')).toHaveText('1');

    await test.step('download a backup', async () => {
      const download = page.waitForEvent('download');
      await progressPage.downloadButton.click();
      expect((await download).suggestedFilename()).toMatch(/^dev-to-dev-progresso-.+\.json$/);
    });

    await test.step('import a backup after confirming', async () => {
      await progressPage.importInput.setInputFiles({
        name: 'backup.json',
        mimeType: 'application/json',
        buffer: Buffer.from(JSON.stringify(backup)),
      });
      await progressPage.replaceButton.click();
      await expect(progressPage.status).toHaveText('Progresso importado.');
      await expect(progressPage.stat('Respondidas')).toHaveText('2');
    });

    await test.step('reject an invalid file', async () => {
      await progressPage.importInput.setInputFiles({
        name: 'other.json',
        mimeType: 'application/json',
        buffer: Buffer.from('{"hello":"world"}'),
      });
      await expect(progressPage.status).toHaveText(
        'Esse arquivo não é um backup válido do Dev to Dev.',
      );
    });

    await test.step('erase after confirming', async () => {
      await progressPage.clearButton.click();
      await progressPage.confirmClearButton.click();
      await expect(progressPage.stat('Respondidas')).toHaveText('0');
    });
  });
});
