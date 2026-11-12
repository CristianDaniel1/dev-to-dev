import { examMinutesFromParam } from './exam-params';

describe('examMinutesFromParam', () => {
  it('accepts the offered durations only', () => {
    expect(examMinutesFromParam('20')).toBe(20);
    expect(examMinutesFromParam('7')).toBeNull();
    expect(examMinutesFromParam(undefined)).toBeNull();
  });
});
