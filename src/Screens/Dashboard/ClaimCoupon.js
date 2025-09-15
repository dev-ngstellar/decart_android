import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../../component/Header'
import k1 from '../../Assets/LOGO/kupon-1.png'
import barcode from '../../Assets/LOGO/barcode.png'

const ClaimCoupon = () => {
    return (
        <SafeAreaView style={{flex:1}}>
    <Header Screen='Butiran Kupon' />
    <View style={{height:'30%',width:"100%",flexDirection:'row'}}>
        <View style={{height:'100%',width:'50%',justifyContent:'center',alignItems:'center'}}>
            <Image source={k1} style={{height:'50%',width:'90%'}}/>
        </View>
        <View style={{height:'100%',width:'50%',justifyContent:'center',alignItems:'center'}}>
           <Text style={{fontSize:20,fontWeight:'bold',color:'black',width:'80%'}}>Kupon Istimewa khas untuk anda semua! </Text>
        </View>
    </View>
<View style={{height:'30%',width:"100%",alignItems:'center'}}>
    <Image source={barcode} style={{height:"100%",width:"50%"}}/>
</View>
<View style={{height:'30%',width:"100%"}}>
    <Text style={{fontSize:18,color:'black',fontWeight:'700',marginTop:10,marginLeft:10}}>Tarikh luput : 01 APRIL 2024    11:59PM</Text>
    <Text style={{fontSize:18,color:'black',fontWeight:'700',marginTop:10,marginLeft:10}}>Terdapat diseluruh kedai - kedai PERNAMA </Text>
    <Text style={{fontSize:18,color:'black',fontWeight:'700',marginTop:10,marginLeft:10}}>** Tidak Tersedia</Text>
    <TouchableOpacity
            style={styles.loginBtn}>
            <Text style={styles.loginText}>Guna</Text>
          </TouchableOpacity>
</View>
        </SafeAreaView>
      )
}

export default ClaimCoupon

const styles = StyleSheet.create({
    loginBtn: {
        width: '95%',
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#292A60',
        marginHorizontal:'3%',
        marginTop:10
      },
      loginText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 18,
      },
})