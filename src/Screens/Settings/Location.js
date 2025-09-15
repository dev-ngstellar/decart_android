import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native'
import React from 'react'
import Header from '../../component/Header'
import { faCircleCheck, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import logo2 from '../../Assets/profile.png'
import logo3 from '../../Assets/logo-15.png'
import logo4 from '../../Assets/map.png'
import { useSelector } from 'react-redux'
import { WebView } from 'react-native-webview';
import backdrop from '../../Assets/LOGO/backdrop.jpg'

const Location = () => {
  const state = useSelector(state => state);
  const {ProfileData} = state.getCustomerProfile;
  const colorScheme = useColorScheme();
  const lightModeTextColor = 'grey';
  const darkModeTextColor = 'black';
  const textColor = colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;

  return (
  <SafeAreaView style={{flex:1}}>
    <Header Screen="Lokasi"/>
    <ImageBackground source={backdrop} style={{height:'100%'}}> 
    <ScrollView>
    <View style={{height:550,backgroundColor:'red',marginTop:30}}>
    <WebView source={{ uri:'https://maps.app.goo.gl/LspYfjvfJAF8XmRw6?g_st=iwb'}} style={{ flex: 1 }} />
    </View>            
    </ScrollView>
    </ImageBackground>
  </SafeAreaView>
  )
}

export default Location

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop:75
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: 45,
  },
})