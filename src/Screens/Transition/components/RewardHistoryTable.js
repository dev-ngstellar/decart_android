import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { formatDate } from '../../../Utils/rewardHistoryUtils';

const RewardHistoryTable = ({ data }) => {
  const tableHead = ['Expiry Date', 'Balance'];

  const tableData = data.map(item => {
    const pointsExpiryDate = item?.PointsExpiryDate || item?.pointsExpiryDate;
    const pointsBalance = item?.PointsBalance ?? item?.pointsBalance;

    const expiryDisplay = formatDate(pointsExpiryDate);
    const balanceDisplay =
      pointsBalance !== undefined &&
      pointsBalance !== null &&
      String(pointsBalance).trim() !== ''
        ? String(pointsBalance)
        : '-';

    return [expiryDisplay, balanceDisplay];
  });

  return (
    <View style={styles.tableContainer}>
      <Table borderStyle={{ borderWidth: 1, borderColor: '#000000' }}>
        <Row
          data={tableHead}
          flexArr={[1, 1]}
          style={styles.tableHeader}
          textStyle={styles.tableHeaderText}
        />
        <Rows
          data={tableData}
          flexArr={[1, 1]}
          style={styles.tableRow}
          textStyle={styles.tableCellText}
        />
      </Table>
    </View>
  );
};

export default RewardHistoryTable;

const styles = StyleSheet.create({
  tableContainer: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  tableHeader: {
    height: 48,
    backgroundColor: '#ffffff',
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  tableRow: {
    height: 46,
    backgroundColor: '#ffffff',
  },
  tableCellText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
});
