import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RewardHistoryHeader = () => {
  return (
    <View style={styles.headerRow}>
      <View style={[styles.headerCell, { width: '50%' }]}>
        <Text style={styles.headerText} numberOfLines={1} adjustsFontSizeToFit>
          Tarikh Luput
        </Text>
      </View>
      <View style={[styles.headerCell, { width: '50%', borderRightWidth: 0 }]}>
        <Text style={styles.headerText} numberOfLines={1} adjustsFontSizeToFit>
          Baki Mata
        </Text>
      </View>
    </View>
  );
};

export default RewardHistoryHeader;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
    height: 44,
    alignItems: 'center',
    width: '100%',
  },
  headerCell: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: '#000000',
    paddingHorizontal: 4,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
});


