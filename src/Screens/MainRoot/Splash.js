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
import {getData} from '../../Utils/localHelper';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { DeviceLogThunk, GetDeviceLogThunk } from '../../Services/DeviceLogService/DeviceSlice';


const Splash = ({navigation}) => {
  const [deviceId, setDeviceId] = useState("");

  const dispatch = useDispatch();
 

  const state = useSelector(state => state);
  const {DeviceLogData} = state.deviceLog;
 

  const fetchDeviceId = async () => {
    const id = await DeviceInfo.getUniqueId();
    setDeviceId(id);
  };
  
  const navigate = async () => {
    const token = await getData("token");
    if (token) {
      navigation.push("Main");
    } else {
      navigation.navigate("Login");
    }
  };


  const getDeviceLog = async () => {
    const payload = {
      DevID: deviceId,
    };
   await dispatch(DeviceLogThunk({payload}));
  };
   useEffect(() => {
      setTimeout(() => {
        navigate()
      }, 2000);
    }, []);

  useEffect(() => {
    fetchDeviceId();
  }, []);

  useEffect(()=>{
    getDeviceLog()
  },[])
  


  
  
  

  

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.iconContainer}>
      
      </View>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={{justifyContent:"flex-end",alignItems:'flex-end',marginRight:20}}>
        <Text style={{color:'red'}}>*Powered by PERNAMA</Text>
        <Text style={{color:'red',}}>v1.3</Text>

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
