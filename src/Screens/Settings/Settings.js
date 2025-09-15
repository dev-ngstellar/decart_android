import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../component/Header';

import logo3 from '../../Assets/LOGO/pencil.png';
import logo4 from '../../Assets/LOGO/fam.png';
import logo5 from '../../Assets/LOGO/lock.png';
import logo10 from '../../Assets/Waterwark.png';

import {Divider} from 'react-native-paper';

import {clearData, getData} from '../../Utils/localHelper';
import { useDispatch, useSelector} from 'react-redux';
import backdrop from '../../Assets/LOGO/backdrop.jpg'
import { GetFamilyProfileThunk } from '../../Services/GetFamilyProfileService/GetFamilySlice';
import DeviceInfo from 'react-native-device-info';
import Loader from '../../component/Loader';


const Settings = ({navigation}) => {
  const dispatch = useDispatch()
  const isLoader = useSelector(state => state.login.isLoader);
 const GetFamilyProfileData = useSelector(state=>state.getFamilyProfile.GetFamilyProfileData);
  const ProfileData = useSelector(
    state => state.getCustomerProfile.ProfileData,
  );
  const [deviceId, setDeviceId] = useState("");
  const profileImage = useSelector(state => state.login.profileImage);
  const Confirm = async () => {
    try {
      await clearData();
      navigation.navigate('Login');
      BackHandler.exitApp();
    } catch (error) {
      console.log(error);
    }
  };
 
  const handleLogout = () => {
    Alert.alert('Daftar Keluar', 'Adakah anda pasti untuk keluar dari aplikasi ini?', [
      {text: 'YA', onPress: () => Confirm()},
      {
        text: 'TIDAK',
        onPress: () => null,
        style: 'cancel',
      },
      
    ]);
  };

  
  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
    };
    fetchDeviceId();
  }, [])

      const getFamily = async ()=>{
        const custId=await getData("CustId")
  const payload = {
  CustId:custId,
  DevID:deviceId}
 await dispatch(GetFamilyProfileThunk({payload}))

      }

      useEffect(()=>{
        getFamily()
      },[deviceId])
  //pic selection

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoader && <Loader />}
      <Header Screen="Akaun" />
      <ImageBackground source={backdrop} style={{height:'100%'}}>
      <View style={{height: '90%', width: '95%', marginHorizontal: '3%'}}>
        <View
          style={{
            height: '20%',
            width: '100%',
            marginTop: 10,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <Image
              source={profileImage ? {uri: profileImage} : logo10}
              style={{height: 100, width: 130}}
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#292A60',
              marginRight: 10,
            }}>
            {ProfileData?.[0]?.CustName}
          </Text>
        </View>
        <Divider
          style={{
            borderBottomWidth: 2,
            borderColor: 'lightgrey',
            width: '95%',
            marginHorizontal: '3%',
            marginTop: 10,
          }}
        />
        <View
          style={{
            height: '35%',
            width: '100%',
            borderRadius: 10,
            marginTop: 10,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: '20%',
              backgroundColor: '#292A60',
              width: '100%',
              marginTop: 20,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <Text style={{fontSize: 16, color: 'white', marginLeft: 10}}>
              Kemaskini Profil
            </Text>
            <Image
              source={logo3}
              style={{height: 40, width: 40, marginRight: 15}}
            />
          </TouchableOpacity>
       
          <TouchableOpacity
            style={{
              height: '20%',
              backgroundColor: '#292A60',
              width: '100%',
              marginTop: 20,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
            onPress={() => {
              navigation.navigate('PasswordChange');
            }}>
            <Text style={{fontSize: 16, color: 'white', marginLeft: 10}}>
              Ubah Kata Laluan
            </Text>
            <Image
              source={logo5}
              style={{height: 40, width: 40, marginRight: 15}}
            />
          </TouchableOpacity>
          {ProfileData[0]?.ATM_YN !== 0 && GetFamilyProfileData?.length < 2 &&  
        <TouchableOpacity
            style={{
              height: '20%',
              backgroundColor: '#292A60',
              width: '100%',
              marginTop: 20,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
            onPress={() => {
              navigation.navigate('Family');
            }}>
            <Text style={{fontSize: 16, color: 'white', marginLeft: 10}}>
              Kemaskini Butiran Keluarga
            </Text>
            <Image
              source={logo4}
              style={{height: 40, width: 40, marginRight: 15}}
            />
          </TouchableOpacity>
          }
       
      {ProfileData[0]?.ATM_YN !== 0 &&  GetFamilyProfileData.length >= 1 &&
       <TouchableOpacity
            style={{
              height: '20%',
              backgroundColor: '#292A60',
              width: '100%',
              marginTop: 20,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
            onPress={() => {
              navigation.navigate('ViewFamilyDetails');
            }}>
            <Text style={{fontSize: 16, color: 'white', marginLeft: 10}}>
             Butiran Keluarga
            </Text>
            <Image
              source={logo4}
              style={{height: 40, width: 40, marginRight: 15}}
            />
          </TouchableOpacity>
           } 
          
        </View>

        <View style={{height: '35%', justifyContent: 'flex-end'}}>
          <TouchableOpacity
            style={{
              height: '25%',
              backgroundColor: '#292A60',
              width: '100%',
              marginTop: 20,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleLogout}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
              Daftar Keluar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </ImageBackground> 
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  minicontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  item: {
    width: '30%',
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    height: 80,
    width: '100%',
    resizeMode: 'contain',
  },
  cardTitleText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: '4%',
  },
  divider: {
    borderBottomColor: '#0088FE',
    borderWidth: 0.5,
  },
  containerStyle: {
    width: '80%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '10%',
    height: 'auto',
    borderRadius: 10,
  },
});
