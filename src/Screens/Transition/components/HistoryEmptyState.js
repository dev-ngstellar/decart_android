import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HistoryEmptyState = ({ message = 'Tiada maklumat mata luput' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default HistoryEmptyState;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 15,
    elevation: 1,
  },
  text: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '600',
  },
});
