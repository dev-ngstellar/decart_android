import { formatDate, formatExpiry, formatPoints, sortHistoryData } from '../rewardHistoryUtils';

describe('rewardHistoryUtils', () => {
  describe('formatDate', () => {
    it('formats ISO date to DD/MM/YYYY', () => {
      expect(formatDate('2026-06-20T00:00:00')).toBe('20/06/2026');
      expect(formatDate('2024-08-05T00:00:00')).toBe('05/08/2024');
    });

    it('returns "-" for null, undefined, or empty date', () => {
      expect(formatDate(null)).toBe('-');
      expect(formatDate(undefined)).toBe('-');
      expect(formatDate('')).toBe('-');
    });
  });

  describe('formatExpiry', () => {
    it('formats expiry date to MMM YYYY for earned points (>0)', () => {
      expect(formatExpiry('2027-06-15T00:00:00', 347)).toBe('Jun 2027');
      expect(formatExpiry('2025-08-05T00:00:00', 33)).toBe('Aug 2025');
    });

    it('returns "-" for redeemed transactions (pointsEarned <= 0)', () => {
      expect(formatExpiry('2025-11-27T00:00:00', 0)).toBe('-');
      expect(formatExpiry('2025-11-27T00:00:00', -10)).toBe('-');
    });

    it('returns "-" if date is missing or invalid', () => {
      expect(formatExpiry(null, 100)).toBe('-');
      expect(formatExpiry('', 100)).toBe('-');
    });
  });

  describe('formatPoints', () => {
    it('returns string value for numbers > 0', () => {
      expect(formatPoints(347)).toBe('347');
      expect(formatPoints(1356)).toBe('1356');
    });

    it('returns "-" for 0 or falsy values', () => {
      expect(formatPoints(0)).toBe('-');
      expect(formatPoints('0')).toBe('-');
      expect(formatPoints(null)).toBe('-');
      expect(formatPoints(undefined)).toBe('-');
    });
  });

  describe('sortHistoryData', () => {
    it('sorts latest transaction first and preserves relative API order for equal dates', () => {
      const input = [
        { CustId: 4, TransactionDate: '2024-08-05T00:00:00', PointsEarned: 33 },
        { CustId: 4, TransactionDate: '2026-07-31T00:00:00', PointsEarned: 24979 },
        { CustId: 4, TransactionDate: '2026-07-23T00:00:00', PointsEarned: 24748 },
        { CustId: 4, TransactionDate: '2026-07-23T00:00:00', PointsEarned: 24856 },
      ];

      const sorted = sortHistoryData(input);
      expect(sorted[0].PointsEarned).toBe(24979); // 2026-07-31
      expect(sorted[1].PointsEarned).toBe(24748); // 2026-07-23 item 1
      expect(sorted[2].PointsEarned).toBe(24856); // 2026-07-23 item 2
      expect(sorted[3].PointsEarned).toBe(33);    // 2024-08-05
    });
  });
});
