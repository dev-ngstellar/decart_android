import moment from 'moment';

/**
 * Parses date string using standard JS Date parser and checks validity.
 * @param {string} dateStr 
 * @returns {Date|null}
 */
export const parseDateTime = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string' || dateStr.trim() === '') {
    return null;
  }
  try {
    const parsed = new Date(dateStr);
    if (isNaN(parsed.getTime())) {
      console.log('rewardHistoryUtils - Invalid date string encountered:', dateStr);
      return null;
    }
    return parsed;
  } catch (err) {
    console.log('rewardHistoryUtils - Exception parsing date string:', dateStr, err);
    return null;
  }
};

/**
 * Format date string to 'DD MMM YYYY' (e.g. 05 Aug 2024)
 * @param {string} dateStr 
 * @returns {string}
 */
export const formatDate = (dateStr) => {
  const parsed = parseDateTime(dateStr);
  if (!parsed) return '-';
  return moment(parsed).format('DD MMM YYYY');
};

/**
 * Format expiry date string to 'MMM YYYY' (e.g. Aug 2025) for earned transactions
 * Returns '-' for redeemed or zero-earned transactions
 * @param {string} dateStr 
 * @param {number|string} pointsEarned 
 * @returns {string}
 */
export const formatExpiry = (dateStr, pointsEarned) => {
  const earned = Number(pointsEarned);
  if (isNaN(earned) || earned <= 0) return '-';
  const parsed = parseDateTime(dateStr);
  if (!parsed) return '-';
  return moment(parsed).format('MMM YYYY');
};

/**
 * Format points numeric value.
 * Returns '-' if value is 0, null, or undefined.
 * @param {number|string} val 
 * @returns {string}
 */
export const formatPoints = (val) => {
  const num = Number(val);
  if (isNaN(num) || num === 0) return '-';
  return num.toString();
};

/**
 * Sort history data latest transaction first while preserving API response order for equal timestamps
 * @param {Array} list 
 * @returns {Array}
 */
export const sortHistoryData = (list) => {
  if (!Array.isArray(list)) return [];
  return [...list].sort((a, b) => {
    const dateAStr = a.TransactionDate || a.transactionDate;
    const dateBStr = b.TransactionDate || b.transactionDate;
    const dateA = parseDateTime(dateAStr);
    const dateB = parseDateTime(dateBStr);
    const timeA = dateA ? dateA.getTime() : 0;
    const timeB = dateB ? dateB.getTime() : 0;
    return timeB - timeA;
  });
};
