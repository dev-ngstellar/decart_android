import {
  Alert,
  Image,
  ImageBackground,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';


import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCircle,
  faCircleCheck,
  faCircleQuestion,
  faCross,
  faEye,
  faEyeSlash,
  faFingerprint,
  faHeadset,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { GetCustomertypeThunk } from '../../Services/GetCustomerTypes/GetCustomerTypeSlice';
import { Dropdown } from 'react-native-element-dropdown';
import { biometricLoginThunk, LoginThunk } from '../../Services/LoginService/LoginSlice';
import { getData } from '../../Utils/localHelper';
import { RegisterThunk } from '../../Services/RegisterService/RegisterSlice';
import DeviceInfo from 'react-native-device-info';
import logo from '../../Assets/Waterwark.png';
import { Divider } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { CheckNewLoginIdThunk } from '../../Services/NewLoginIdService/NewLoginSlice';
import { CheckIcThunk } from '../../Services/CheckIcService/CheckIcSlice';
import { CheckPhoneThunk } from '../../Services/CheckPhoneService/CheckPhoneSlice';
import { CheckEmailThunk } from '../../Services/CheckEmailService/CheckEmailSlice';
import Loader from '../../component/Loader';
import ReactNativeBiometrics from 'react-native-biometrics';

const loginValidationSchema = yup.object().shape({
  // pengguna: yup.string().required('*Id Pengguna diperlukan'),
  // kataLaluan: yup
  //   .string()
  //   .required('*Kata Laluan diperlukan'),
});
const registrationSchema = yup.object().shape({
  nama: yup.string().required('* Nama diperlukan'),
  kataLaluan: yup
    .string()
    .min(8, ({ min }) => `*Sekurang-kurangnya ${min} aksara`)
    .max(12, ({ max }) => `*Kata Laluan tidak melebihi ${max} aksara`)
    .matches(/[A-Z]/, '*Gabungan huruf besar dan huruf kecil')
    .matches(/[0-9]/, '*Sekurang-kurangnya mempunyai 1 angka')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      '*Sekurang-kurangnya 1 karakter Istimewa (@, $, #, !, &, *)',
    )
    .required('*Kata Laluan diperlukan'),
  kataLaluan1: yup
    .string()
    .required('*Kata Laluan diperlukan')
    .test('passwords-match', '*Kata Laluan tidak tepat', function (value) {
      return value === this.parent.kataLaluan;
    }),
  emel: yup
    .string()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Sila masukkan e-mel yang sah")
    .required('*E-mel diperlukan'),
  kadPengenalan: yup
    .string()
    .matches(/^\d{12}$/, '*Kad Pengenalan tidak sah')
    .required('*Kad Pengenalan diperlukan'),
  kategoriPelanggan: yup
    .string()
    .required('*Kategori Pelanggan diperlukan'),
  noTentera: yup.string().when('kategoriPelanggan', {
    is: "1",
    then: () => yup.string().required('*No Tentera diperlukan').min(5, "No Tentera tidak sah").max(10, "No Tentera tidak sah").matches(/^[0-9]+$/, "No Tentera tidak sah"),
    otherwise: () => yup.string()
  }),
  noTelefon: yup
    .string()
    .matches(/^01\d{8,9}$/, '*No Telefon tidak sah')
    .min(10, '*No Telefon tidak sah')
    .max(11, '*No Telefon tidak sah')
    .required('*No Telefon diperlukan'),
  idPengguna: yup
    .string()
    .min(6, ({ min }) => `*Id Pengguna sekurang-kurangnya mempunyai ${min} aksara`)
    .max(12, ({ max }) => `*Id Pengguna tidak melebihi ${max} aksara`)
    .required('* Id Pengguna (6-12 aksara)'),
});

const Login = ({ navigation }) => {
  const isLoader = useSelector(state => state.login.isLoader);
  const OTPData = useSelector(
    state => state.generateOTP.OTPData,
  );

  const [checked1, setChecked1] = useState(false);

  const [selectedButton, setSelectedButton] = useState('LogMasuk');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [ID, setID] = useState(null);
  const [CustomTypeName, setCustomTypeName] = useState("");


  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [Status, setStatus] = useState(null)

  const [jantina, setJantina] = useState(null)
  const colorScheme = useColorScheme();
  const lightModeTextColor = 'grey';
  const darkModeTextColor = 'black';
  const textColor =
    colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const dropdown = [{ value: 1, label: "Bujang" }, { value: 2, label: "Kahwin" }]
  const dropdown1 = [{ value: 1, label: "Lelaki" }, { value: 2, label: "Perempuan" }]
  const phoneNumber = '03 3093 0572';
  const { CustomerTypes } = state.getCustomertype;
  const [CustTypeID, setCustTypeID] = useState(0);
  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
      console.log("Login - Device ID Fetched:", id);
    };
    fetchDeviceId();
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const getCustomerTypes = async () => {
    await dispatch(GetCustomertypeThunk());
  };
  useEffect(() => {
    getCustomerTypes();
  }, []);
  const Login = async (valuesLogin, resetFormLogin) => {
    if (OTPData?.APILoginID) {
      if (!valuesLogin.kataLaluan) {
        Alert.alert('Kata Laluan tidak boleh kosong');
        return;
      }
    } else {
      if (!valuesLogin.pengguna || !valuesLogin.kataLaluan || !valuesLogin && !valuesLogin.pengguna) {
        Alert.alert('Id dan Kata Laluan tidak sepadan');
        return;
      }
    }

    const payload = {
      ApLoginID: OTPData?.APILoginID ? OTPData.APILoginID : valuesLogin.pengguna,
      ApPwd: valuesLogin.kataLaluan,
      DevID: deviceId,
    };

    console.log("Login - Login Payload:", payload);
    const response = dispatch(LoginThunk({ payload, navigation, resetFormLogin }));
  };

  const handleBiometricAuth = async () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const { available, biometryType } = await rnBiometrics.isSensorAvailable();
  
    if (!available) {
      Alert.alert('Error', 'Biometric authentication not available on this device.');
      return;
    }
  
    let promptMessage = 'Authenticate with Biometrics';
  
    if (biometryType === ReactNativeBiometrics.FaceID) {
      promptMessage = 'Authenticate with Face ID';
    } else if (biometryType === ReactNativeBiometrics.TouchID) {
      promptMessage = 'Authenticate with Fingerprint';
    }
  
    const { success } = await rnBiometrics.simplePrompt({
      promptMessage,
    });
  
    if (success) {
      const payload = {
            DevID: deviceId,  
      }
      console.log("Login - Biometric Payload:", payload);
          const response = dispatch(biometricLoginThunk({ payload, navigation }));
      // Alert.alert('Success', 'Biometric authentication successful!');
      // navigation.navigate('Main')
    } else {
      Alert.alert('Error', 'Biometric authentication failed.');
    }
  };

  const confirmAndRegister = (valuesRegistration, resetFormRegistration) => {
    const { nama, idPengguna, noTelefon, kataLaluan, kataLaluan1 } = valuesRegistration;

    if (nama && idPengguna && noTelefon && CustTypeID && kataLaluan && kataLaluan1) {
      Alert.alert(
        `Adakah anda (${CustomTypeName})`,
        '',
        [
          { text: 'YA', onPress: () => Register(valuesRegistration, resetFormRegistration) },
          {
            text: 'TIDAK',
            onPress: () => null,
            style: 'cancel',
          },
        ]
      );
    } else {
      Alert.alert('Gagal', 'Harap isi semua maklumat');
    }
  };
  const Register = async (valuesRegistration, resetFormRegistration) => {

    const payload = {
      CustId: 0,
      // SerNo: valuesRegistration.noTentera,
      SerNo: valuesRegistration.kategoriPelanggan == '1' ? valuesRegistration.noTentera : '',
      CustName: valuesRegistration.nama,
      CustICNo: valuesRegistration.kadPengenalan,
      CustPhoneNo: valuesRegistration.noTelefon,
      CustEmail: valuesRegistration.emel,
      BioYN: 0,
      JPNICNo: '',
      JPNBioResult: 'FAIL',
      APILoginID: valuesRegistration.idPengguna,
      APIPwd: valuesRegistration.kataLaluan,
      CustTypeID: CustTypeID,
      StatusID: 1,
      UserID: 1,
      DevID: deviceId,
      MaritalStatusID: Status,
      GenderID: jantina
    };

    console.log("Login - Register Payload:", payload);
    const response = dispatch(RegisterThunk({ payload, resetFormRegistration }));


    if (response) {
      Alert.alert("Pendaftaran anda telah berjaya")
      setSelectedButton('LogMasuk');
    }

  };

  const CheckLogin = async (username) => {
    if (username) {
      const payload = { NewLoginID: username };
      console.log("Login - Check Login Payload:", payload);
      const response = await dispatch(CheckNewLoginIdThunk({ payload }));
      console.log("Response :: " + JSON.stringify(response));
      if (response.payload.API_Result_ID === 0) {
        Alert.alert(response.payload.API_Result)
        setFieldValue('idPengguna', '');
      }
    }

  };

  const CheckIC = async (IC) => {
    if (IC) {
      const payload = { Cust_IC_No: IC };
      console.log("Login - Check IC Payload:", payload);
      const response = await dispatch(CheckIcThunk({ payload }));

      if (response.payload.API_Result_ID === 0) {
        Alert.alert(response.payload.API_Result)
        setFieldValue('kadPengenalan', '');
      }
    }
  };

  const CheckPhone = async (Phone) => {
    if (Phone) {
      const payload = { CustHPNo: Phone };
      console.log("Login - Check Phone Payload:", payload);
      const response = await dispatch(CheckPhoneThunk({ payload }));

      if (response.payload.API_Result_ID === 0) {
        Alert.alert(response.payload.API_Result)
        setFieldValue('noTelefon', '');
      }
    }
  };
  const CheckEmail = async (email) => {
    if (email) {
      const payload = { CustEmail: email };
      console.log("Login - Check Email Payload:", payload);
      const response = await dispatch(CheckEmailThunk({ payload }));


      if (response.payload.API_Result_ID === 0) {
        Alert.alert(response.payload.API_Result)
        setFieldValue('emel', '');
      }
    }
  };


  const {
    handleChange: handleChangeLogin,
    values: valuesLogin,
    handleBlur: handleBlurLogin,
    resetForm: resetFormLogin,
    errors: errorsLogin,
    touched: touchedLogin,
    handleSubmit: handleSubmitLogin,
  } = useFormik({
    initialValues: { pengguna: '', kataLaluan: '' },
    validationSchema: loginValidationSchema,
    onSubmit: valuesLogin => Login(valuesLogin, resetFormLogin),
  });

  const {
    handleChange: handleChangeRegistration,
    values: valuesRegistration,
    handleBlur: handleBlurRegistration,
    resetForm: resetFormRegistration,
    errors: errorsRegistration,
    touched: touchedRegistration,
    handleSubmit: handleSubmitRegistration,
    setFieldValue
  } = useFormik({
    initialValues: {
      nama: '',
      idPengguna: '',
      noTelefon: '',
      noTentera: '',
      kadPengenalan: '',
      emel: '',
      kataLaluan: '',
      kataLaluan1: '',
      kategoriPelanggan: '',
    },
    validationSchema: registrationSchema,
    onSubmit: valuesRegistration =>
      confirmAndRegister(valuesRegistration, resetFormRegistration),
  });


  const renderContent = () => {
    if (selectedButton === 'LogMasuk') {
      return (
        <View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: '65%',
            }}>
            <View style={{ marginRight: 40, marginTop: 15 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#292A60' }}>
                SELAMAT DATANG!
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '600', color: textColor }}>
                Gembira bertemu anda.
              </Text>
            </View>
            <Image source={logo} style={{ width: 275, height: 200 }} />

            <View style={{ height: '25%', justifyContent: 'space-between' }}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={{ ...styles.textInput, color: textColor }}
                  name="pengguna"
                  placeholder="Id Pengguna"
                  placeholderTextColor="#000"
                  onChangeText={handleChangeLogin('pengguna')}
                  onBlur={handleBlurLogin('pengguna')}
                  value={OTPData?.APILoginID ? OTPData?.APILoginID : valuesLogin.pengguna}

                />
                <FontAwesomeIcon
                  icon={faUser}
                  size={24}
                  color="black"
                  style={styles.icon}
                />
              </View>
              <Text style={styles.yup}>
                {errorsLogin?.pengguna &&
                  touchedLogin?.pengguna &&
                  errorsLogin.pengguna}
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={{ ...styles.textInput, color: textColor }}
                  name="kataLaluan"
                  placeholder="Kata Laluan"
                  placeholderTextColor="#000"
                  secureTextEntry={!passwordVisible}
                  onChangeText={handleChangeLogin('kataLaluan')}
                  onBlur={handleBlurLogin('kataLaluan')}
                  value={valuesLogin.kataLaluan}
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
              </View >
              <Text style={styles.yup}>
                {errorsLogin?.kataLaluan &&
                  touchedLogin?.kataLaluan &&
                  errorsLogin.kataLaluan}
              </Text>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={handleSubmitLogin}>
                <Text style={styles.loginText}>Log Masuk</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity
                  style={{ alignItems: 'flex-end' }}
                  onPress={() => navigation.navigate('Forgot')}
                >
                  <Text style={styles.loginText1}>Terlupa Kata Laluan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'flex-end' }}
                  onPress={() => navigation.navigate('ForgetUser')}
                // onPress={() => navigation.navigate('usernameChange')}
                >
                  <Text style={styles.loginText1}>Terlupa Id Pengguna</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop:10,alignItems:'center'}}>
              <Text style={{fontSize:16,color:textColor,fontWeight:'600'}}>or</Text>
              </View>
              <View style={{ marginTop: 20, alignItems: 'center' }}>
      <TouchableOpacity
                style={styles.fingerprintButton}
                onPress={handleBiometricAuth}
              >
                <FontAwesomeIcon icon={faFingerprint} size={24} color='white' />
              </TouchableOpacity>
              </View>
        

            </View>
          </View>

        </View>
      );
    } else {
      return (
        <ScrollView
          style={{
            width: '100%',
            height: '100%',
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.welcomeContainer}>
            <Text style={[styles.welcomeText, { color: textColor }]}>
              SELAMAT DATANG,
            </Text>
            <Text style={[styles.subText, { color: textColor }]}>
              kami gembira melihat anda disini!
            </Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.asterisk}>*</Text>
              <TextInput
                style={[styles.textInput, { color: textColor }]}
                name="nama"
                placeholder="Nama"
                placeholderTextColor="#000"
                onChangeText={handleChangeRegistration('nama')}
                onBlur={handleBlurRegistration('nama')}
                value={valuesRegistration.nama}
              />
            </View>
            <Text style={styles.errorText}>
              {errorsRegistration?.nama &&
                touchedRegistration?.nama &&
                errorsRegistration.nama}
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.asterisk}>*</Text>
              <TextInput
                style={[styles.textInput, { color: textColor }]}
                name="noTelefon"
                placeholder="No Telefon"
                placeholderTextColor="#000"
                onChangeText={handleChangeRegistration('noTelefon')}
                // onBlur={handleBlurRegistration('noTelefon')}
                value={valuesRegistration.noTelefon}
                onBlur={(e) => {
                  handleBlurRegistration('noTelefon')(e);
                  CheckPhone(valuesRegistration.noTelefon); // Check username on blur
                }}
              />
            </View>
            <Text style={styles.errorText}>
              {errorsRegistration?.noTelefon &&
                touchedRegistration?.noTelefon &&
                errorsRegistration.noTelefon}
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.asterisk}>*</Text>
              <TextInput
                style={[styles.textInput, { color: textColor }]}
                name="emel"
                placeholder="E-mel"
                placeholderTextColor="#000"
                onChangeText={handleChangeRegistration('emel')}
                value={valuesRegistration.emel}
                // onBlur={handleBlurRegistration('emel')}
                onBlur={(e) => {
                  handleBlurRegistration('emel')(e);
                  CheckEmail(valuesRegistration.emel); // Check username on blur
                }}
              />
            </View>
            <Text style={styles.errorText}>
              {errorsRegistration?.emel &&
                touchedRegistration?.emel &&
                errorsRegistration.emel}
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.asterisk}>*</Text>
              <Dropdown
                style={[styles.textInput, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={[styles.placeholderStyle, { color: textColor }]}
                selectedTextStyle={[styles.placeholderStyle, { color: textColor }]}
                itemTextStyle={{ color: textColor }}
                data={CustomerTypes}
                labelField="CustTypeName"
                valueField="CustTypeID"
                placeholder="Kategori Pelanggan"
                value={CustTypeID}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setCustTypeID(item.CustTypeID);
                  setID(item.ATM_YN);
                  setCustomTypeName(item.CustTypeName);
                  setFieldValue('kategoriPelanggan', item.ATM_YN)
                  setIsFocus(false);
                }}
              />
            </View>
            <Text style={styles.errorText}>{errorsRegistration?.kategoriPelanggan &&
              touchedRegistration?.kategoriPelanggan &&
              errorsRegistration.kategoriPelanggan} </Text>
            <View style={styles.inputContainer}>
              <Dropdown
                style={[styles.textInput, isFocus1 && { borderColor: 'blue' }]}
                placeholderStyle={[styles.placeholderStyle, { color: textColor }]}
                selectedTextStyle={[styles.placeholderStyle, { color: textColor }]}
                itemTextStyle={{ color: textColor }}
                data={dropdown}
                labelField="label"
                valueField="value"
                placeholder="Status"
                value={Status}
                onFocus={() => setIsFocus1(true)}
                onBlur={() => setIsFocus1(false)}
                onChange={item => {
                  setStatus(item.value);
                  setIsFocus1(false);
                }}
              />
            </View>

            <Text style={styles.errorText}></Text>

            <View style={styles.inputContainer}>
              <Dropdown
                style={[styles.textInput, isFocus2 && { borderColor: 'blue' }]}
                placeholderStyle={[styles.placeholderStyle, { color: textColor }]}
                selectedTextStyle={[styles.placeholderStyle, { color: textColor }]}
                itemTextStyle={{ color: textColor }}
                data={dropdown1}
                labelField="label"
                valueField="value"
                placeholder="Jantina"
                value={jantina}
                onFocus={() => setIsFocus2(true)}
                onBlur={() => setIsFocus2(false)}
                onChange={item => {
                  setJantina(item.value);
                  setIsFocus2(false);
                }}
              />
            </View>
            <Text style={styles.errorText}></Text>
            {ID === 1 && (
              <View style={styles.inputContainer}>
                <Text style={styles.asterisk}>*</Text>
                <TextInput
                  style={[styles.textInput, { color: textColor }]}
                  name="noTentera"
                  placeholder="No Tentera"
                  placeholderTextColor="#000"
                  onChangeText={handleChangeRegistration('noTentera')}
                  value={valuesRegistration.noTentera}
                  onBlur={handleBlurRegistration('noTentera')}
                />
              </View>
            )}
            <Text style={styles.errorText}>
              {errorsRegistration?.noTentera &&
                touchedRegistration?.noTentera &&
                errorsRegistration.noTentera}
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.asterisk}>*</Text>
              <TextInput
                style={[styles.textInput, { color: textColor }]}
                name="kadPengenalan"
                placeholder="Kad Pengenalan"
                placeholderTextColor="#000"
                onChangeText={handleChangeRegistration('kadPengenalan')}
                value={valuesRegistration.kadPengenalan}
                onBlur={(e) => {
                  handleBlurRegistration('kadPengenalan')(e);
                  CheckIC(valuesRegistration.kadPengenalan);
                }}
              />
            </View>
            <Text style={styles.errorText}>
              {errorsRegistration?.kadPengenalan &&
                touchedRegistration?.kadPengenalan &&
                errorsRegistration.kadPengenalan}
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.asterisk}>*</Text>
              <TextInput
                style={{ ...styles.textInput, color: textColor }}
                name="idPengguna"
                placeholder="Id Pengguna (6-12 Aksara)"
                placeholderTextColor="#000"
                onChangeText={handleChangeRegistration('idPengguna')}
                // onBlur={handleBlurRegistration('idPengguna')}
                onBlur={(e) => {
                  handleBlurRegistration('idPengguna')(e);
                  CheckLogin(valuesRegistration.idPengguna);
                }}
                value={valuesRegistration.idPengguna}
              />
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faCircleQuestion} size={20} />
              </TouchableOpacity>
            </View>
            <Text style={styles.errorText}>
              {errorsRegistration?.idPengguna &&
                touchedRegistration?.idPengguna &&
                errorsRegistration.idPengguna}
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.textInput, { color: textColor }]}
                name="kataLaluan"
                placeholder="Kata Laluan"
                placeholderTextColor="#000"
                secureTextEntry={!passwordVisible1}
                onChangeText={handleChangeRegistration('kataLaluan')}
                onBlur={handleBlurRegistration('kataLaluan')}
                value={valuesRegistration.kataLaluan}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible1(!passwordVisible1)}
                style={styles.iconContainer}
              >
                <FontAwesomeIcon
                  icon={passwordVisible1 ? faEye : faEyeSlash}
                  size={24}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowModal1(true)}>
                <FontAwesomeIcon icon={faCircleQuestion} size={20} />
              </TouchableOpacity>
            </View>
            <Text style={styles.errorText}>
              {errorsRegistration?.kataLaluan &&
                touchedRegistration?.kataLaluan &&
                errorsRegistration.kataLaluan}
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.textInput, { color: textColor }]}
                name="kataLaluan1"
                placeholder="Ulang Kata Laluan"
                placeholderTextColor="#000"
                secureTextEntry={!passwordVisible2}
                onChangeText={handleChangeRegistration('kataLaluan1')}
                onBlur={handleBlurRegistration('kataLaluan1')}
                value={valuesRegistration.kataLaluan1}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible2(!passwordVisible2)}
                style={styles.iconContainer}
              >
                <FontAwesomeIcon
                  icon={passwordVisible2 ? faEye : faEyeSlash}
                  size={24}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.errorText}>
              {errorsRegistration?.kataLaluan1 &&
                touchedRegistration?.kataLaluan1 &&
                errorsRegistration.kataLaluan1}
            </Text>
            <View style={styles.checkbox}>
              <CheckBox
                disabled={false}
                value={checked1}
                onValueChange={(newValue) => setChecked1(newValue)}
              />
              <Text style={{ color: "black" }}>
                Saya bersetuju dengan {" "}
                <Text style={styles.link} onPress={() => navigation.navigate('Privacy')}>
                  Terma & Syarat{" "}
                </Text>
                <Text style={{ color: "black" }}>
                  dan{" "}
                </Text>
                <Text style={styles.link} onPress={() => navigation.navigate('Privacy')}>
                  Dasar Privasi{" "}
                </Text>
                <Text style={{ color: "black" }}>
                  yang ditetapkan.
                </Text>
              </Text>
              <View style={{ marginLeft: '5%' }}>

              </View>
            </View>
            {checked1 && <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleSubmitRegistration}
            >
              <Text style={styles.loginText}>DAFTAR</Text>
            </TouchableOpacity>}
            <Text style={styles.requiredText}>
              Medan yang bertanda (*) wajib diisi
            </Text>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
          >
            <View style={styles.modalContainer}>
              <View style={{ height: '15%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faCircleQuestion} size={35} color='#292A60' />
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <FontAwesomeIcon icon={faXmark} size={20} color='#292A60' />
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
                <Text style={{ fontWeight: "bold", fontSize: 18, padding: 5, color: "black" }}>Id Pengguna</Text>
                <Text style={{ fontSize: 16, padding: 5, color: "black", textAlign: 'left' }}>Id pengguna ialah nama untuk digunakan pada log masuk</Text>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showModal1}
          >
            <View style={styles.modalContainer}>
              <View style={{ height: '15%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faCircleQuestion} size={35} color='#292A60' />
                <TouchableOpacity onPress={() => setShowModal1(false)}>
                  <FontAwesomeIcon icon={faXmark} size={20} color='#292A60' />
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
                <Text style={{ fontWeight: "bold", fontSize: 18, padding: 5, color: "black" }}>Kata Laluan</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesomeIcon icon={faCircle} size={10} />
                  <Text style={{ fontSize: 16, padding: 5, color: "black", marginLeft: 10 }}>8-12 Aksara</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesomeIcon icon={faCircle} size={10} />
                  <Text style={{ fontSize: 16, padding: 5, color: "black", marginLeft: 10 }}>Kombinasi huruf besar, huruf kecil, angka & simbol</Text>
                </View>

              </View>
            </View>
          </Modal>
        </ScrollView>
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoader && <Loader />}
      <View style={styles.toggles}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#CDCDCD',
            width: 260,
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <TouchableOpacity
            style={[
              styles.togglebutton,
              selectedButton === 'LogMasuk'
                ? { backgroundColor: '#DFDFDF' }
                : { backgroundColor: '#CDCDCD' },
            ]}
            onPress={() => setSelectedButton('LogMasuk')}>
            <Text
              style={{
                color: selectedButton === 'LogMasuk' ? '#292A60' : 'gray',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              LOG MASUK
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.togglebutton,
              selectedButton === 'Daftar'
                ? { backgroundColor: '#DFDFDF' }
                : { backgroundColor: '#CDCDCD' },
            ]}
            onPress={() => setSelectedButton('Daftar')}>
            <Text
              style={{
                color: selectedButton === 'Daftar' ? '#292A60' : 'gray',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              DAFTAR
            </Text>
          </TouchableOpacity>
        </View>
        {selectedButton === 'LogMasuk' && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              Linking.openURL(`tel:${phoneNumber}`)
            }}>
            <FontAwesomeIcon icon={faHeadset} size={25} color="#292A60" />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ height: 625, width: '94%', marginHorizontal: '3%' }}>
        {renderContent()}
      </View>
      <View style={{ justifyContent: "flex-end", alignItems: 'flex-end', marginRight: 20 }}>
        <Text style={{ color: 'red' }}>*Powered by PERNAMA</Text>
        <Text style={{ color: 'red', }}>v1.3</Text>

      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggles: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  togglebutton: {
    height: 50,
    width: 125,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  inputContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
  },
  yup: {
    fontSize: 14,
    color: 'red',
    fontWeight: '600',
    textAlign: 'right',
  },
  loginBtn: {
    width: 340,
    borderRadius: 5,
    marginVertical: '3%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#292A60',
  },
  loginBtn2: {
    width: 200,
    borderRadius: 5,
    marginVertical: '3%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: 'black',
    flexDirection: 'row',
  },
  loginText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  loginText1: {
    color: '#292A60',
    fontWeight: '700',
    fontSize: 16,
  },
  loginText2: {
    color: 'black',
  },
  icon: {
    padding: 5,
    borderWidth: 2.5,
    borderRadius: 100,
    borderColor: '#292A60',
    marginRight: 10,
    height: 40,
  },
  errorTextInput: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
    padding: 5,
  },
  color: {
    color: 'red',
  },
  modalContainer: {
    height: '30%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'lightgrey',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
    fontWeight: '600',
  },
  formContainer: {
    height: 1100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  asterisk: {
    color: 'red',
    marginRight: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    width: '100%',
    marginLeft: 40
  },
  registerButton: {
    backgroundColor: '#292A60',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  requiredText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    width: '80%',
    textAlign: 'center',
    marginTop: 5
  },
  checkbox: {
    flexDirection: 'row',
    width: '95%',
    marginTop: '6%',
    alignItems: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  fingerprintButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#292A60',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    height: 55,
    width: 55,
  },
  fingerprintButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    marginRight:10
  }
});
