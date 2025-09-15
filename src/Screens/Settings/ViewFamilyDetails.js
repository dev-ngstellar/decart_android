import { Alert, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import { useDispatch, useSelector } from 'react-redux';
import backdrop from '../../Assets/LOGO/backdrop.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DeviceInfo from 'react-native-device-info';
import { DeleteFamilyProfileThunk } from '../../Services/GetFamilyProfileService/GetFamilySlice';
import Loader from '../../component/Loader';

const ViewFamilyDetails = ({navigation}) => {
  const dispatch = useDispatch()
    const GetFamilyProfileData = useSelector(state=>state.getFamilyProfile.GetFamilyProfileData);
    const isLoader = useSelector(state => state.login.isLoader);
    const [deviceId, setDeviceId] = useState("");

    useEffect(() => {
      const fetchDeviceId = async () => {
        const id = await DeviceInfo.getUniqueId();
        setDeviceId(id);
      };
      fetchDeviceId();
    }, [])

    const handleDelete = async(profileId) => {
   const payload ={
    CustId:profileId.CustId,
    FamilyID:profileId.FamilyID,
    DevID:deviceId
   }
const response = await dispatch(DeleteFamilyProfileThunk({payload}))
if(response){
  Alert.alert(response.payload.ResultMsg)
navigation.navigate("Settings")
}
    };
  return (
    
    <SafeAreaView style={{ flex: 1 }}>
      {isLoader && <Loader />}
    <Header Screen="Butiran Keluarga" />
    <ImageBackground source={backdrop} style={{ height: '100%' }}>
      {GetFamilyProfileData && GetFamilyProfileData.map((profile, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>{profile.FamilyName}</Text>
          <Text style={styles.label}>({profile.FamilyICNo}) - {profile.FamilyType}</Text>
          <Text style={styles.label}>{profile.FamilyEmail}</Text>
          <View style={styles.phoneRow}>
            <Text style={styles.label}>{profile.FamilyPhoneNo}</Text>
            <TouchableOpacity onPress={() => handleDelete(profile)}>
              <FontAwesomeIcon icon={faTrash} size={20} color="red" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ImageBackground>
  </SafeAreaView>
  )
}

export default ViewFamilyDetails

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'lightgrey',
        padding: 10,
        marginVertical: 10,
        borderRadius: 8,
        width:'95%',
        marginHorizontal:'3%',
        justifyContent: 'space-between',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'black'
      },
      label: {
        fontSize: 16,
        marginBottom: 5,
        color:'black'
      },
      noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      phoneRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
})