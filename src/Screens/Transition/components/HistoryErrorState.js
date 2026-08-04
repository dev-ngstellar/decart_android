import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HistoryErrorState = ({ errorMessage, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{errorMessage || "Unable to load history."}</Text>
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HistoryErrorState;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 15,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    fontWeight: '600',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#292A60',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
