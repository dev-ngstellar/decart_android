import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme, TextInput, ImageBackground, NativeModules } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import logo from '../../Assets/Waterwark.png'
import logo2 from '../../Assets/LOGO/ffa.png'
import { Dropdown } from 'react-native-element-dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../../Utils/localHelper'
import DeviceInfo from 'react-native-device-info'
import { UpdateFamilyThunk } from '../../Services/UpdateFamilyProfileService/UpdateFamilySlice'
import backdrop from '../../Assets/LOGO/backdrop.jpg'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { GetFamilyProfileThunk } from '../../Services/GetFamilyProfileService/GetFamilySlice'
import { CheckNewLoginIdThunk } from '../../Services/NewLoginIdService/NewLoginSlice'
import { CheckIcThunk } from '../../Services/CheckIcService/CheckIcSlice'
import { CheckEmailThunk } from '../../Services/CheckEmailService/CheckEmailSlice'
import { CheckPhoneThunk } from '../../Services/CheckPhoneService/CheckPhoneSlice'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const ValidationSchema = yup.object().shape({
  nama: yup.string().required('*Nama diperlukan'),
  email: yup
    .string()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "*Sila masukkan e-mel yang sah")
    .required('*E-mel diperlukan'),
  phone: yup
    .string()
    .matches(/^01\d{8,9}$/, '*No Telefon tidak sah')
    .min(10, '*No Telefon tidak sah')
    .max(11, '*No Telefon tidak sah')
    .required('*No Telefon diperlukan'),
  IC: yup
    .string()
    .matches(/^\d{12}$/, '*Kad Pengenalan tidak sah')
    .required('*Kad Pengenalan diperlukan'),
  username: yup
    .string()
    .min(6, ({ min }) => `*Id Pengguna sekurang-kurangnya mempunyai ${min} aksara`)
    .max(12, ({ max }) => `*Id Pengguna tidak melebihi ${max} aksara`)
    .required('*Id Pengguna (6-12 aksara)'),
  password: yup
    .string()
    .min(8, ({ min }) => `*Sekurang-kurangnya ${min} aksara`)
    .max(12, ({ max }) => `*Kata Laluan tidak melebihi ${max} aksara`)
    .matches(/[A-Z]/, '*Gabungan huruf besar dan huruf kecil')
    .matches(/[0-9]/, '*Sekurang-kurangnya mempunyai 1 angka')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      '*Sekurang-kurangnya 1 karakter Istimewa (@, $, #, !, &, *)',
    )
    .required('*Kata Laluan diperlukan')
});

const FamilsDetails = ({ navigation }) => {
  const dispatch = useDispatch()
  const { ProfileData } = useSelector(state => state.getCustomerProfile);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const [usernameBorderColor, setUsernameBorderColor] = useState('grey');
  const [ICBorderColor, setICBorderColor] = useState('grey');
  const [PhoneBorderColor, setPhoneBorderColor] = useState('grey');
  const [EmailBorderColor, setEmailBorderColor] = useState('grey');
  const [value1, setValue1] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);
  const colorScheme = useColorScheme();
  const lightModeTextColor = 'black';
  const darkModeTextColor = 'black';
  const textColor = colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;
  const Dropdown2 = [
    { label: 'Pasangan', value: 1 },
    { label: 'Anak', value: 2 },
  ];

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const CheckLogin = async (username) => {
    if (username) {
      const payload = { NewLoginID: username };
      const response = await dispatch(CheckNewLoginIdThunk({ payload }));

      if (response.payload.API_Result_ID === 1) {
        setUsernameBorderColor('green');
      } else {
        setUsernameBorderColor('red');
        Alert.alert(response.payload.API_Result)
        setFieldValue('username', "")
      }
    }

  };
  const CheckIC = async (IC) => {
    if (IC) {
      const payload = { Cust_IC_No: IC };
      const response = await dispatch(CheckIcThunk({ payload }));

      if (response.payload.API_Result_ID === 1) {
        setICBorderColor('green');
      } else {
        setICBorderColor('red');
        Alert.alert(response.payload.API_Result)
        setFieldValue('IC', "")
      }
    }

  };
  const CheckPhone = async (Phone) => {
    if (Phone) {
      const payload = { CustHPNo: Phone };
      const response = await dispatch(CheckPhoneThunk({ payload }));

      if (response.payload.API_Result_ID === 1) {
        setPhoneBorderColor('green');

      } else {
        setPhoneBorderColor('red')
        Alert.alert(response.payload.API_Result)
        setFieldValue('phone', "")
      }
    }

  };
  const CheckEmail = async (email) => {
    if (email) {
      const payload = { CustEmail: email };
      const response = await dispatch(CheckEmailThunk({ payload }));


      if (response.payload.API_Result_ID === 1) {
        setEmailBorderColor('green')

      } else {
        setEmailBorderColor('red')
        Alert.alert(response.payload.API_Result)
        setFieldValue('email', "")
      }
    }

  };


  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
    };
    fetchDeviceId();
  }, [])
  const handleFamilDetailsUpload = async () => {
    const custId = await getData("CustId")
    const payload = {
      FamilyID: 0,
      CustId: custId,
      FamilyName: values.nama,
      FamilyICNo: values.IC,
      FamilyTypeID: value1,
      FamilyEmail: values.email,
      FamilyHP: values.phone,
      FamilyStatusID: 1,
      DevID: deviceId,
      FamilyUserID: values.username,
      FamilyPwd: values.password
    }

    const response = await dispatch(UpdateFamilyThunk({ payload, resetForm }))
    if (response.payload[0].ResultMsg == "Success") {
      Alert.alert("",
        "Butiran Keluarga telah dikemaskini",
        [
          { text: "OK", onPress: () => navigation.navigate('Dashboard') }
        ]
      );
    } else {
      Alert.alert(
        "Gagal",
        response?.payload[0]?.ResultMsg,
        [
          { text: "OK", onPress: () => navigation.navigate('Dashboard') }
        ]
      )
    }
  }
  // useEffect(()=>{
  //   getFamily()
  // },[])

  const {
    handleChange,
    values,
    handleBlur,
    resetForm,
    errors,
    touched,
    handleSubmit,
    setFieldValue
  } = useFormik({
    initialValues: { nama: '', email: '', phone: '', IC: '', username: '', password: '' },
    validationSchema: ValidationSchema,
    onSubmit: values => handleFamilDetailsUpload(values, resetForm),
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header Screen="BUTIRAN KELUARGA" />
      <ImageBackground source={backdrop} style={{ height: '100%' }}>
        <ScrollView>
          <View style={{ height: 800 }}>
            <View style={{ height: 150, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Image source={logo} style={{ height: '80%', width: '40%' }} />
            </View>
            <View style={{ height: 470, width: '90%', marginHorizontal: '5%', justifyContent: 'space-between' }}>
              <TextInput
                style={{ ...styles.textInput, color: textColor }}
                name="nama"
                placeholder="Nama"
                placeholderTextColor="#000"
                onChangeText={handleChange('nama')}
                onBlur={handleBlur('nama')}
                value={values.nama}
              />
              <Text style={styles.yup}>
                {errors?.nama &&
                  touched?.nama &&
                  errors.nama}
              </Text>
              <Dropdown
                style={[styles.textInput, isFocus1]}
                placeholderStyle={{
                  ...styles.placeholderStyle,
                  color: textColor,
                }}
                selectedTextStyle={{
                  ...styles.placeholderStyle,
                  color: textColor,
                }}
                itemTextStyle={{ color: textColor }}
                data={Dropdown2}
                labelField="label"
                valueField="value"
                placeholder="Hubungan"
                value={value1}
                onFocus={() => setIsFocus1(true)}
                onBlur={() => setIsFocus1(false)}
                onChange={item => {
                  setValue1(item.value)
                  setIsFocus1(false);
                }}
              />
              <Text style={styles.yup}>
              </Text>
              <TextInput
                style={{ ...styles.textInput, color: textColor, borderColor: EmailBorderColor }}
                name="email"
                placeholder="E-mel"
                placeholderTextColor="#000"
                onChangeText={handleChange('email')}
                // onBlur={handleBlur('email')}
                value={values.email}
                onBlur={(e) => {
                  handleBlur('email')(e);
                  CheckEmail(values.email); // Check username on blur
                }}
              />
              <Text style={styles.yup}>
                {errors?.email &&
                  touched?.email &&
                  errors.email
                }

              </Text>
              <TextInput
                style={{ ...styles.textInput, color: textColor, borderColor: PhoneBorderColor }}
                name="phone"
                placeholder="No Telefon"
                placeholderTextColor="#000"
                onChangeText={handleChange('phone')}
                // onBlur={handleBlur('phone')}
                value={values.phone}
                onBlur={(e) => {
                  handleBlur('phone')(e);
                  CheckPhone(values.phone); // Check username on blur
                }}
              />
              <Text style={styles.yup}>
                {errors?.phone &&
                  touched?.phone &&
                  errors.phone}
              </Text>
              <TextInput
                style={{ ...styles.textInput, color: textColor, borderColor: ICBorderColor }}
                name="IC"
                placeholder="No Kad Pengenalan"
                placeholderTextColor="#000"
                onChangeText={handleChange('IC')}
                onBlur={(e) => {
                  handleBlur('IC')(e);
                  CheckIC(values.IC); // Check username on blur
                }}
                // onBlur={handleBlur('phone')}
                value={values.IC}
              />
              <Text style={styles.yup}>
                {errors?.IC &&
                  touched?.IC &&
                  errors.IC}
              </Text>
              <TextInput
                style={{ ...styles.textInput, color: textColor, borderColor: usernameBorderColor }}
                name="username"
                placeholder="Id Pengguna"
                placeholderTextColor="#000"
                onChangeText={handleChange('username')}
                onBlur={(e) => {
                  handleBlur('username')(e);
                  CheckLogin(values.username); // Check username on blur
                }}
                value={values.username}
              />
              <Text style={styles.yup}>
                {errors?.username &&
                  touched?.username &&
                  errors.username}
              </Text>
              <View style={styles.Inputcontainer}>
                <TextInput
                  style={{ ...styles.textInput, color: textColor }}
                  name="password"
                  placeholder="Kata Laluan"
                  placeholderTextColor="#000"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity style={styles.iconContainer} onPress={togglePasswordVisibility}>
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEye : faEyeSlash}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.yup}>
                {errors?.password &&
                  touched?.password &&
                  errors.password}
              </Text>
            </View>
            <View style={{ height: 100, width: '90%', marginHorizontal: '5%', justifyContent: 'space-around' }}>
              <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
                <Image source={logo2} style={{ height: 50, width: 50, marginLeft: 10 }} />
                <Text style={styles.loginText}>Kemaskini</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default FamilsDetails

const styles = StyleSheet.create({
  loginBtn: {
    width: '100%',
    borderRadius: 5,
    marginVertical: '3%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#292A60',
  },
  loginText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 50
  },
  textInput: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 3,
    borderColor: "grey",
    padding: 15
  },
  placeholderStyle: {
    fontSize: 15
  },
  yup: {
    width: '100%',
    fontSize: 14,
    color: 'red',
    fontWeight: '400',
    textAlign: 'right',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
  },
})