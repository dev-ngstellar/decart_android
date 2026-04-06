import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import logo from '../../Assets/logo-1.png';
import {getData, clearData} from '../../Utils/localHelper';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { DeviceLogThunk, GetDeviceLogThunk } from '../../Services/DeviceLogService/DeviceSlice';
import { APP_VERSION } from '../Dashboard/Dashboard';

import { DeviceLogApi } from '../../Services/DeviceLogService/DeviceApi';
import { Alert } from 'react-native';

const Splash = ({navigation}) => {
  const [deviceId, setDeviceId] = useState("");
  const dispatch = useDispatch();

  const navigate = async () => {
    try {
      const token = await getData("token");
      if (!token) {
        navigation.navigate("Login");
        return;
      }

      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
      
      const payload = { DevID: id };
      
      // Call API directly to avoid double '.data' bug in Redux Thunk
      const response = await DeviceLogApi(payload);
      
      console.log("DeviceLog Response:", JSON.stringify(response));
      // Alert.alert("Debug API Response", JSON.stringify(response));

      // If backend uses ApiResultID == 2 for device mismatch like LoginApi
      // (or if it sends a specific 'log masuk' message)
      if (response && (response.ApiResultID === 2 || response.ApiResultID === -1 || response.ApiResultID === 0 || (response.DeviceMsg && response.DeviceMsg.toLowerCase().includes("log masuk")))) {
         await clearData();
         navigation.navigate("Login");
         return;
      }
      
      navigation.push("Main");
    } catch (e) {
      console.log("Splash Validation Error:", e);
      // Let it go to Main so offline users don't get kicked out, unless error is 401
      navigation.push("Main");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      navigate();
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.iconContainer}>
      
      </View>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={{justifyContent:"flex-end",alignItems:'flex-end',marginRight:20}}>
        <Text style={{color:'red'}}>*Powered by PERNAMA</Text>
        <Text style={{ color: 'red' }}>v{APP_VERSION} </Text>

      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageContainer: {
    height: '87%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 275,
    height: 200,
  },
  iconContainer: {
    height: '7%',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  icon: {
    padding: 5,
    borderWidth: 2.5,
    borderRadius: 100,
    borderColor: '#292A60',
    marginRight: 10,
  },
});
