import { useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';

const UseBackHandler = (isActive) => {
    useEffect(() => {
        if (!isActive) return;
    
        const backAction = () => {
          Alert.alert('Daftar Keluar', 'Adakah anda pasti untuk keluar dari aplikasi ini?', [
            { text: 'YA', onPress: () => BackHandler.exitApp() },
            {
              text: 'TIDAK',
              onPress: () => null,
              style: 'cancel',
            },
           
          ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
      }, [isActive]);
}

export default UseBackHandler
