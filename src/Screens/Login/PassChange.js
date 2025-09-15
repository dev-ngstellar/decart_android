import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, useColorScheme, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {faCircleCheck} from '@fortawesome/free-regular-svg-icons';
import * as yup from 'yup'
import { useFormik } from 'formik'
import { ForgetPassThunk } from '../../Services/ForgetPassWordService/ForgetPassSlice';
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux';


const validationSchema = yup.object().shape({
  KataLaluanBaru: yup
    .string()
    .min(8, ({ min }) => `*Sekurang-kurangnya mempunyai ${min} aksara`)
    .max(12, ({ max }) => `*Kata Laluan tidak melebihi ${max} aksara`)
    .matches(/[A-Z]/, '*Gabungan huruf besar dan huruf kecil')
    .matches(/[0-9]/, '*Sekurang-kurangnya mempunyai 1 angka')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      '*Sekurang-kurangnya 1 karakter istimewa (@, $, #, !, &, *)',
    )
    .required('*Kata Laluan tidak lengkap'),
  UlangKataLaluan: yup
    .string()
    .required('*Kata Laluan diperlukan')
    .test('passwords-match', '*Kata Laluan tidak tepat', function (value) {
      return value === this.parent.KataLaluanBaru;
    })
});

const PassChange = ({navigation}) => {
  const state = useSelector(state => state);  
    const { OTPData } = state.generateOTP;

  const dispatch = useDispatch()
  const [deviceId, setDeviceId] = useState("");
    const [passwordVisible1, setPasswordVisible1] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const colorScheme = useColorScheme()
  const lightModeTextColor = 'grey';
  const darkModeTextColor = 'black';
  const textColor = colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;

  const {values,errors,touched,handleBlur,handleChange,resetForm,handleSubmit} = useFormik({
    initialValues: {
      KataLaluanBaru: '',
      UlangKataLaluan: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => handleChangePass(values,resetForm),
  });

  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
    };
    fetchDeviceId();
  }, [])

  const handleChangePass = async(values,resetForm)=>{
    const payload = {
      CustID:OTPData?.CustId,
      APILoginID:OTPData?.APILoginID,
      NewPassword:values.UlangKataLaluan,
      DevID:deviceId
    }
    
    const response = await dispatch(ForgetPassThunk({ payload,resetForm }))
    if(response && response.payload.APIResultID ==1){
      setShowModal(true)
    }else{
      Alert.alert(
        "",
        response.payload.APIResult,
        [
          { text: "OK", onPress: () => navigation.navigate('Login') }
        ]
      );
    }
   
  }

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
    <View style={{ height: 100, width: '95%', marginHorizontal: '3%' }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold',color:textColor }}>Terlupa Kata Laluan</Text>
    </View>
    <View style={{height:200,alignItems:'flex-start',justifyContent:'space-around',width:'95%',marginHorizontal:'5%'}}>
    <Text style={{marginTop:10,alignItems:'flex-start',color:textColor}}>Kata Laluan Baru</Text>
    <View   style={styles.inputContainer}>
              <TextInput
                style={{...styles.textInput,color:textColor}}
                name="KataLaluanBaru"
                placeholder=""
                placeholderTextColor="#000"
                secureTextEntry={!passwordVisible1}
                onChangeText={handleChange('KataLaluanBaru')}
                onBlur={handleBlur('KataLaluanBaru')}
                value={values.KataLaluanBaru}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible1(!passwordVisible1)}
                style={styles.iconContainer}>
                <FontAwesomeIcon
                  icon={passwordVisible1 ? faEye : faEyeSlash}
                  size={24}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.yup}>
                {errors?.KataLaluanBaru &&
                  touched?.KataLaluanBaru &&
                  errors.KataLaluanBaru}
              </Text>
            <Text style={{marginTop:10,alignItems:'flex-start',color:textColor}}>Mengesahkan Kata Laluan</Text>
            <View   style={styles.inputContainer}>
              <TextInput
                 style={{...styles.textInput,color:textColor}}
                name="UlangKataLaluan"
                placeholder=""
                placeholderTextColor="#000"
                secureTextEntry={!passwordVisible2}
                onChangeText={handleChange('UlangKataLaluan')}
                onBlur={handleBlur('UlangKataLaluan')}
                value={values.UlangKataLaluan}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible2(!passwordVisible2)}
                style={styles.iconContainer}>
                <FontAwesomeIcon
                  icon={passwordVisible2 ? faEye : faEyeSlash}
                  size={24}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.yup}>
                {errors?.UlangKataLaluan &&
                  touched?.UlangKataLaluan &&
                  errors.UlangKataLaluan}
              </Text>
    </View>
    <View style={{height:'50%',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
              <Text style={styles.loginText}>Set Semula</Text>
            </TouchableOpacity>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={showModal}
            >
              <View style={styles.modalContainer}>
                <View style={{height:'15%'}}>
                    <FontAwesomeIcon icon={faCircleCheck} size={35} color='#292A60'/>
                </View>
                <View style={{ height:'40%', width: '95%', marginHorizontal: '3%',justifyContent:'space-around'}}>
      <Text style={{ fontSize: 20, fontWeight: 'bold',color:textColor }}>Kata Laluan ditukar</Text>
      <Text style={{ fontSize: 16,color:textColor}}>Penukaran Kata Laluan telah berjaya. Kembali ke “Log Masuk” </Text>
    </View>
    <View style={{height:"40%",alignItems:"center",justifyContent:"center"}}>
<TouchableOpacity style={styles.loginBtn} onPress={()=>{navigation.navigate("Login")}}>
  <Text  style={styles.loginText}>Kembali ke Log Masuk</Text>
</TouchableOpacity>
    </View>
              </View>
            </Modal>
  </SafeAreaView>
  )
}

export default PassChange

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
      yup: {
        fontSize: 14,
        color: 'red',
        textAlign: 'right',
      },
})
