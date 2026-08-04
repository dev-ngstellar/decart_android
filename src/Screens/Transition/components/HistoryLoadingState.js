import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const HistoryLoadingState = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#292A60" />
      <Text style={styles.text}>Memuatkan Sejarah...</Text>
    </View>
  );
};

export default HistoryLoadingState;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: 'center',
    justify: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
    fontWeight: '500',
  },
});
