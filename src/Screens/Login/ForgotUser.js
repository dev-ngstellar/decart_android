import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useColorScheme,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
  import {faChevronLeft, faUser} from '@fortawesome/free-solid-svg-icons';
  import * as yup from 'yup';
import {useFormik} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { GenerateOTPThunk } from '../../Services/GenerateOTPService/GenerateOTPSlice';
import Loader from '../../component/Loader';
import DeviceInfo from 'react-native-device-info';

const ValidationSchema = yup.object().shape({
  noTelefon:yup.string().required('*No Telefon / E-mel diperlukan').min(10,'Sila masukkan E-mel / No Telefon yang sah')
});

const ForgotUser = ({navigation}) => {
  
   
  const dispatch=useDispatch()
  const [payload, setPayload] = useState({});
  const [deviceId, setDeviceId] = useState("");
  const isLoader = useSelector(state => state.login.isLoader);
  const colorScheme = useColorScheme()
  const lightModeTextColor = 'grey';
  const darkModeTextColor = 'black';
  const textColor = colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;

  const {
    handleSubmit,
    handleChange,
    values,
    handleBlur,
    resetForm,
    errors,
    touched,
  } = useFormik({
    initialValues: {noTelefon:""},
    validationSchema: ValidationSchema,
    onSubmit: values => Forgotpassword(values),
  });


const checkPayload = async (noTelefon) => {
  const emailPattern = /\S+@\S+\.\S+/;
  if (emailPattern.test(noTelefon)) {
            setPayload({
                CustId: 0,
                CustPhoneNo: "",
                CustEmail: noTelefon,
                DevID:deviceId
            })
           
          }else {
                    setPayload({
                        CustId: 0,
                        CustEmail: "",
                        CustPhoneNo: noTelefon,
                        DevID:deviceId
                    });
                   
                }
};


  const Forgotpassword = async()=>{  
    console.log('otpPayload',payload)
    const response=await dispatch(GenerateOTPThunk({payload})); 
    console.log('otp response:',response) 
    if (response && response.payload.CustID !=0) {
      resetForm()
   navigation.navigate("userValidation",{payload})
    } else{
      resetForm()
      navigation.navigate("Login")
    Alert.alert("Sila masukkan E-mel / No Telefon yang sah")
    }
  }
  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
    };
    fetchDeviceId();
  }, [])
  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoader && <Loader/>}
    <View style={{height: '7%',justifyContent:'center'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <FontAwesomeIcon icon={faChevronLeft} size={25} style={{marginLeft:10}}/>
      </TouchableOpacity>
    </View>
    <View style={{height: 100,width:'95%',marginHorizontal:'3%'}}>
      <Text style={{fontSize: 24, fontWeight: 'bold',color:textColor}}>Terlupa Id Pengguna?</Text>
      <Text style={{fontSize:16,color:textColor,marginTop:10}}>Masukkan no telefon atau e-mel dan kami akan menghantar kod
tetapkan semula kata laluan anda</Text>
    </View>
    <View style={{height:150,justifyContent:'flex-start'}}>
      <Text style={{marginLeft:25, color:textColor}}>No Telefon / E-mel</Text>
      <View style={styles.inputContainer}>
      <FontAwesomeIcon
                icon={faUser}
                size={24}
                color="black"
                style={styles.icon}
              />
              <TextInput
                style={{...styles.textInput,color:textColor}}
                name="noTelefon"
                placeholder=""
                placeholderTextColor="#000"
                value={values.noTelefon}
                // onChangeText={handleChange('noTelefon')}
                // // onBlur={handleBlur('noTelefon')}
                // onBlur={(e) => {
                //   handleBlur('username')(e);
                //   checkPayload(values.noTelefon); // Check username on blur
                // }}
                onChangeText={(text) => {
                  handleChange('noTelefon')(text);
                  checkPayload(text); // Check username on change
                }}
                onBlur={handleBlur('noTelefon')}
              />
            </View>
            <Text style={styles.yup}>
              {errors?.noTelefon &&
                touched?.noTelefon &&
                errors.noTelefon
                }
               
            </Text>
            </View>
            <View style={{height:'50%',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
            {/* <TouchableOpacity style={styles.loginBtn} onPress={()=>{ navigation.navigate("Validation")}}> */}
              <Text style={styles.loginText}>Mengesahkan</Text>
            </TouchableOpacity>
            </View>
  </SafeAreaView>
  )
}

export default ForgotUser

const styles = StyleSheet.create({
    inputContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        marginHorizontal:'5%',
        paddingHorizontal: 10,
        marginTop:5
      },
      icon: {
        marginRight: 10,
      },
      textInput: {
        flex: 1,
        height: 50,
      },
      loginBtn: {
        width: '50%',
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
      yup: {
        fontSize: 14,
        color: 'red',
        fontWeight: '600',
        textAlign:'right',
        marginRight:20
      },
})