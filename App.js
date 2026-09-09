import {StyleSheet, AppState} from 'react-native';
// import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './src/Screens/MainRoot/Splash';
import Login from './src/Screens/Login/Login';
import ForgotPass from './src/Screens/Login/ForgotPass';
import Validation from './src/Screens/Login/Validation';
import Main from './src/Screens/Main/Main';
import {Modal} from 'react-native-paper';
import {Provider} from 'react-redux';
import { store } from './src/Store';
import IdValidation from './src/Screens/Login/IdValidation';
import PassChange from './src/Screens/Login/PassChange';
import ForgotUser from './src/Screens/Login/ForgotUser';
import UserValidation from './src/Screens/Login/UserValidation';
import UserIdValidation from './src/Screens/Login/UserIdValidation';
import UsernameChange from './src/Screens/Login/UsernameChange';
import Privacypolicy from './src/Screens/Settings/Privacypolicy';
import TermsAndConditions from './src/Screens/Settings/TermsAndConditions';
import { navigationRef, reset } from './src/Utils/NavigationService';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import React, {useEffect, useRef} from 'react';
import {clearData, getData} from './src/Utils/localHelper';
import DeviceInfo from 'react-native-device-info';
import Campaigns from './src/Screens/Dashboard/Campaigns';
import { CustomerProfileApi } from './src/Services/GetCustomerProfile/CustomerProfileApi';
import CustomAlert from './src/component/CustomAlert';

const Stack = createNativeStackNavigator();
const App = () => {
  const isLoggingOutRef = useRef(false);

  const isDeviceSessionInvalid = data => {
    if (!data) return false;

    // Check specific IDs that usually indicate failure or device mismatch
    if (
      data.ApiResultID === 2 || data.ApiResultID === -1 ||
      data.API_Result_ID === 2 || data.API_Result_ID === -1 ||
      data.ApiResultID === 3 || data.API_Result_ID === 3
    ) {
      return true;
    }

    const msg = (
      (typeof data?.errorMessage === 'string' ? data.errorMessage : '') + ' ' +
      (typeof data?.DeviceMsg === 'string' ? data.DeviceMsg : '') + ' ' +
      (typeof data?.data?.DeviceMsg === 'string' ? data.data.DeviceMsg : '') + ' ' +
      (typeof data?.data?.errorMessage === 'string' ? data.data.errorMessage : '')
    ).toLowerCase();

    return (
      msg.includes('sesi tamat') ||
      msg.includes('token expired') ||
      msg.includes('invalid_grant') ||
      msg.includes('peranti utama') ||
      msg.includes('log masuk di peranti lain')
    );
  };

  const forceLogoutToLogin = async () => {
    // We do not lock this with a ref, because if clearData succeeds, 
    // the next poll will exit early due to missing token.
    console.log('App.js: Invalid device detected. Forcing logout...');
    await clearData();
    reset('Login');
  };

  useEffect(() => {
    let pollInterval;

    const checkMainDeviceStatus = async () => {
      try {
        const token = await getData('token');
        const custId = await getData('CustId');
        
        if (!token || !custId) {
          return;
        }

        const id = await DeviceInfo.getUniqueId();
        const payload = {
          CustId: custId,
          SerNo: '',
          CustName: '',
          cIC: '',
        };

        const response = await CustomerProfileApi(payload);

        // If backend explicitly invalidates the response wrapper
        if (isDeviceSessionInvalid(response)) {
          await forceLogoutToLogin();
          return;
        }

        // It might be { data: [...] } or just [...]
        const dataArr = response?.data || response;

        // Check if the current device matches the registered main device
        if (Array.isArray(dataArr) && dataArr.length > 0) {
          const profile = dataArr[0];
          if (profile.RegDevID && String(profile.RegDevID) !== String(id)) {
            console.log("App.js: Device mismatch detected! Backend RegDevID:", profile.RegDevID, "Current:", id);
            await forceLogoutToLogin();
          }
        }
      } catch (error) {
        // Ignore transient network/API failures.
      }
    };

    checkMainDeviceStatus();

    const appStateSubscription = AppState.addEventListener(
      'change',
      nextAppState => {
        if (nextAppState === 'active') {
          checkMainDeviceStatus();
        }
      },
    );

    return () => {
      appStateSubscription.remove();
    };
  }, []);


  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Forgot"
            component={ForgotPass}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Validation"
            component={Validation}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name="IdValidation"
            component={IdValidation}
            options={{headerShown: false}}
          />
          <Stack.Screen 
          name='PasswordChange'
          component={PassChange}
          options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{headerShown: false}}
          />
            <Stack.Screen
            name="ForgetUser"
            component={ForgotUser}
            options={{headerShown: false}}
          />
               <Stack.Screen
            name="userValidation"
            component={UserValidation}
            options={{headerShown: false}}
          />
               <Stack.Screen
            name="userIdValidation"
            component={UserIdValidation}
            options={{headerShown: false}}
          />
                  <Stack.Screen
            name="usernameChange"
            component={UsernameChange}
            options={{headerShown: false}}
          />
             <Stack.Screen
        name="Privacy"
        component={Privacypolicy}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="Terms"
        component={TermsAndConditions}
        options={{headerShown: false}}
      />
            <Stack.Screen
        name="campaigns"
        component={Campaigns}
        options={{ headerShown: false }}
      />
    
        </Stack.Navigator>
      </NavigationContainer>
      <CustomAlert />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
