import { backupFileName } from './backup-file-name';

describe('backupFileName', () => {
  it('uses the local date', () => {
    expect(backupFileName(new Date(2026, 0, 5, 23).getTime())).toBe(
      'dev-to-dev-progresso-2026-01-05.json',
    );
  });
});
