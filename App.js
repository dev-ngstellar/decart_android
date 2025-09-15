import {StyleSheet, Text, View} from 'react-native';
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
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import React, {useEffect, useState} from 'react';
import logo from './src/Assets/logo-1.png';
import {getData} from './src/Utils/localHelper';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { DeviceLogThunk, GetDeviceLogThunk } from './src/Services/DeviceLogService/DeviceSlice';
import { useNavigation } from '@react-navigation/native';
import Campaigns from './src/Screens/Dashboard/Campaigns';

const Stack = createNativeStackNavigator();
const App = () => {
  // const dispatch = useDispatch();
  // const [deviceId, setDeviceId] = useState("");
  // const navigation = useNavigation();
 

  // const state = useSelector(state => state);
  // const {DeviceLogData} = state.deviceLog;
 

  // const fetchDeviceId = async () => {
  //   const id = await DeviceInfo.getUniqueId();
  //   setDeviceId(id);
  // };
  
  // const navigate = async () => {
  //   const token = await getData("token");
  //   if (token) {
  //     navigation.push("Main");
  //   } else {
  //     navigation.navigate("Login");
  //   }
  // };


  // const getDeviceLog = async () => {
  //   const payload = {
  //     DevID: deviceId,
  //   };
  //  await dispatch(DeviceLogThunk({payload}));
  // };
  //  useEffect(() => {
  //   fetchDeviceId();
  //   getDeviceLog()
  //     setTimeout(() => {
  //       navigate()
  //     }, 2000);
  //   }, []);

  // // useEffect(() => {
    
  // // }, []);

  // // useEffect(()=>{
   
  // // },[])


  return (
    <Provider store={store}>
      <NavigationContainer>
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
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
