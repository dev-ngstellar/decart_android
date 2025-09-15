import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faUser } from '@fortawesome/free-solid-svg-icons';

const UserIdValidation = ({navigation}) => {
    const [textInputValue, setTextInputValue] = useState('');

    const colorScheme = useColorScheme()
    const lightModeTextColor = 'grey';
    const darkModeTextColor = 'black';
    const textColor = colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: '7%', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size={25}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ height: 100, width: '95%', marginHorizontal: '3%' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold',color:textColor}}>Pengesahan</Text>
        <Text style={{ fontSize: 16 ,color:textColor}}>untuk mengesahkan  akaun anda sila masukkan no tentera atau kad pengenalan</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.inputContainer}>
          <FontAwesomeIcon
            icon={faUser}
            size={24}
            color="black"
            style={styles.icon}
          />
          <TextInput
            style={{...styles.textInput,color:textColor}}
            name="pengguna"
            placeholderTextColor="#000"
            // value={textInputValue}
            // onChangeText={handleTextInputChange}
            // onBlur={handleBlur}
          />
        </View>
      </View>
      <View style={{height:"50%",width:'100%',alignItems:'center',justifyContent:'center'}}>
      <TouchableOpacity style={styles.loginBtn} onPress={()=>{ navigation.navigate('usernameChange')}}>
              <Text style={styles.loginText}>sahkan</Text>
            </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default UserIdValidation

const styles = StyleSheet.create({
    inputContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
      },
      textInput: {
        flex: 1,
        height: 50,
      },
      icon: {
        marginRight: 10,
      },
      loginBtn: {
        width: '50%',
        borderRadius: 5,
        marginVertical: '3%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#292A60',
      },
      loginText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18,
      },
})