import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import BottomTabBarNavigator from '../../component/BottomTabBarNavigator';
import { Divider, Modal, PaperProvider, Portal } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck, faClose } from '@fortawesome/free-solid-svg-icons';

import logo2 from '../../Assets/Waterwark.png';
import logo3 from '../../Assets/logo-16.png';
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux';
import { GetCustomerProfileThunk } from '../../Services/GetCustomerProfile/CustomerProfileSlice';
import { getData } from '../../Utils/localHelper';
import QRCode from 'react-native-qrcode-svg';
import { TOTP } from '../../Utils/totp';

const Main = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { ProfileData } = state.getCustomerProfile;
  const { loginData } = state.login;
  const CustGUID = ProfileData[0]?.MemberGUID;
  const [isModalVisible, setModalVisible] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [timestamp, setTimestamp] = useState(Date.now());
  const [countdown, setCountdown] = useState(10);
  const profileImage = useSelector(state => state.login.profileImage);
  const backendTotpMs = loginData?.TOTPSeconds;
  const periodSeconds = useMemo(() => {
    const ms = typeof backendTotpMs === 'number' ? backendTotpMs : 30000;
    const seconds = Math.floor(ms / 1000); 
    return seconds > 0 ? seconds : 30;
  }, [backendTotpMs]);
  const totp = useMemo(() => new TOTP(periodSeconds), [periodSeconds]);
  const secret = "JBSWY3DPEHPK3PXP";

  const colorScheme = useColorScheme();

  const lightModeTextColor = 'grey';
  const darkModeTextColor = 'black';
  const textColor =
    colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;

  const getCustomerProfile = async () => {
    const custId = await getData('CustId');
    const payload = {
      CustId: custId,
      SerNo: '',
      CustName: '',
      cIC: '',
    };
    console.log("Main - Customer Profile Payload:", payload);
    const response = await dispatch(GetCustomerProfileThunk({ payload }));
  };

  const hide = () => setModalVisible(false);
  const containerStyle = {
    backgroundColor: '#fff',
    height: 400,
    width: '90%',
    marginHorizontal: '5%',
  };

  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
    };
    fetchDeviceId();
    getCustomerProfile();
  }, []);

  useEffect(() => {
    let intervalId;
    if (isModalVisible) {
      const generateTotp = () => {
        const newTimestamp = Date.now();
        const newTotpCode = totp.getOtp(secret, newTimestamp).toString();
        setTimestamp(newTimestamp);
        setTotpCode(newTotpCode);
        setCountdown(periodSeconds);
      };

      generateTotp(); 

      intervalId = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown === 1) {
            generateTotp();
            return periodSeconds;
          }
          return prevCountdown - 1;
        });
      }, 1000); 
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId); 
      }
    };
  }, [isModalVisible, periodSeconds]);

  const renderQRCode = () => {
    const data = {
      member_id: CustGUID,
      totp: totpCode,
      time_period: loginData?.TOTPSeconds,
      current_time: timestamp
    };

    return (
      <View style={{ alignItems: 'center' }}>
        <QRCode value={JSON.stringify(data)} size={200} />
        <Text style={styles.countdownText}>
          TOTP expires in: {countdown} seconds
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaperProvider>
        <Portal>
          <Modal
            visible={isModalVisible}
            contentContainerStyle={containerStyle}>
            <View style={{ height: '100%', width: '100%' }}>
              <View
                style={{
                  height: 60,
                  backgroundColor: '#292A60',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity onPress={hide}>
                  <FontAwesomeIcon icon={faClose} size={20} color="#fff" />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 12,
                    width: '80%',
                    marginLeft: '5%',
                  }}>
                  *Tunjukkan ini kepada juruwang setiap kali anda membuat pembayaran untuk mendapatkan “mata ganjaran” PERNAMA
                </Text>
              </View>
              <View
                style={{
                  height: '10%',
                  backgroundColor: 'lightgrey',
                  width: '95%',
                  marginTop: 10,
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginHorizontal: '3%',
                }}>
                <Image
                  source={profileImage ? { uri: profileImage } : logo2}
                  style={{
                    height: 40,
                    width: 50,
                    marginLeft: '10%',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: '10%',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: '#292A60',
                    }}>
                    {ProfileData && ProfileData[0]?.LoginID}
                  </Text>
                </View>
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
                  height: '65%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {renderQRCode()}
              </View>
            </View>
          </Modal>
        </Portal>
        <BottomTabBarNavigator setModalVisible={setModalVisible} />
      </PaperProvider>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  countdownText: {
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },
});
