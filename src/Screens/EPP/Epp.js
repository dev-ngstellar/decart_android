import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../component/Header';
import logo1 from '../../Assets/semakan-baki.png';
import Logo from '../../Assets/LOGO/waterma.png';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../Utils/localHelper';
import { GetBakiThunk } from '../../Services/BakiEppService/GetBakiSlice';
import DeviceInfo from 'react-native-device-info';
import backdrop from '../../Assets/LOGO/backdrop.jpg'
import Loader from '../../component/Loader';
const Epp = ({navigation}) => {
  const dispatch = useDispatch()
  const state = useSelector(state => state);
  const isLoader = useSelector(state => state.login.isLoader);
  const {GetBakiData} = state.getBaki
 
  const [deviceId, setDeviceId] = useState("");

  
  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
    };
    fetchDeviceId();
  }, [])
  const getBaki = async () => {
    const custId=await getData("CustId")
  
    const payload = {
      CustID: custId,
      DevID: deviceId,
    };
    await dispatch(GetBakiThunk({payload}));
  };
  useEffect(()=>{
    getBaki()
  },[])
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header Screen="EPP" />
      {isLoader && <Loader />}
      <ImageBackground source={backdrop} style={{height:'100%'}}>
      <View
        style={{
          height: '15%',
          width: '95%',
          marginHorizontal: '3%',
          marginTop: 20,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: '100%',
            backgroundColor: '#292A60',
            height: '50%',
            borderRadius: 5,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
          }}
         
          onPress={() => {
            navigation.navigate('EppStatus');
          }}
          >
          <Image source={logo1} style={{height: 50, width: 55}} />
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
            SEMAKAN BAKI EPP
          </Text>
        </TouchableOpacity>
      </View> 
      </ImageBackground>      
    </SafeAreaView>
  );
};

export default Epp;

const styles = StyleSheet.create({
});
