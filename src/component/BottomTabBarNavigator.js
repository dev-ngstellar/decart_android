import { Image, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Scanner from '../Screens/Scanner/Scanner';
import Dashboard from '../Screens/Dashboard/Dashboard';
import Transition from '../Screens/Transition/Transition';
import Epp from '../Screens/EPP/Epp';
import Settings from '../Screens/Settings/Settings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notification from '../Screens/Dashboard/Notification';
import Discount from '../Screens/Dashboard/Discount';
import Vouchar from '../Screens/Dashboard/Vouchar';
import Coupan from '../Screens/Dashboard/Coupan';
import Reward from '../Screens/Dashboard/Reward';
import EppStatus from '../Screens/EPP/EppStatus';
import Profile from '../Screens/Settings/Profile';
import Location from '../Screens/Settings/Location';
import Privacypolicy from '../Screens/Settings/Privacypolicy';
import TermsAndConditions from '../Screens/Settings/TermsAndConditions';
import TransitionHistory from '../Screens/Settings/TransitionHistory';
import ContactUs from '../Screens/Settings/ContactUs';
import epp from '../Assets/LOGO/epp.png';
import epp01 from '../Assets/LOGO/epp-01.png';
import teatapan from '../Assets/LOGO/tetapan.png';
import teatapan01 from '../Assets/LOGO/Akaun-2.png';
import About from '../Screens/Settings/About';
import passwordChange from '../Screens/Settings/passwordChange';
import home from '../Assets/LOGO/home.png';
import home1 from '../Assets/LOGO/home2.png';
import transition from '../Assets/LOGO/transition.png';
import transition1 from '../Assets/LOGO/transition1.png';
import Info from '../Screens/Settings/Info';
import FamilsDetails from '../Screens/Settings/FamilsDetails';
import FAQ from '../Screens/Settings/FAQ';
import ClaimCoupon from '../Screens/Dashboard/ClaimCoupon';
import ClaimVoucher from '../Screens/Dashboard/ClaimVoucher';
import { TabSvg } from '../Assets';
import ViewFamilyDetails from '../Screens/Settings/ViewFamilyDetails';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DashboardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Discount"
        component={Discount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Vouchar"
        component={Vouchar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Coupan"
        component={Coupan}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Reward"
        component={Reward}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClaimCoupon"
        component={ClaimCoupon}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClaimVoucher"
        component={ClaimVoucher}
        options={{ headerShown: false }}
      />
   
    </Stack.Navigator>
  );
};

const EppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Epp" component={Epp} options={{ headerShown: false }} />
      <Stack.Screen
        name="EppStatus"
        component={EppStatus}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Location"
        component={Location}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Privacy"
        component={Privacypolicy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Terms"
        component={TermsAndConditions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="THistory"
        component={TransitionHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PasswordChange"
        component={passwordChange}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Info"
        component={Info}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Family"
        component={FamilsDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQ}
        options={{ headerShown: false }}
      />
         <Stack.Screen
        name="ViewFamilyDetails"
        component={ViewFamilyDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const BottomTabBarNavigator = ({ setModalVisible }) => {
  const ProfileData = useSelector((state) => state.getCustomerProfile.ProfileData);

  const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
      style={{
        top: -3,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 60,
          height: 60,
          backgroundColor: '#fff',
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: 'red',
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
          }}
        >
          {children}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'lightgrey',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => (
            <Image
              source={tabInfo.focused ? home : home1}
              style={{
                width: 70,
                height: 40,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Transition"
        component={Transition}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => (
            <Image
              source={tabInfo.focused ? transition : transition1}
              style={{
                width: 50,
                height: 50,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={Scanner}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            setModalVisible(true);
          },
        })}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: () => (
            <TabSvg
              fill="#fff"
              style={{
                width: 45,
                height: 30,
              }}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Epp"
        component={EppStack}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (ProfileData[0]?.SerNo === "") {
              e.preventDefault();
              Alert.alert('Tiada Rekod');
            }
          },
        })}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => (
            <Image
              source={tabInfo.focused ? epp : epp01}
              style={{
                width: 50,
                height: 50,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => (
            <Image
              source={tabInfo.focused ? teatapan : teatapan01}
              style={{
                width: 50,
                height: 50,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBarNavigator;

const styles = StyleSheet.create({});
