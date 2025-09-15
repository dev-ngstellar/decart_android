import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft, faEllipsis, faTimes} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import logoepp01 from '../Assets/LOGO/PN.png';

const Header = ({Screen}) => {
  const navigation = useNavigation();
  const containerStyle = {
    ...styles.container,
    backgroundColor: '#292A60',
  };
  return (
    <View style={containerStyle}>
      <View style={styles.centerTab}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
           
          }}>
          <FontAwesomeIcon icon={faChevronLeft} size={30} color="#292A60" />
        </TouchableOpacity>
        {Screen === 'EPP' ? (
  <Image source={logoepp01} style={{ width: 100, height: 40 }}/>
) : Screen === 'Akaun' ? (
  <View style={{flex:1, flexDirection: 'row', alignItems: 'center' ,justifyContent:'space-between'}}>
    <Text style={styles.titleText}>{Screen}</Text>
    <View style={{marginRight:10}}>
      <TouchableOpacity onPress={()=>{navigation.navigate("Info")}}>
    <FontAwesomeIcon  icon={faEllipsis} size={25} color='white'/>
    <Text style={{color:"white"}}>INFO</Text>
    </TouchableOpacity>
    </View>
  </View>
) : Screen === 'Kempen DCER' ? (
  <View style={{flex:1, flexDirection: 'row', alignItems: 'center' ,justifyContent:'space-between'}}>
    <Text style={styles.titleText}>{Screen}</Text>
    <View style={{marginRight:10}}>
      <TouchableOpacity onPress={()=>{navigation.navigate("Main")}}>
        <FontAwesomeIcon icon={faTimes} size={25} color='white'/>
      </TouchableOpacity>
    </View>
  </View>
) : (
  <Text style={styles.titleText}>{Screen}</Text>
)}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 65,
    backgroundColor: '#292A60',
  },
  centerTab: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },

  titleText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
    textTransform:'uppercase'
  },
});