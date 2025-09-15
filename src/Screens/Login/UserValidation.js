import React, { useEffect, useRef, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

const UserValidation = ({ navigation, route }) => {
  const { payload } = route.params;
  const [email, setEmail] = useState('');
  const intervalRef = useRef(null);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = Array(6).fill(0).map(() => useRef(null));
  const [countdown, setCountdown] = useState(180);
  const OTP = otp.join("");

  useEffect(() => {
    if (payload.CustEmail === "") {
      setEmail(payload.CustPhoneNo);
    } else {
      setEmail(payload.CustEmail);
    }
  }, [payload]);

  const OTPData = useSelector(
    state => state.generateOTP.OTPData,
  );
 
  const colorScheme = useColorScheme();
  const lightModeTextColor = 'grey';
  const darkModeTextColor = 'black';
  const textColor = colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;

  const verifyOtp = async () => {
    if (OTP === OTPData?.OTPValue) {
      clearInterval(intervalRef.current); // Clear the interval
      navigation.navigate('usernameChange');
    } else {
      Alert.alert("OTP tidak sah");
    }
  };

  useEffect(() => {
    if (OTP.length === 6) {
      verifyOtp();
    }
  }, [OTP]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (countdown > 0) {
        setCountdown(prevCountdown => prevCountdown - 1);
      } else if (countdown === 0) {
        clearInterval(intervalRef.current);
        navigation.navigate("Login");
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [countdown, navigation]);

  const handleOtpChange = (index, text) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < 5) {
      inputs[index + 1].current.focus();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 50, justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faChevronLeft} size={25} style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>
      <View style={{ height: 100, width: '95%', marginHorizontal: '3%' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: textColor }}>Pengesahan</Text>
        <Text style={{ fontSize: 16, color: textColor, marginTop: 10 }}>Masukkan kod 6 digit yang dihantar ke</Text>
        <Text style={{ fontSize: 16, color: textColor }}>{email}</Text>
      </View>
      <View style={{ height: '30%', marginTop: 10 }}>
        <View style={{ height: '50%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          {inputs.map((inputRef, index) => (
            <TextInput
              key={index}
              ref={inputRef}
              style={{ ...styles.otpInput, color: textColor }}
              value={otp[index]}
              onChangeText={(text) => handleOtpChange(index, text)}
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

export default UserValidation;

const styles = StyleSheet.create({
  otpInput: {
    width: 50,
    height: 65,
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 0.5,
    borderRadius: 5,
  },
});
