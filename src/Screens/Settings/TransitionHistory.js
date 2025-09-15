import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import Header from '../../component/Header';
import vouchar from '../../Assets/vouchar1.jpg'
import { TextInput } from 'react-native-paper';

const TransitionHistory = () => {
  const colorScheme = useColorScheme();
  const lightModeTextColor = 'grey';
  const darkModeTextColor = 'black';
  const textColor = colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;
  const [selectedButton, setSelectedButton] = useState('Baucar');
  const renderContent = () => {
      if (selectedButton === 'Baucar') {
        return (
        <View style={{height:'35%',width:'100%',borderBottomWidth:2,borderColor:'lightgrey'}}>
          <View style={{flexDirection:'row',justifyContent:"space-between"}}>
          <Text style={{fontSize:16,fontWeight:'bold',padding:5}}>Baucar-1</Text>
          <Text style={{fontSize:16,fontWeight:'bold',padding:5,width:'40%',color:'#292A60'}}>BAUCAR LUPUT /TELAH DIGUNA</Text>
          </View>
  <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:10}}>
  <Image  source={vouchar} style={{height:100,width:100,borderRadius:100}}/>
  <View style={{width:'50%',justifyContent:"center",alignItems:'center'}}>
      <Text style={{fontSize:16,fontWeight:"500",color:textColor}}>GANJARAN SELAMAT DATANGF&N Orange 1.5l </Text>
      <Text style={{fontSize:15,color:textColor,fontWeight:'normal',marginRight:35}}>Harga Tunai : RM2.00</Text>
  </View>
  </View>
        </View>
        )
      } else if(selectedButton === 'kupon') {
        return (
          <View style={{height:'35%',width:'100%',borderBottomWidth:2,borderColor:'lightgrey'}}>
          <View style={{flexDirection:'row',justifyContent:"space-between"}}>
          <Text style={{fontSize:16,fontWeight:'bold',padding:5}}>Baucar-1</Text>
          <Text style={{fontSize:16,fontWeight:'bold',padding:5,width:'40%',color:'#292A60'}}>KUPON LUPUT /TELAH DIGUNA</Text>
          </View>
  <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:10}}>
  <Image  source={vouchar} style={{height:100,width:100,borderRadius:100}}/>
  <View style={{width:'50%',justifyContent:"center",alignItems:'center'}}>
      <Text style={{fontSize:16,fontWeight:"500",color:textColor}}>GANJARAN SELAMAT DATANGF&N Orange 1.5l </Text>
      <Text style={{fontSize:15,color:textColor,fontWeight:'normal',marginRight:35}}>Harga Tunai : RM2.00</Text>
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
  <Header Screen='transaksi' />
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

export default TransitionHistory

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