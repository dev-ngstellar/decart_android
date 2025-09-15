import React, { useEffect, useRef, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

const Validation = ({ navigation, route }) => {
  const { payload } = route.params;
const [email, setEmail] = useState('');
useEffect(() => {
  if (payload.CustEmail === "") {
    setEmail(payload.CustPhoneNo);
  } else {
    setEmail(payload.CustEmail);
  }
}, [payload]);

  const state = useSelector(state => state);  
  const { OTPData } = state.generateOTP;


  const colorScheme = useColorScheme();
  const lightModeTextColor = 'grey';
  const darkModeTextColor = 'black';
  const textColor = colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;

  const dispatch = useDispatch();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = Array(6).fill(0).map(() => useRef(null));
  const [countdown, setCountdown] = useState(180);
  const OTP = otp.join("");


  const verifyOtp = async () => {

    if (OTP === OTPData?.OTPValue) {
      navigation.navigate('PasswordChange');
    } else {
      Alert.alert("OTP tidak sah");
    }
  };
  
useEffect(()=>{
  if(OTP.length==6){
    verifyOtp()
  }
},[OTP])
  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else if (countdown === 0) {
        navigation.navigate("Login");
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const handleOtpChange = (index, text) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
   

    if (text.length === 1 && index < 5) {
      inputs[index + 1].current.focus();
    }
  };

  // const handleOtpChange = (index, text) => {
  //   let newOtp = otp.split('');
  //   newOtp[index] = text;
  //   newOtp = newOtp.join('');
  //   setOtp(newOtp);

  //   if (text.length === 1 && index < 5) {
  //     inputs[index + 1].current.focus();
  //   }

  //   if (newOtp.length === 6) {
  //     verifyOtp(newOtp);
  //   }
  // };
// useEffect(()=>{
// if(OTP.length)
// },[])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height:50, justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faChevronLeft} size={25} style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>
      <View style={{ height: 100, width: '95%', marginHorizontal: '3%' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: textColor }}>Pengesahan</Text>
        <Text style={{ fontSize: 16, color: textColor }}>Masukkan kod 6 digit yang dihantar ke</Text>
        <Text style={{ fontSize: 16, color: textColor }}>{email}</Text>
      </View>
      <View style={{ height: '30%' }}>
        <View style={{ height: '50%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          {inputs.map((inputRef, index) => (
            <TextInput
              key={index}
              ref={inputRef}
              style={{ ...styles.otpInput, color: textColor }}
              value={otp[index]}
              onChangeText={(text) => handleOtpChange(index, text)}
              // onBlur={verifyOtp}
              maxLength={1}
              keyboardType="numeric"
            />
          ))}
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: textColor }}>Hantar Semula: <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{countdown}s</Text></Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Validation;

const styles = StyleSheet.create({
  otpInput: {
    width: 50,
    height: 65,
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 0.5, borderRadius: 5
  },
  modalContainer: {
    height: '40%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'lightgrey',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  loginBtn: {
    width: '75%',
    borderRadius: 5,
    marginVertical: '3%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#292A60',
    marginLeft: 25
  },
  loginText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 18,
  },
});
