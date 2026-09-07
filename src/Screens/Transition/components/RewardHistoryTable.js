import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { formatDate } from '../../../Utils/rewardHistoryUtils';

const RewardHistoryTable = ({ data }) => {
  const tableHead = [
    <Text key="head-exp" style={styles.tableHeaderText} numberOfLines={1} adjustsFontSizeToFit>
      Expiry Date
    </Text>,
    <Text key="head-bal" style={styles.tableHeaderText} numberOfLines={1} adjustsFontSizeToFit>
      Balance
    </Text>,
  ];

  const tableData = data.map((item, index) => {
    const pointsExpiryDate =
      item?.ExpPeriod ||
      item?.expPeriod ||
      item?.ExpDate ||
      item?.expDate ||
      item?.PointsExpiryDate ||
      item?.pointsExpiryDate;
    const pointsBalance =
      item?.Points ??
      item?.points ??
      item?.PointsBalance ??
      item?.pointsBalance ??
      item?.Balance ??
      item?.balance;

    const formattedDate = formatDate(pointsExpiryDate);
    const expiryDisplay =
      formattedDate !== '-'
        ? formattedDate
        : (typeof pointsExpiryDate === 'string' && pointsExpiryDate.trim() !== '' ? pointsExpiryDate : '-');

    const numBalance = Number(pointsBalance);
    const isNegative =
      (!isNaN(numBalance) && numBalance < 0) ||
      (typeof pointsBalance === 'string' && pointsBalance.trim().startsWith('-'));

    let balanceElement;
    if (pointsBalance === undefined || pointsBalance === null || String(pointsBalance).trim() === '') {
      balanceElement = (
        <Text key={`bal-${index}`} style={styles.tableCellText} numberOfLines={1}>
          -
        </Text>
      );
    } else if (isNegative) {
      const absVal = !isNaN(numBalance) ? Math.abs(numBalance) : String(pointsBalance).replace('-', '').trim();
      balanceElement = (
        <Text key={`bal-${index}`} style={[styles.tableCellText, { color: 'red' }]} numberOfLines={1}>
          ({absVal})
        </Text>
      );
    } else {
      balanceElement = (
        <Text key={`bal-${index}`} style={styles.tableCellText} numberOfLines={1}>
          {String(pointsBalance)}
        </Text>
      );
    }

    return [
      <Text key={`exp-${index}`} style={styles.tableCellText} numberOfLines={1}>
        {expiryDisplay}
      </Text>,
      balanceElement,
    ];
  });

  return (
    <View style={styles.tableContainer}>
      <Table borderStyle={{ borderWidth: 1, borderColor: '#000000' }}>
        <Row
          data={tableHead}
          flexArr={[1, 1]}
          style={styles.tableHeader}
        />
        <Rows
          data={tableData}
          flexArr={[1, 1]}
          style={styles.tableRow}
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
