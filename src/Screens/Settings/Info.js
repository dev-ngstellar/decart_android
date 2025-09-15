import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../../component/Header'
import logo from '../../Assets/LOGO/Notifikasi.png'
import logo1 from '../../Assets/LOGO/contact.png'
import logo2 from '../../Assets/LOGO/Lokasi.png'
import logo3 from '../../Assets/LOGO/terms.png'
import logo4 from '../../Assets/LOGO/privacy.png'
import logo5 from '../../Assets/LOGO/FAQs.png'
import backdrop from '../../Assets/LOGO/backdrop.jpg'

const Info = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1}}>
        <Header Screen='Info' />
        <ImageBackground source={backdrop} style={{height:'100%'}}> 
        <View style={{width:'95%',marginHorizontal:'3%'}}>
        <TouchableOpacity style={{height:"9%",backgroundColor:'#292A60',width:'100%',marginTop:20,borderRadius:10,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}} onPress={()=>{navigation.navigate("Notification")}} >
<Text style={{fontSize:16,color:'white',marginLeft:10}}>Notifikasi</Text>
<Image source={logo} style={{height:40,width:40,marginRight:15}} />
</TouchableOpacity>
<TouchableOpacity style={{height:"9%",backgroundColor:'#292A60',width:'100%',marginTop:20,borderRadius:10,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}  onPress={()=>{navigation.navigate("ContactUs")}}>
<Text style={{fontSize:16,color:'white',marginLeft:10}}>Hubungi Kami</Text>
<Image source={logo1} style={{height:40,width:40,marginRight:15}} />
</TouchableOpacity>
<TouchableOpacity style={{height:"9%",backgroundColor:'#292A60',width:'100%',marginTop:20,borderRadius:10,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}  onPress={()=>{navigation.navigate("Location")}}>
<Text style={{fontSize:16,color:'white',marginLeft:10}}>Lokasi</Text>
<Image source={logo2} style={{height:40,width:40,marginRight:15}} />
</TouchableOpacity>
<TouchableOpacity style={{height:"9%",backgroundColor:'#292A60',width:'100%',marginTop:20,borderRadius:10,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}  onPress={()=>{navigation.navigate("Terms")}}>
<Text style={{fontSize:16,color:'white',marginLeft:10}}>Terma dan Syarat</Text>
<Image source={logo3} style={{height:40,width:40,marginRight:15}} />
</TouchableOpacity>
<TouchableOpacity style={{height:"9%",backgroundColor:'#292A60',width:'100%',marginTop:20,borderRadius:10,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}} onPress={()=>{navigation.navigate("Privacy")}} >
<Text style={{fontSize:16,color:'white',marginLeft:10}}>Dasar Privasi</Text>
<Image source={logo4} style={{height:40,width:40,marginRight:15}} />
</TouchableOpacity>
<TouchableOpacity style={{height:"9%",backgroundColor:'#292A60',width:'100%',marginTop:20,borderRadius:10,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}} onPress={()=>{navigation.navigate("FAQ")}} >
<Text style={{fontSize:16,color:'white',marginLeft:10}}>FAQs</Text>
<Image source={logo5} style={{height:35,width:35,marginRight:15}} />
</TouchableOpacity>
<Text style={{fontSize:16,color:"black",textAlign:'right',marginRight:10,marginTop:20}}>v1.3</Text>
        </View>
        </ImageBackground>
    </SafeAreaView>
  )
}

export default Info

const styles = StyleSheet.create({})