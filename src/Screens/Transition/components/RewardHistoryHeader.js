import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RewardHistoryHeader = () => {
  return (
    <View style={styles.headerRow}>
      <View style={[styles.headerCell, { width: '25%' }]}>
        <Text style={styles.headerText} numberOfLines={1} adjustsFontSizeToFit={true}>Tarikh</Text>
      </View>
      <View style={[styles.headerCell, { width: '25%' }]}>
        <Text style={styles.headerText} numberOfLines={1} adjustsFontSizeToFit={true}>Mata Diterima</Text>
      </View>
      <View style={[styles.headerCell, { width: '25%' }]}>
        <Text style={styles.headerText} numberOfLines={1} adjustsFontSizeToFit={true}>Mata Ditebus</Text>
      </View>
      <View style={[styles.headerCell, { width: '25%', borderRightWidth: 0 }]}>
        <Text style={styles.headerText} numberOfLines={1} adjustsFontSizeToFit={true}>Mata Luput</Text>
      </View>
    </View>
  );
};

export default RewardHistoryHeader;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: 'black',
    height: 36,
    alignItems: 'center',
    width: '100%',
  },
  headerCell: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: 'black',
    paddingHorizontal: 2,
  },
  headerText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 1,
  },
});
