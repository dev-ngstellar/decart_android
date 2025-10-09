import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../component/Header'
import pernama from '../../Assets/pernama.png'
import logo from '../../Assets/logo-17.png'
import logo1 from '../../Assets/logo-18.png'
import logo2 from '../../Assets/logo-19.png'
import logo3 from '../../Assets/logo-20.png'
import { Divider } from 'react-native-paper'
import logo4 from '../../Assets/verified.png'

const About = () => {
  return (
   <SafeAreaView style={{flex:1}}>
<Header Screen="Tetang Kami" />
<ScrollView>
  <View style={{height:"15%",alignItems:'center',justifyContent:'flex-end',flexDirection:'row'}}>
<Image  source={pernama} style={{height:250,width:150,marginRight:100}}/>
<Image source={logo4} style={{marginBottom:80,marginRight:5}} />
</View>
<View style={{height:"5%",alignItems:'center',justifyContent:'space-evenly',flexDirection:'row'}}>
<Image  source={logo} style={{height:35, width:35}}/>
<Image  source={logo1} style={{height:35, width:35}}/>
<Image  source={logo2} style={{height:35, width:35}}/>
<Image  source={logo3} style={{height:35, width:35}}/>
</View>
<View style={{height:'5%',width:'90%',marginHorizontal:'5%',justifyContent:'space-around',marginTop:10}}>
    <Text style={{fontSize:15,color:'#292A60',fontWeight:'500',width:'60%'}}>ABOUT PERWIRA NIAGA MALAYSIA
(PERNAMA)</Text>
<Divider style={{borderWidth:0.5,borderColor:'black'}}/>
</View>
<View style={{height:700,width:'90%',marginHorizontal:'5%'}}>
<Text style={{color:'black',textAlign:'left'}}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis
nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in
hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat
nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent
luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy
nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis
nisl ut aliquip ex ea commodo consequat.
Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis
nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in
hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat
nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent
luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
Lorem ipsum dolor sit amet, cons ectetuer ad ipiscing elit, sed diam nonummy
nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis
nisl ut aliquip ex ea commodo consequat.
Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis
nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in
hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat
nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent
luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</Text>
</View>
</ScrollView>
   </SafeAreaView>
   
  )
}

export default About

const styles = StyleSheet.create({})