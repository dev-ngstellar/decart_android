import { Alert, Image, ImageBackground, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header';
import DeviceInfo from 'react-native-device-info';
import { getData } from '../../Utils/localHelper';
import { GetCouponThunk } from '../../Services/GetCouponService/GetCouponSlice';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { RedeemCouponThunk } from '../../Services/RedeemCouponServices/RedeemCouponSlice';
import backdrop from '../../Assets/LOGO/backdrop.jpg'
import QRCode from 'react-native-qrcode-svg';
import {  Modal } from 'react-native-paper';
import Loader from '../../component/Loader';
import info from '../../Assets/info.png';
import closeBtn from '../../Assets/close_button.png'

const Coupan = ({navigation,route}) => {
  const { deviceId } = route.params;
  const dispatch=useDispatch()
  const state = useSelector(state => state);
  const {GetCouponData} = state.getCoupon;
  const isLoader = useSelector(state => state.login.isLoader);


  const colorScheme = useColorScheme();
  const lightModeTextColor = 'grey';
  const darkModeTextColor = 'black';
  const textColor = colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;

  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVoucherCode, setSelectedVoucherCode] = useState(0);

  const [coupanModalVisible, setCoupanModalVisible] = useState(false);
  const [coupanSelectedRemarks, setcoupanSelectedRemarks] = useState(0);

  const getVouchar = async () => {
    const custId=await getData("CustId")
    const payload = {
      CustID:custId, 
      DevID:deviceId
    };
    console.log("Coupon - Get Coupon Payload:", payload);
   const couponRes = await dispatch(GetCouponThunk({payload}));
    console.log("Payload being sent to GetCouponThunk:", payload);
    console.log("Coupen Result :: "+JSON.stringify(couponRes));

  };
  useEffect(()=>{
    getVouchar()
  },[deviceId])


  const onRefresh = async () => {
    setRefreshing(true);
    await getVouchar();
    setRefreshing(false);
  };

  const modalopen =(voucherCode)=>{
    setSelectedVoucherCode(voucherCode);
      setModalVisible(true);
  }

  const coupanModalopen =(voucherRemarks)=>{
    setcoupanSelectedRemarks(voucherRemarks);
      setCoupanModalVisible(true);
  }

  const handleCouponClick = async (couponCode) => {
    const custId=await getData("CustId")
       const payload ={
      CustID:custId, 
       DevID:deviceId,
       CouponCode:couponCode
      }
      console.log("Coupon - Redeem Coupon Payload:", payload);
      const res =await dispatch(RedeemCouponThunk({payload}));
      if(res && res.payload.APIResult== "Success"){
        Alert.alert(
          "Berjaya",
          "Penebusan Kupon Berjaya",
          [
            { text: "OK", onPress: () => navigation.navigate('Dashboard') }
          ]
        );
      }else{
        Alert.alert(
          "Gagal",
          res.payload.APIResult,
          [
            { text: "OK"}
          ]
        );
      }
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <Header Screen='Kupon' />
    <ImageBackground source={backdrop} style={{height:'100%'}}>
  {isLoader && <Loader />}
    <ScrollView style={{ flex: 1, paddingHorizontal: '3%' }} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }>
        {GetCouponData && GetCouponData.length > 0 &&
          GetCouponData.map((coupon, index) => (
            <View key={index}>
              <TouchableOpacity style={{position:'absolute', zIndex:1, marginTop:5}} onPress={()=> coupanModalopen(coupon.Remarks)} >
              <Image source={info} style={{height:24, width:24, }}/>  
              </TouchableOpacity>
            <View  style={styles.card}>
              
              <Image source={{uri:`data:image/png;base64,${coupon.Data}`}} style={{height:130,width:180}} />
              <View>
             {coupon.APIResultID === 1 && <Text style={[styles.couponDate, { color: textColor }]}>
                {moment(coupon.CouponDate, 'DD-MM-YYYY HH:mm:ss').format('DD/MM/YYYY')}
              </Text>}

              {coupon.APIResultID === 1 && <Text style={[styles.couponDate, { color: textColor }]}>
                {"RM "+Number(coupon.CouponValue).toFixed(2)}
              </Text>}

            { coupon.APIResultID === 1 && <TouchableOpacity style={styles.button} onPress={() => modalopen(coupon.CouponCode)} >
                <Text style={styles.buttonText}>Tebus Kupon</Text>
              </TouchableOpacity>}
              </View>
            </View>
            <View>
            {/* <Text style={{color:textColor,fontSize:16,paddingLeft:10,fontWeight:'500'}}>
                {coupon.Remarks}
              </Text> */}
              </View>
            </View>
          ))
        }
      </ScrollView>
       <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <QRCode value={selectedVoucherCode} size={200} />
            <View style={{width:200,alignItems:'center',height:50,marginTop:20}}>
            {/* <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={()=>handleCouponClick(selectedVoucherCode)}
            >
              <Text style={styles.buttonText}>Tebus</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>Tutup</Text>
            </TouchableOpacity>
            </View>
      
          </View>
        </View>
      </Modal>

      {/* Coupan dialog for remarks info */}

      <Modal
        animationType='slide'
        transparent={true}
        visible={coupanModalVisible}
        onRequestClose={() => {
          setModalVisible(!coupanModalVisible);
        }}
      >
        <View style={styles.centeredView}>
       
          <View style={styles.modalView}>

          <TouchableOpacity style={{position:'absolute', zIndex:1, marginTop:10, alignSelf:'flex-end', right:10}} onPress={()=> setCoupanModalVisible(!coupanModalVisible)} >
              <Image source={closeBtn} style={{height:24, width:24, }}/>  
              </TouchableOpacity>
              <ScrollView>
          <Text style={{color:textColor,fontSize:16,paddingLeft:10,fontWeight:'500'}}>
                {coupanSelectedRemarks}
              </Text>
              </ScrollView>   
            

            {/* <View style={{width:200,flexDirection:"row",justifyContent:"space-between",alignItems:'center',height:50,marginTop:20}}> */}
            {/* <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={()=>handleCouponClick(selectedVoucherCode)}
            >
              <Text style={styles.buttonText}>Tebus</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setCoupanModalVisible(!coupanModalVisible)}
            >
              <Text style={styles.buttonText}>Tutup</Text>
            </TouchableOpacity> */}
            {/* </View> */}
      
          </View>
         
        </View>
        
      </Modal>

      </ImageBackground>
  </SafeAreaView>
  )
}

export default Coupan

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
      card: {
        backgroundColor: 'lightgrey',
        padding: 10,
        marginVertical: 10,
        borderRadius: 8,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
      },
      couponCode: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      couponDate: {
        fontSize: 16,
        marginBottom: 5,
      },
      couponValue: {
        fontSize: 16,
        marginBottom: 3,
      },
      customerId: {
        fontSize: 16,
      },
      noCouponText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color:'black'
      },
      button: {
        backgroundColor: '#292A60',
        padding: 6,
        borderRadius: 8,
       marginTop:10
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        justifyContent:'space-between'
      },
})