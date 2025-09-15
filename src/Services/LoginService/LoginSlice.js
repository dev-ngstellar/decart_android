import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { biometricLoginApi, loginApi, update_device_id } from './LoginApi';
import { storeData } from '../../Utils/localHelper';
import { Alert } from 'react-native';

const initialState = {
  loginData: [],
  profileImage: '',
  isLoader: false,
  biometricLoginData:[]
};

export const LoginThunk = createAsyncThunk(
  'login',
  async (action, { dispatch }) => {
    const { navigation, resetFormLogin, payload } = action;
    dispatch(setIsLoading(true));
    try {
      const response = await loginApi(payload);
      console.log("Login Response :: "+JSON.stringify(response.data))
      // if (response && response?.data?.ApiResult == 'SUCCESS') {
      if (response && response?.data?.ApiResultID == 1) {
        await storeData('CustId', response.data.CustId.toString());
        await storeData('token', response.token);
        resetFormLogin();
        navigation.navigate('Main');
      } else if (response && response?.data?.ApiResultID == 2) {

        // Alert.alert(response?.data?.DeviceMsg);
        Alert.alert(
          'Adakah anda ingin menggunakan peranti ini sebagai akaun utama?',
          '',  
          [
             {text: 'Ya', onPress: async() => {
              // params
              const devicePauload = {
                "CustDevId":0,
                "CustId":response.data.CustId,
                "RegDevID":payload.DevID,
                "UserId":response.data.CustId}
                
                // api call update_device_id
                console.log('DevicePayLaod',devicePauload)
              const deviceResponse = await update_device_id(devicePauload);
              console.log("Device Response :: "+deviceResponse);
              await storeData('CustId', response.data.CustId.toString());
              await storeData('token', response.token);
              resetFormLogin();
              navigation.navigate('Main');
            }},
            {text: 'Tidak', onPress: () => console.log('dismissing alert'), style: 'cancel'}
          ],
          { cancelable: false }
        )
       
      } else {
        Alert.alert(response?.data?.DeviceMsg);
        resetFormLogin();
        navigation.navigate('Login');
      }
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const biometricLoginThunk = createAsyncThunk(
  'biometricLogin',
  async (action,{dispatch}) => {
    const  {navigation, payload} = action
    dispatch(setIsLoading(true));
    try {
      const response = await biometricLoginApi(payload);
      dispatch(setIsLoading(false))
            if (response && response?.data?.ApiResultID == 1) {
        await storeData('CustId', response.data.CustId.toString());
        await storeData('token', response.token);
        navigation.navigate('Main');
      } else if (response && response?.data?.ApiResultID == 2) {
        Alert.alert(
          'Adakah anda ingin menggunakan peranti ini sebagai akaun utama?',
          '',  
          [
             {text: 'Ya', onPress: async() => {
              const devicePauload = {
                "CustDevId":0,
                "CustId":response.data.CustId,
                "RegDevID":payload.DevID,
                "UserId":response.data.CustId}
                
                console.log('DevicePayLaod',devicePauload)
              const deviceResponse = await update_device_id(devicePauload);
              console.log("Device Response :: "+deviceResponse);
              await storeData('CustId', response.data.CustId.toString());
              await storeData('token', response.token);
              navigation.navigate('Main');
            }},
            {text: 'Tidak', onPress: () => console.log('dismissing alert'), style: 'cancel'}
          ],
          { cancelable: false }
        )
       
      } else {
        Alert.alert(response?.data?.DeviceMsg);
        navigation.navigate('Login');
      }
      return response.data
        } catch (error) {
      dispatch(setIsLoading(false))
      console.log(error);
    }
  },
);

const LoginSlice = createSlice({
  initialState,
  name: 'login',
  reducers: {
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoader = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(LoginThunk.fulfilled, (state, action) => {
      state.loginData = action.payload;
    })
    .addCase(biometricLoginThunk.fulfilled, (state, action) => {
      state.biometricLoginData = action.payload;
    });
  },
});

export const { setProfileImage, setIsLoading } = LoginSlice.actions;
export default LoginSlice.reducer;
