import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import RewardHistoryHeader from './RewardHistoryHeader';
import RewardHistoryRow from './RewardHistoryRow';

const RewardHistoryTable = ({ data }) => {
  return (
    <View style={styles.tableContainer}>
      <RewardHistoryHeader />
      {data.map((item, index) => (
        <RewardHistoryRow
          key={item.id || item.CustId ? `${item.CustId}-${item.TransactionDate}-${index}` : index}
          item={item}
          isLast={index === data.length - 1}
        />
      ))}
    </View>
  );
};

export default RewardHistoryTable;

const styles = StyleSheet.create({
  tableContainer: {
    marginVertical: 15,
    width: '100%',
  },
});
