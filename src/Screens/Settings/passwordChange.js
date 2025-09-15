import { Alert, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import Header from '../../component/Header'
import { faCircleQuestion, faEye, faEyeSlash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import logo2 from '../../Assets/key-logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { UpdatePassThunk } from '../../Services/UpdatePasswordService/UpdatePassSlice'
import { getData } from '../../Utils/localHelper'
import Logo from '../../Assets/LOGO/waterma.png';
import { Divider, Modal } from 'react-native-paper'
import * as yup from 'yup'
import { useFormik } from 'formik'
import backdrop from '../../Assets/LOGO/backdrop.jpg'

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
    ).notOneOf([yup.ref('KataLaluanLama'), null], '*Kata Laluan lama dan baru sama')
    .required('*Kata Laluan tidak lengkap'),
  KataLaluanLama: yup.string().required('*Kata Laluan tidak sah'),
  UlangKataLaluan: yup
    .string()
    .required('*Kata Laluan diperlukan')
    .test('passwords-match', '*Kata Laluan tidak tepat', function (value) {
      return value === this.parent.KataLaluanBaru;
    })
});

const passwordChange = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isOldPasswordVerified, setIsOldPasswordVerified] = useState(false);
  const dispatch = useDispatch()
  const { ProfileData } = useSelector(state => state.getCustomerProfile);

  const { updatePassData } = useSelector(state => state.updatePass);

  const pass = ProfileData[0].ApPwd
  const colorScheme = useColorScheme();
  const lightModeTextColor = 'black';
  const darkModeTextColor = 'black';
  const textColor = colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const togglePasswordVisibility1 = () => {
    setPasswordVisible1(!passwordVisible1);
  };
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };

  const {values,errors,touched,handleBlur,handleChange,resetForm,handleSubmit} = useFormik({
    initialValues: {
      KataLaluanBaru: '',
      KataLaluanLama: '',
      UlangKataLaluan: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => handleUpdatePass(values,resetForm),
  });

  const handleBlurKataLaluanLama = () => {
    if (values.KataLaluanLama === pass) {
      setIsOldPasswordVerified(true);
    } else {
      setIsOldPasswordVerified(false);
      Alert.alert("Kata Laluan tidak sah");
    }
  };

  const handleUpdatePass = async (values,resetForm) => {
    if (values.KataLaluanLama && values.KataLaluanBaru && values.UlangKataLaluan) {
      const custId = await getData("CustId")
      const payload = {
        CustId: custId,
        APILoginID: ProfileData[0].LoginID,
        OldAPIPwd: values.KataLaluanLama,
        NewAPIPwd: values.KataLaluanBaru
      }
   

      const response = await dispatch(UpdatePassThunk({ payload,resetForm }))
   

      if (response.payload.APIResult === 'Password UPDATED') {
        Alert.alert(
          "Berjaya",
          "Ubah Kata Laluan Berjaya",
          [
            { text: "OK", onPress: () => navigation.navigate('Dashboard') }
          ]
        );
        setIsOldPasswordVerified(false)
      } else {
        Alert.alert('Kata Laluan tidak sah')
      }
    } else {
      Alert.alert("Kata Laluan tidak sah")
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header Screen="Ubah kata Laluan" />
      <ImageBackground source={backdrop} style={{ height: '100%' }}>
          <View style={{ height: 250, justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={{ ...styles.textInput, color: textColor }}
                  name="KataLaluanLama"
                  placeholder="Kata Laluan Lama"
                  placeholderTextColor="#000"
                  secureTextEntry={!passwordVisible}
                  onChangeText={handleChange('KataLaluanLama')}
                  onBlur={() => {
                    handleBlur('KataLaluanLama');
                    handleBlurKataLaluanLama();
                  }}
                  value={values.KataLaluanLama}
                />
                <TouchableOpacity onPress={() => setShowModal(true)}>
                  <FontAwesomeIcon
                    icon={faCircleQuestion}
                    size={24}
                    color="black"
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEye : faEyeSlash}
                    size={24}
                    color="black"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.yup}>
                {errors?.KataLaluanLama &&
                  touched?.KataLaluanLama &&
                  errors.KataLaluanLama}
              </Text>
            </View>

            {isOldPasswordVerified &&
              <View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={{ ...styles.textInput, color: textColor }}
                    name="KataLaluanBaru"
                    placeholder="Kata Laluan Baru"
                    placeholderTextColor="#000"
                    secureTextEntry={!passwordVisible1}
                    onChangeText={handleChange('KataLaluanBaru')}
                    onBlur={handleBlur('KataLaluanBaru')}
                    value={values.KataLaluanBaru}

                  />
                  <TouchableOpacity
                    onPress={togglePasswordVisibility1}
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
              </View>
            }
            {isOldPasswordVerified &&
            <View>
             <View style={styles.inputContainer}>
              <TextInput
                style={{ ...styles.textInput, color: textColor }}
                name="UlangKataLaluan"
                placeholder="Ulang Kata Laluan"
                placeholderTextColor="#000"
                secureTextEntry={!passwordVisible2}
                onChangeText={handleChange('UlangKataLaluan')}
                onBlur={handleBlur('UlangKataLaluan')}
                value={values.UlangKataLaluan}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility2}
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
            }
            <TouchableOpacity style={{ width: '90%' }}>
              <Text style={{ color: "#292A60", fontWeight: "600", textAlign: 'right', marginTop: 5 }}>Terlupa Kata Laluan</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: '20%', justifyContent: 'center', alignItems: "center" }}>
            <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
              <Image source={logo2} style={{ height: 50, width: 50, marginLeft: 10 }} />
              <Text style={styles.loginText}>Ubah Kata Laluan</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={showModal}
            >
              <View style={styles.modalContainer}>
                <View style={{ height: '15%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <FontAwesomeIcon icon={faCircleQuestion} size={35} color='#292A60' />
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginLeft: 20 }}>Ubah Kata Laluan</Text>
                  <TouchableOpacity onPress={() => setShowModal(false)}>
                    <FontAwesomeIcon icon={faXmark} size={20} color='#292A60' style={{ marginLeft: 90 }} />
                  </TouchableOpacity>
                </View>
                <Divider
                  style={{
                    borderBottomWidth: 2,
                    borderColor: '#292A60',
                    width: '95%',
                    marginHorizontal: '3%',
                    marginTop: 25,
                  }}
                />
                <View>
                  <Text style={{ fontSize: 16, padding: 5, color: "black", textAlign: 'left' }}>Pastikan anda masukkan kata laluan lama dengan tepat untuk menukar kata laluan yang baru</Text>
                </View>
              </View>
            </Modal>
          </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default passwordChange

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  textInput: {
    flex: 1,
    height: 40,
  },
  icon: {
    padding: 5,
    borderWidth: 2.5,
    borderRadius: 100,
    borderColor: '#292A60',
    marginRight: 10,
    height: 40,
  },
  loginBtn: {
    width: '95%',
    borderRadius: 5,
    marginHorizontal: '3%',
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
  modalContainer: {
    height: 200,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
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
