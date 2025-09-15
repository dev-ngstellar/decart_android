import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import backdrop from '../Assets/LOGO/backdrop.jpg'
import {ActivityIndicator} from 'react-native-paper';

const Loader = () => {
  return (
    <View style={styles.container}>
<View style={styles.imageContainer}>
          <ActivityIndicator animating={true} color={'#292A60'} size={60} />
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    opacity: 0.7,
    position: 'absolute',
    width: '100%',
    zIndex: 99999,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '5%',
  },
  logo: {
    width: 166,
    height: 94,
  },
});
