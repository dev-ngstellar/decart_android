import {
  Alert,
  Image,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/Header';
import {GetVouchersThunk} from '../../Services/GetVoucherService/GetVoucherSlice';
import {useDispatch, useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {getData} from '../../Utils/localHelper';
import moment from 'moment';
import {RedeemVoucherThunk} from '../../Services/RedeemVoucherServices/RedeemVoucherSlice';
import backdrop from '../../Assets/LOGO/backdrop.jpg';
import QRCode from 'react-native-qrcode-svg';
import {ActivityIndicator, Modal} from 'react-native-paper';
import Loader from '../../component/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleXmark, faClose } from '@fortawesome/free-solid-svg-icons';
import info from '../../Assets/info.png';
import closeBtn from '../../Assets/close_button.png'

const Vouchar = ({navigation,route}) => {
  const { deviceId } = route.params;
   
  
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const GetVouchersData = useSelector(state => state.getVouchers.GetVouchersData);
  const isLoader = useSelector(state => state.login.isLoader);
  const colorScheme = useColorScheme();
  const lightModeTextColor = 'grey';
  const darkModeTextColor = 'black';
  const textColor =
    colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVoucherCode, setSelectedVoucherCode] = useState(0);

  const [voucharModalVisible, setVoucharModalVisible] = useState(false);
  const [voucharSelectedRemarks, setVoucharSelectedRemarks] = useState(0);

  const getVouchar = async () => {
    const custId = await getData('CustId');
    const payload = {
      CustID: custId,
      DevID: deviceId,
    };
    console.log("Voucher - Get Voucher Payload:", payload);
    const res = await dispatch(GetVouchersThunk({payload}));
  };
  useEffect(() => {
    getVouchar();
  }, [deviceId]);
  const onRefresh = async () => {
    setRefreshing(true);
    await getVouchar();
    setRefreshing(false);
  };
  const modalopen = voucherCode => {
    setSelectedVoucherCode(voucherCode);
    setModalVisible(true);
  };

  const voucharModalopen =(voucherRemarks)=>{
    setVoucharSelectedRemarks(voucherRemarks);
      setVoucharModalVisible(true);
  }

  const handleVoucherClick = async voucherCode => {
    const custId = await getData('CustId');
    const payload = {
      CustID: custId,
      DevID: deviceId,
      VoucherCode: voucherCode,
    };
    console.log("Voucher - Redeem Voucher Payload:", payload);
    const res = await dispatch(RedeemVoucherThunk({payload}));
  
    if (res && res.payload.APIResult == 'Success') {
      Alert.alert('Berjaya', 'Penebusan Baucar Berjaya', [
        {text: 'OK', onPress: () => navigation.navigate('Dashboard')},
      ]);
    } else {
      Alert.alert('Gagal', res.payload.APIResult, [{text: 'OK'}]);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header Screen="Baucar" />
      <ImageBackground source={backdrop} style={{height: '100%'}}>
        {isLoader && <Loader />}
        <ScrollView style={{flex: 1, paddingHorizontal: '3%'}} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }>
          {GetVouchersData && GetVouchersData.length > 0  &&
            GetVouchersData.map((vouchor, index) => (
              <View key={index}>
                {console.log("Vouchar Code :: "+vouchor.VoucherCode+" :: ")}
                {/* &&  vouchor.VoucherCode !== "Tiada Baucar" */}
                  {vouchor && vouchor.VoucherCode &&  vouchor.VoucherCode !== "Tiada Baucar" ?
                  <TouchableOpacity style={{position:'absolute', zIndex:1, marginTop:5}} onPress={()=> voucharModalopen(vouchor.Remarks)} >
                   <Image source={info} style={{height:24, width:24, }}/>  
                  </TouchableOpacity>
                  : <></>}
                <View style={styles.card}>
                  <Image
                    source={{uri: `data:image/png;base64,${vouchor.Data}`}}
                    style={{height: 100, width: 150}}
                  />
                  <View>
                 { vouchor.APIResultID === 1 &&  <Text style={[styles.couponDate, {color: textColor}]}>
                      {moment(
                        vouchor.VoucherDate,
                        'DD-MM-YYYY HH:mm:ss',
                      ).format('DD/MM/YYYY')}
                    </Text>}
                   { vouchor.APIResultID === 1 && <Text style={{...styles.customerId, color: textColor}}>
                      RM {parseFloat(vouchor.VoucherValue).toFixed(2)}
                    </Text>}
                    {vouchor.APIResultID === 1 && (
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => modalopen(vouchor.VoucherCode)}>
                        <Text style={styles.buttonText}>Tebus Baucar</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                {/* <View>
                  <Text
                    style={{
                      color: textColor,
                      fontSize: 16,
                      paddingLeft: 10,
                      fontWeight: '500',
                    }}>
                    {vouchor.Remarks}
                  </Text> 
                </View> */}
              </View>
            ))
         }
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <QRCode value={selectedVoucherCode} size={200} />
              <View
                style={{
                  width: 200,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  height: 50,
                  marginTop: 30,
                }}>
                {/* <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handleVoucherClick(selectedVoucherCode)}>
                  <Text style={styles.buttonText}>Tebus</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                    <FontAwesomeIcon icon={faCircleXmark} size={50} color='red' />
                  {/* <Text style={styles.buttonText}>Close</Text> */}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>


        <Modal
        animationType='slide'
        transparent={true}
        visible={voucharModalVisible}
        onRequestClose={() => {
          setModalVisible(!voucharModalVisible);
        }}
      >
        <View style={styles.centeredView}>
       
          <View style={styles.voucharModalView}>

          <TouchableOpacity style={{position:'absolute', zIndex:1, marginTop:10, alignSelf:'flex-end', right:10}} onPress={()=> setVoucharModalVisible(!voucharModalVisible)} >
              <Image source={closeBtn} style={{height:24, width:24, }}/>  
              </TouchableOpacity>
              <ScrollView>
          <Text style={{color:textColor,fontSize:16,paddingLeft:10,fontWeight:'500'}}>
                {voucharSelectedRemarks}
              </Text>
              </ScrollView>   
      
          </View>
         
        </View>
        
      </Modal>


      </ImageBackground>
    </SafeAreaView>
  );
};

export default Vouchar;

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  customerId: {
    fontSize: 16,
  },
  noCouponText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: 'black',
  },
  button: {
    backgroundColor: '#292A60',
    padding: 6,
    borderRadius: 8,
    marginTop: 10,
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
    justifyContent: 'space-between',
  },
  voucharModalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
    height:300,
    width:300
  },
});