import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import Header from '../../component/Header';
import Vouchar from '../../Assets/vouchar.jpg'

const Reward = () => {
  const colorScheme = useColorScheme();
  const lightModeTextColor = 'grey';
  const darkModeTextColor = 'black';
  const textColor = colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;
    const [selectedButton, setSelectedButton] = useState('Baucar');
  const renderContent = () => {
    if (selectedButton === 'Baucar') {
      return (
      <View style={{height:'30%',width:'100%',borderBottomWidth:2,borderColor:'lightgrey'}}>
<Text style={{fontSize:16,fontWeight:'bold',color:'#292A60',padding:5}}>E-baucar</Text>
<View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
<Image  source={Vouchar} style={{height:100,width:100,borderRadius:100}}/>
<View style={{width:'50%',justifyContent:"center",alignItems:'center'}}>
    <Text style={{fontSize:16,fontWeight:"500",color:'red'}}>GANJARAN SELAMAT DATANGF&N Orange 1.5l </Text>
    <Text style={{fontSize:15,color:textColor,fontWeight:'normal'}}>Harga Tunai : RM2.00</Text>
<Text style={{fontSize:15,color:'#292A60',fontWeight:'bold',marginTop:15}}>TEBUS</Text>
</View>
</View>
      </View>
      )
    } else if(selectedButton === 'kupon') {
      return (
        <View style={{height:'30%',width:'100%',borderBottomWidth:2,borderColor:'lightgrey'}}>
        <Text style={{fontSize:16,fontWeight:'bold',color:'#292A60',padding:5}}>E-kupon</Text>
        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
        <Image  source={Vouchar} style={{height:100,width:100,borderRadius:100}}/>
        <View style={{width:'50%',justifyContent:"center",alignItems:'center'}}>
            <Text style={{fontSize:16,fontWeight:"500",color:'red'}}>GANJARAN SELAMAT DATANGF&N Orange 1.5l </Text>
            <Text style={{fontSize:15,color:textColor,fontWeight:'normal'}}>Harga Tunai : RM2.00</Text>
        <Text style={{fontSize:15,color:'#292A60',fontWeight:'bold',marginTop:15}}>TEBUS</Text>
        </View>
        </View>
              </View>
      )
    }
    else{
      return null
    }
  };
  return (
    <SafeAreaView style={{flex:1}}>
      <Header Screen='Ganjaran' />
      <View style={styles.toggles}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#CDCDCD',
            width: 260,
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <TouchableOpacity
            style={[
              styles.togglebutton,
              selectedButton === 'Baucar'
                ? {backgroundColor: '#DFDFDF'}
                : {backgroundColor: '#CDCDCD'},
            ]}
            onPress={() => setSelectedButton('Baucar')}>
            <Text
              style={{
                color: selectedButton === 'Baucar' ? '#292A60' : 'gray',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
             Baucar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.togglebutton,
              selectedButton === 'kupon'
                ? {backgroundColor: '#DFDFDF'}
                : {backgroundColor: '#CDCDCD'},
            ]}
            onPress={() => setSelectedButton('kupon')}>
            <Text
              style={{
                color: selectedButton === 'kupon' ? '#292A60' : 'gray',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              kupon
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{height: '70%', width: '95%', marginHorizontal: '3%'}}>
        {renderContent()}
      </View>
    </SafeAreaView>
  )

}

export default Reward

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