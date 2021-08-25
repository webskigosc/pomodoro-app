import { getMinutesAndSecondsFromTimeInSeconds } from '../../lib/time';

describe('getMinutesAndSecondsFromTimeInSeconds', () => {
  describe('from 30 seconds', () => {
    it('get only 30 seconds', () => {
      expect(getMinutesAndSecondsFromTimeInSeconds(30)[1]).toBe(30);
    });
    it('get 0 minutes and 30 seconds', () => {
      expect(getMinutesAndSecondsFromTimeInSeconds(30)).toEqual([0, 30]);
    });
  });
  describe('from 120 seconds', () => {
    it('get only 2 minutes', () => {
      expect(getMinutesAndSecondsFromTimeInSeconds(120)[0]).toBe(2);
    });
    it('get 2 minutes and 0 seconds', () => {
      expect(getMinutesAndSecondsFromTimeInSeconds(120)).toEqual([2, 0]);
    });
  });
});
