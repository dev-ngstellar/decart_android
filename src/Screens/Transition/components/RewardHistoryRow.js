import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatDate } from '../../../Utils/rewardHistoryUtils';

const RewardHistoryRow = ({ item, isLast }) => {
  const pointsExpiryDate = item?.PointsExpiryDate || item?.pointsExpiryDate;
  const pointsBalance = item?.PointsBalance ?? item?.pointsBalance;

  const expiryDisplay = formatDate(pointsExpiryDate);
  const balanceDisplay =
    pointsBalance !== undefined && pointsBalance !== null && String(pointsBalance).trim() !== ''
      ? pointsBalance
      : '-';

  return (
    <View style={[styles.row, isLast && { borderBottomWidth: 1 }]}>
      {/* Tarikh Luput Column (50%) */}
      <View style={[styles.cell, { width: '50%' }]}>
        <Text style={styles.cellText} numberOfLines={1}>
          {expiryDisplay}
        </Text>
      </View>

      {/* Baki Mata Column (50%) */}
      <View style={[styles.cell, { width: '50%', borderRightWidth: 0 }]}>
        <Text style={styles.cellText} numberOfLines={1}>
          {balanceDisplay}
        </Text>
      </View>
    </View>
  );
};

export default RewardHistoryRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000000',
    height: 46,
    alignItems: 'center',
    width: '100%',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
    borderRightWidth: 1,
    borderRightColor: '#000000',
    paddingHorizontal: 8,
  },
  cellText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
});

