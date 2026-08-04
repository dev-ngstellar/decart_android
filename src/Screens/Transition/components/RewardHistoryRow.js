import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatDate, formatExpiry, formatPoints } from '../../../Utils/rewardHistoryUtils';

const RewardHistoryRow = ({ item, isLast }) => {
  const transactionDate = item?.TransactionDate || item?.transactionDate;
  const pointsEarned = item?.PointsEarned ?? item?.pointsEarned ?? 0;
  const pointsRedeemed = item?.PointsRedeemed ?? item?.pointsRedeemed ?? 0;
  const pointsBalance = item?.PointsBalance ?? item?.pointsBalance ?? 0;
  const pointsExpiryDate = item?.PointsExpiryDate || item?.pointsExpiryDate;

  const dateDisplay = formatDate(transactionDate);
  const earnedDisplay = formatPoints(pointsEarned);
  const redeemedDisplay = formatPoints(pointsRedeemed);
  const balanceDisplay = pointsBalance !== undefined && pointsBalance !== null ? pointsBalance : '-';
  const expiryDisplay = formatExpiry(pointsExpiryDate, pointsEarned);

  return (
    <View style={[styles.row, isLast && { borderBottomWidth: 1 }]}>
      <View style={[styles.cell, { width: '19%' }]}>
        <Text style={styles.cellText} numberOfLines={1} adjustsFontSizeToFit={true}>{dateDisplay}</Text>
      </View>
      <View style={[styles.cell, { width: '22%' }]}>
        <Text style={styles.cellText} numberOfLines={1}>{earnedDisplay}</Text>
      </View>
      <View style={[styles.cell, { width: '21%' }]}>
        <Text style={styles.cellText} numberOfLines={1}>{redeemedDisplay}</Text>
      </View>
      <View style={[styles.cell, { width: '19%' }]}>
        <Text style={styles.cellText} numberOfLines={1}>{balanceDisplay}</Text>
      </View>
      <View style={[styles.cell, { width: '19%', borderRightWidth: 0 }]}>
        <Text style={styles.cellText} numberOfLines={1} adjustsFontSizeToFit={true}>{expiryDisplay}</Text>
      </View>
    </View>
  );
};

export default RewardHistoryRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
    minHeight: 34,
    alignItems: 'center',
    width: '100%',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 34,
    borderRightWidth: 1,
    borderRightColor: 'black',
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
  cellText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
});
