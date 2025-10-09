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
      console.log("Payload sent to loginApi ::", payload);

      const response = await loginApi(payload);
      console.log("Login Response :: " + JSON.stringify(response.data));

      if (response && response?.data?.ApiResultID == 1) {
        // ✅ Normal successful login (same device or no RegDevID restriction)
        console.log("✅ Login successful on registered device");
        await storeData('CustId', response.data.CustId.toString());
        await storeData('token', response.token);
        resetFormLogin();
        navigation.navigate('Main');
      } 
      else if (response && response?.data?.ApiResultID == 2) {
        console.log("⚠️ Multiple device login detected");

        const registeredDevId = response?.data?.RegDevID;
        const currentDevId = payload?.DevID;

        console.log("Registered Device ID:", registeredDevId);
        console.log("Current Device ID:", currentDevId);

        // 🧩 Step 1: If both device IDs are same → normal login
        if (registeredDevId === currentDevId) {
          console.log("✅ Same device detected, proceeding to main...");
          await storeData('CustId', response.data.CustId.toString());
          await storeData('token', response.token);
          resetFormLogin();
          navigation.navigate('Main');
          return response.data;
        }

        // 🧩 Step 2: Different device → show multiple login warning first
        Alert.alert(
          "Multiple Device Login Detected",
          "Log masuk pada berbilang peranti dikesan.",
          [
            {
              text: "OK",
              onPress: () => {
                // 🧩 After OK, show the confirmation to make this main device
                Alert.alert(
                  "Do you want to use this device as your main account?",
                  "Adakah anda ingin menggunakan peranti ini sebagai akaun utama?",
                  [
                    {
                      text: "Yes / Ya",
                      onPress: async () => {
                        try {
                          console.log("payload dev id", currentDevId);
                          console.log("payload user id", response.data.CustId);

                          const devicePayload = {
                            CustDevId: 0,
                            CustId: response.data.CustId,
                            RegDevID: currentDevId,
                            UserId: response.data.CustId,
                          };

                          console.log("DevicePayload ::", devicePayload);

                          // 🔄 API call to update registered device
                          const deviceResponse = await update_device_id(devicePayload);
                          console.log("Device Response :: " + deviceResponse);

                          await storeData('CustId', response.data.CustId.toString());
                          await storeData('token', response.token);
                          resetFormLogin();
                          navigation.navigate('Main');
                        } catch (err) {
                          console.log("Error updating device ID:", err);
                        }
                      },
                    },
                    {
                      text: "No / Tidak",
                      onPress: () => console.log("User cancelled making this main device"),
                      style: "cancel",
                    },
                  ],
                  { cancelable: false }
                );
              },
            },
          ],
          { cancelable: false }
        );
      } 
      else {
        Alert.alert(response?.data?.DeviceMsg || "Login gagal.");
        resetFormLogin();
        navigation.navigate('Login');
      }

      return response.data;
    } catch (error) {
      console.log("❌ Error during login flow:", error);
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
