import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, useColorScheme, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';
import {faCircleCheck} from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { LoginThunk } from '../../Services/LoginService/LoginSlice';
import { useFormik } from 'formik';


const UsernameChange = ({navigation}) => {
  const state = useSelector(state => state);  
  const { OTPData } = state.generateOTP;

    const dispatch = useDispatch()
    const [deviceId, setDeviceId] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const colorScheme = useColorScheme()
    const lightModeTextColor = 'grey';
    const darkModeTextColor = 'black';
    const textColor = colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
  
const handleShowId =()=>{
navigation.navigate('Login',)
}
    useEffect(() => {
      const fetchDeviceId = async () => {
        const id = await DeviceInfo.getUniqueId();
        setDeviceId(id);
      };
      fetchDeviceId();
    }, [])
    const handleLogin = async (valuesLogin,resetFormLogin)=>{
      if (OTPData?.APILoginID !== "" && valuesLogin.kataLaluan != "") {
        const payload = {
          ApLoginID: OTPData?.APILoginID,
          ApPwd: valuesLogin.kataLaluan,
          DevID: deviceId,
        };
      
        const response = dispatch(LoginThunk({payload,resetFormLogin}));
    
      }else if (OTPData?.APILoginID &&  valuesLogin.kataLaluan == "" || OTPData?.APILoginID == "" &&  valuesLogin.kataLaluan || OTPData?.APILoginID == "" &&  valuesLogin.kataLaluan =="" ){
        Alert.alert('Id dan Kata Laluan tidak sepadan');
      }
    }

    const {
      handleChange: handleChangeLogin,
      values: valuesLogin,
      handleBlur: handleBlurLogin,
      resetForm: resetFormLogin,
      errors: errorsLogin,
      touched: touchedLogin,
      handleSubmit: handleSubmitLogin,
    } = useFormik({
      initialValues: { kataLaluan: ''},
      onSubmit: valuesLogin => handleLogin(valuesLogin, resetFormLogin),
    });
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: '7%', justifyContent: 'center' }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          size={25}
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    </View>
    <View style={{ height: 50, width: '95%', marginHorizontal: '3%' }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold',color:textColor }}>Tetapkan Id Pengguna</Text>
    </View>
    <View style={{height:100,alignItems:'flex-start',justifyContent:'space-around',width:'95%',marginHorizontal:'5%'}}>
    <Text style={{alignItems:'flex-start',color:textColor}}>Id Pengguna</Text>
    <View   style={styles.inputContainer}>
    <FontAwesomeIcon
                  icon={faUser}
                  size={24}
                  color="black"
                  style={styles.icon}
                />
              <TextInput
                style={{...styles.textInput,color:textColor}}
                name="idPengguna"
                value={OTPData?.APILoginID}
                placeholderTextColor="#000"
                editable={false}
              />
             
            </View>
            {/* <Text style={{alignItems:'flex-start',color:textColor}}>Kata Laluan</Text>
            <View   style={styles.inputContainer}>
              <TextInput
                style={{...styles.textInput,color:textColor}}
                name="kataLaluan "
                onChangeText={handleChangeLogin('kataLaluan')}
                onBlur={handleBlurLogin('kataLaluan')}
                value={valuesLogin.kataLaluan}
                placeholderTextColor="#000"
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.iconContainer}>
                <FontAwesomeIcon
                  icon={passwordVisible ? faEye : faEyeSlash}
                  size={24}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View> */}
    </View>
    <View style={{height:'50%',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={styles.loginBtn} 
            // onPress={handleSubmitLogin}
            onPress={handleShowId}
            >
              <Text style={styles.loginText}>Set Semula</Text>
            </TouchableOpacity>
            </View>
  </SafeAreaView>
  )
}

export default UsernameChange

const styles = StyleSheet.create({
    inputContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        paddingHorizontal: 10,
      },
      textInput: {
        flex: 1,
        height: 50,
      },
      icon: {
        marginRight: 10,
      },
      loginBtn: {
        width: '75%',
        borderRadius: 5,
        marginVertical: '3%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#292A60',
      },
      loginText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18,
      },
      modalContainer: {
        height:'50%',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'lightgrey',
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      },
})