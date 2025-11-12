import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import Header from '../../component/Header'
import { useSelector } from 'react-redux';
import backdrop from '../../Assets/LOGO/backdrop.jpg'

const EppStatus = () => {
  const isLoader = useSelector(state => state.login.isLoader);
    const colorScheme = useColorScheme();
    const lightModeTextColor = 'grey';
    const darkModeTextColor = 'black';
    const textColor = colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;
    const state = useSelector(state => state);
    const {GetBakiData} = state.getBaki

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <Header Screen='EPP' />
        {isLoader && <Loader />}
        <ImageBackground source={backdrop} style={{height:'100%'}}>
        <View style={{height:"7%",width:'95%',marginHorizontal:"3%",backgroundColor:'lightgrey',marginTop:10,borderRadius:10,borderColor:"grey",borderWidth:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:18,color:"#292A60",fontWeight:'400'}}>Baki EPP</Text>
        </View>
        {/* <ScrollView> */}
    <ScrollView>
      {GetBakiData && GetBakiData.length > 0 ? (
        GetBakiData.map((data, index) => {
          return (
            <View
              key={index}
              style={{height:120,width:"95%",borderBottomWidth:0.5,marginHorizontal:'3%',flexDirection:'row',justifyContent:'space-around'}}>
              <View style={{width:"70%",height:'100%',justifyContent:'space-around'}}>
                <Text style={{fontSize:16,color:textColor}}>Tarikh:</Text>
                <Text style={{fontSize:16,color:textColor}}>No Perjanjian:</Text>
                <Text style={{fontSize:16,color:textColor}}>
                  Baki EPP {data && data.AgrmDate ? `(${data.AgrmDate.split(" ")[0]})` : ''}:
                </Text>
                <Text style={{fontSize:16,color:textColor}}>Jangkaan Tarikh Akhir Ansuran:</Text>
              </View>
              <View style={{width:"30%",height:'100%',justifyContent:'space-around',alignItems:"flex-end"}}>
                <Text style={{fontSize:16,color:textColor,fontWeight:"500"}}>{data.AgrmDate.split(" ")[0]}</Text>
                <Text style={{fontSize:16,color:textColor,fontWeight:"500"}}>{data.AgrmNo}</Text>
                <Text style={{fontSize:16,color:textColor,fontWeight:"500"}}>RM {data.BalAmt.toLocaleString()}</Text>
                <Text style={{fontSize:16,color:textColor,fontWeight:"500"}}>{data.EstEndDate}</Text>
              </View>
            </View>
          )
        })
      ) : (
        <View style={{height:200, width:'100%', justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:16, color:textColor}}>Tiada Rekod</Text>
        </View>
      )}
      <View style={{height:200}}></View>
    </ScrollView>
   {/* </ScrollView> */}
   </ImageBackground>
    </SafeAreaView>
  )
}

export default EppStatus

const styles = StyleSheet.create({
    toggles: {
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      togglebutton: {
        height: 50,
        width: 125,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
      },
})