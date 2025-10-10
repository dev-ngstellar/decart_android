import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  PermissionsAndroid,
  ToastAndroid,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  ImageBackground,

} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/Header';
import logo from '../../Assets/Waterwark.png';
import logo1 from '../../Assets/profile-logo.png';
import logo2 from '../../Assets/key-logo.png';
import {useDispatch, useSelector} from 'react-redux';
import {GetRaceThunk} from '../../Services/GetRacesService/GetRaceSlice';
import {Dropdown} from 'react-native-element-dropdown';
import {GetReligionThunk} from '../../Services/GetReligionService/GetReligionSlice';
import moment from 'moment';
import DatePicker from '@react-native-community/datetimepicker';
import {getData} from '../../Utils/localHelper';
import DeviceInfo from 'react-native-device-info';
import {UpdateProfileThunk} from '../../Services/UpdateProfileService/UpdateProfileSlice';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalendar,
  faCalendarDays,
  faCamera,
  faPhotoFilm,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import ImagePicker from 'react-native-image-crop-picker';
import {Modal, Portal, Divider,TextInput} from 'react-native-paper';
import {setProfileImage} from '../../Services/LoginService/LoginSlice';
import backdrop from '../../Assets/LOGO/backdrop.jpg'
import { date } from 'yup';
import { GetUserProfileThunk } from '../../Services/UserProfileService/UserProfileSlice';
import Loader from '../../component/Loader';

const Profile = ({navigation}) => {
  const userProfileData = useSelector(state => state.getUserProfile.userProfileData)
  const isLoader = useSelector(state => state.login.isLoader);
  

  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [isFocus3, setIsFocus3] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [nama, setNama] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alamat, setAlamat] = useState("");

  const [visitDateVisible, setVisitDateVisible] = useState(false);
  const [value, setValue] = useState(null);

  const [Status, setStatus] = useState(null);
  const [RaceID, setRaceId] = useState(null);
  

  const [ReligionId, setReligionId] = useState(null);

  const [selectedVisitDate, setSelectedVisitDate] = useState(new Date());
  const [textInputValue, setTextInputValue] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const {CustomerRace} = useSelector(state => state.getRace);
  const {CustomerReligion} = useSelector(state => state.getReligion);
  


  const colorScheme = useColorScheme();
  const lightModeTextColor = 'black';
  const darkModeTextColor = 'black';
  const textColor =
    colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;
  const dropdown = [
    {value: 1, label: 'Bujang'},
    {value: 2, label: 'Kahwin'},
  ];
  const Dropdown1 = [
    {label: 'Lelaki', value: 1},
    {label: 'Perempuan', value: 2},
  ];

  useEffect(() => {
    if (userProfileData) {
      setNama(userProfileData?.CustName || '');
      setEmail(userProfileData?.CustEmail || '');
      setPhone(userProfileData?.CustHPNo || '');
      setAlamat(userProfileData?.CustAddress || '');
      setValue(userProfileData?.GenderID || null);
      setRaceId(userProfileData?.CustRaceID || null);
      setReligionId(userProfileData?.CustReligionID || null);
      const formattedDate = moment(userProfileData?.CustDOB, 'YYYY-MM-DD').toDate();
      setSelectedVisitDate(formattedDate);
      setTextInputValue(moment(formattedDate).format('DD/MM/YYYY'));
      setStatus(userProfileData?.CustMaritalStatusID || null);
    }
  }, [userProfileData]);

  const getRaces = async () => {
    await dispatch(GetRaceThunk());
  };
  const getReligion = async () => {
    await dispatch(GetReligionThunk());
  };

  const getUserProfile = async () => {
    const custId = await getData('CustId');

    const payload = {
      CustID: custId,
      DevID: deviceId,
    };
    await dispatch(GetUserProfileThunk({payload}));
  };

  useEffect(() => {
    getRaces();
    getReligion();
    getUserProfile()
  }, []);



  const toggleVisitDatePicker = () => {
    setVisitDateVisible(true);
  };

  const handleVisitDateChange = (event, date) => {
    if (event.type === 'dismissed') {
      setVisitDateVisible(false);
    } else {
      setVisitDateVisible(false);
      setSelectedVisitDate(date);
      setTextInputValue(moment(date).format('DD/MM/YYYY'));
    }
  };
  // const handleTextInputChange = text => {
    
  //   if (text === '') {
  //     setSelectedVisitDate(null);
  //   } else {
  //     const formattedDate = moment(text, 'DD/MM/YYYY', true);
  //     if (formattedDate.isValid()) {
  //       setSelectedVisitDate(formattedDate.toDate());
  //     }
  //   }
  // };
  

  const handleTextInputChange = (text) => {
    setTextInputValue(text);
    const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
    const currentDate = moment();
    
    if (text === '') {
      setSelectedVisitDate(null);
      setError('');
    } else if (dateFormat.test(text)) {
      const date = moment(text, 'DD/MM/YYYY');
      if (date.isValid()) {
        if (date.isSameOrBefore(currentDate, 'day')) {
          setSelectedVisitDate(date.toDate());
          setError('');
        } else {
          setError('Selected date must be less than or equal to current date.');
        }
      } else {
        setError('Invalid date format. Please use DD/MM/YYYY.');
      }
    } else {
      setError('Invalid date format. Please use DD/MM/YYYY.');
    }
  };

  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
    };
    fetchDeviceId();
  }, []);



  const handleUpdateProfile = async () => {
    const custId = await getData('CustId');
    if (custId && nama && phone && email && selectedVisitDate && value != 0 && RaceID !=0 && ReligionId !=0 && Status ){
      const custId = await getData('CustId');
    const payload = {
      CustId: custId,
      CustName: nama,
      CustHP: phone,
      CustEmail: email,
      CustDOB: moment(selectedVisitDate).format('YYYY-MM-DD'),
      GenderID: value,
      CustRaceID: RaceID,
      CustReligionID: ReligionId,
      DevID: deviceId,
      CustAddress:alamat,
      CustMaritalStatusID:Status
    };
    
    console.log("Profile - Update Profile Payload:", payload);
    const response = await dispatch(UpdateProfileThunk({payload})); 
   
    if (response.payload.ResultMsg == 'Success') {
      Alert.alert('','Kemaskini Berjaya', [
        {text: 'OK', onPress: () => navigation.navigate('Dashboard')},
      ]);
    } 
    else {
      Alert.alert('Gagal', response?.payload[0]?.ResultMsg, [
        {text: 'OK', onPress: () => navigation.navigate('Dashboard')},
      ]);
    }
  }else{
    Alert.alert('Sila pastikan semua maklumat diisi')
  }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header Screen="Profil" />
      {isLoader && <Loader/>}
      <ImageBackground source={backdrop} style={{height:'100%'}}>
      <ScrollView>
        <View
          style={{
            height: 150,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
       
            <Image source={logo} style={{height: '80%', width: '40%'}} />
         
        </View>
        <View style={styles.Formcontainer}>
      <TextInput
        label="Nama"
        mode="outlined"
        activeOutlineColor='black'
        outlineColor='black'
        style={styles.textInput}
         placeholderTextColor="black"
      textColor='black'
        onChangeText={setNama}
        value={nama}
      />
      <TextInput
        label="Id Pengguna"
        mode="outlined"
        style={styles.textInput}
        placeholderTextColor="black"
          activeOutlineColor='black'
        outlineColor='black'
         textColor='black'
        value={userProfileData?.LoginID}
        editable={false}
      />
      <TextInput
        label="E-mel"
        mode="outlined"
        style={styles.textInput}
        placeholderTextColor="black"
          activeOutlineColor='black'
        outlineColor='black'
      textColor='black'
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        label="No Telefon"
        mode="outlined"
          activeOutlineColor='black'
        outlineColor='black'
        style={styles.textInput}
     placeholderTextColor="black"
      textColor='black'
        onChangeText={setPhone}
        value={phone}
      />
      <View style={styles.InputContainer}>
      
      <Dropdown
        label="Status"
        placeholder='Status'
        mode="outlined"
        style={styles.textInput}
        itemTextStyle={{ color: textColor }}
        placeholderStyle={[ { color: textColor }]}
            selectedTextStyle={[{ color: textColor }]}
        data={dropdown}
        labelField="label"
        valueField="value"
        value={Status}
        onFocus={() => setIsFocus3(true)}
        onBlur={() => setIsFocus3(false)}
        onChange={item => {
          setStatus(item.value);
          setIsFocus3(false);
        }}
      />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
              label="Tarikh Lahir"
              mode="outlined"
              style={{ ...styles.textInput, flex: 1 }}
               placeholderTextColor="black"
                 activeOutlineColor={error ? 'red' : 'black'}
        outlineColor={error ? 'red' : 'black'}
      textColor='black'
              onChangeText={handleTextInputChange}
              value={textInputValue}
            />
        <TouchableOpacity style={styles.iconContainer} onPress={toggleVisitDatePicker}>
          <FontAwesomeIcon icon={faCalendarDays} size={25} color='#292A60'/>
        </TouchableOpacity>
      </View>
      {visitDateVisible && (
        <DatePicker
          mode="date"
          display="calendar"
          value={selectedVisitDate || new Date()}
          onChange={handleVisitDateChange}
          maximumDate={new Date()}
        />
      )}
      <View style={styles.InputContainer}>
      <Dropdown
        label="Jantina"
        placeholder='Jantina'
        mode="outlined"
        style={styles.textInput}
        data={Dropdown1}
        labelField="label"
        valueField="value"
        value={value}
        itemTextStyle={{ color: textColor }}
        placeholderStyle={[{ color: textColor }]}
            selectedTextStyle={[{ color: textColor }]}
        onFocus={() => setIsFocus1(true)}
        onBlur={() => setIsFocus1(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus1(false);
        }}
      />
      </View>
      <View style={styles.InputContainer}>
      <Dropdown
        label="Bangsa"
        mode="outlined"
        placeholder='Bangsa'
        style={styles.textInput}
        data={CustomerRace}
        labelField="RaceName"
        valueField="RaceID"
        value={RaceID}
        itemTextStyle={{ color: textColor }}
        placeholderStyle={[{ color: textColor }]}
            selectedTextStyle={[{ color: textColor }]}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setRaceId(item.RaceID);
          setIsFocus(false);
        }}
      />
      </View>
      <View style={styles.InputContainer}>
      <Dropdown
        label="Agama"
        placeholder='Agama'
        mode="outlined"
        style={styles.textInput}
        data={CustomerReligion}
        labelField="ReligionName"
        valueField="ReligionID"
        value={ReligionId}
        itemTextStyle={{ color: textColor }}
        placeholderStyle={[{ color: textColor }]}
            selectedTextStyle={[ { color: textColor }]}
        onFocus={() => setIsFocus2(true)}
        onBlur={() => setIsFocus2(false)}
        onChange={item => {
          setReligionId(item.ReligionID);
          setIsFocus2(false);
        }}
      />
      </View>
      <TextInput
        label="Alamat"
        mode="outlined"
        style={styles.textInput}
        placeholderTextColor="black"
          activeOutlineColor='black'
        outlineColor='black'
      textColor='black'
        multiline
        numberOfLines={4}
        onChangeText={setAlamat}
        value={alamat}
      />
    </View>
        <View
          style={{
            height: 300,
            width: '90%',
            marginHorizontal: '5%',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleUpdateProfile}>
            <Image
              source={logo1}
              style={{height: 50, width: 50,marginLeft:20}}
            />
            <Text style={styles.loginText}>Kemaskini</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              navigation.navigate('PasswordChange');
            }}>
            <Image
              source={logo2}
              style={{height: 50, width: 50,marginLeft:20}}
            />
            <Text style={styles.loginText}>Ubah Kata Laluan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
     
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  loginBtn: {
    width: '100%',
    borderRadius: 5,
    marginVertical: '3%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#292A60',
  },
  loginText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 50,
  },
  InputContainer: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'grey',
    padding: 15,
    marginBottom:10
  },
  placeholderStyle: {
    fontSize: 15,
  },
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
  // inputContainer: {
  //   position: 'relative',
  //   width: '100%',
  // },
  // iconContainer: {
  //   position: 'absolute',
  //   right: 10,
  //   top: 8,
  // },
  Formcontainer: {
    height: 650,
    width: '90%',
    marginHorizontal: '5%',
    justifyContent: 'space-around',
  },
  textInput: {
    marginBottom: 10,
    backgroundColor:'white'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 10,
  },
  label: {
    fontSize: 16,
    color: 'grey',
    marginBottom:5
  },
});
