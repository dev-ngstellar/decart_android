import { ImageBackground, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header';
import { useDispatch, useSelector } from 'react-redux';
import { GetPointHistoryThunk, GetPointsThunk } from '../../Services/GetPointsService/GetPointSlice';
import DeviceInfo from 'react-native-device-info';
import { getData } from '../../Utils/localHelper';
import { GetSalesHistoryThunk } from '../../Services/GetSalesHistory/SalesHistorySlice';
import backdrop from '../../Assets/LOGO/backdrop.jpg'
import Loader from '../../component/Loader';
import { Table, Row, Rows } from 'react-native-table-component';
import RewardHistoryTab from './components/RewardHistoryTab';


const Transition = ({route}) => {
  // const { deviceId } = route.params;
  const dispatch=useDispatch()
  const [refreshing, setRefreshing] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const isLoader = useSelector(state => state.login.isLoader);
  const PointsData = useSelector(state => state.getPoints.PointsData);
  const PointsHistoryData = useSelector(state => state.getPoints.PointsHistoryData);
  const SalesHistoryData = useSelector(state => state.getSalesHistory.SalesHistoryData);

  const tableHead = ['Tarikh luput mata', 'Mata Ganjaran'];
  const tableData = PointsHistoryData?.map(history => {
    const points = history.Points;
    const isNegative = Number(points) < 0;
    const displayPoints = isNegative ? (
      <Text style={[styles.tableCellText, { color: 'red' }]}>({Math.abs(points)})</Text>
    ) : (
      points
    );
    return [history.ExpPeriod, displayPoints];
  });

  const colorScheme = useColorScheme();
  const lightModeTextColor = 'grey';
  const darkModeTextColor = 'black';
  const textColor = colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;
  const [selectedButton, setSelectedButton] = useState('Mata ganjaran');
  
 const TotalAmount = SalesHistoryData?.reduce((sum, item) => sum + item.TotalAmt, 0).toFixed(2);


 useEffect(() => {
  const fetchDeviceId = async () => {
    const id = await DeviceInfo.getUniqueId();
    setDeviceId(id);
  };
  fetchDeviceId();
}, []);
  const getPoints = async () => {
    const custId=await getData("CustId")
    const payload = {
      CustID:custId, 
      DevID:deviceId
    }
    const id = deviceId || await DeviceInfo.getUniqueId();
    console.log("Transition - Get Points Payload:", payload);
    await dispatch(GetPointsThunk({payload}));
  };

  const getSalesHistory = async () => {
    const custId = await getData('CustId');
    const payload = {
      CustID: custId,
      DevID: deviceId,
    };
    console.log("Transition - Get Sales History Payload:", payload);
    await dispatch(GetSalesHistoryThunk({payload}));
  };

  const getPointsHistory = async () => {
    const custId = await getData('CustId');
    const payload = {
      CustID: custId,
      DevID: deviceId,
    };
    console.log("Transition - Get Points History Payload:", payload);
    await dispatch(GetPointHistoryThunk({payload}));
  };



  useEffect(()=>{
    getPoints()
    getSalesHistory()
    getPointsHistory()
  },[deviceId])

  const onRefresh = async () => {
    setRefreshing(true);
    await getPoints()
    await getSalesHistory()
    getPointsHistory()
    setRefreshing(false);
  };
  const renderContent = () => {
    if (selectedButton === 'Mata ganjaran') {
      return (
<ScrollView style={{height:'100%'}} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
        } >
  <View style={{backgroundColor:'white',height:150}}>
  {PointsData && PointsData.length > 0 && (
        PointsData.map((points, index) => (
          <View key={index} style={styles.card}>
            <View style={{height:'100%',width:'50%',alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:28,fontWeight:'800',color:'black'}}>Baki Mata</Text>

            </View>
            <View style={{height:'100%',width:'50%',alignItems:'center',justifyContent:'center'}}>
            {/* <Text style={{fontSize:16,fontWeight:'bold',color:'#292A60'}}>Tarikh luput mata</Text>
            <Text style={{fontSize:14,fontWeight:'500',color:'black'}}>{points.ExpDate}</Text> */}
                        <Text style={{fontSize:33,fontWeight:'800',color:'brown'}}>{points.Points}</Text>
            </View>
          </View>
        ))
      )}
  </View>
  <ScrollView style={{flex:1}}   >
  <View style={{height:'75%'}}>
  {PointsHistoryData && PointsHistoryData.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Table borderStyle={{ borderWidth: 1, borderColor: 'black' }}>
            <Row data={tableHead} style={styles.tableHeader} textStyle={styles.tableHeaderText} />
            <Rows data={tableData}style={styles.tableHeader}  textStyle={styles.tableCellText} />
          </Table>
        </View>
      )}

  </View>
  </ScrollView>
    
        

    
   
    </ScrollView>
      )
    } else if (selectedButton === 'History') {
      return (
        <RewardHistoryTab
          deviceId={deviceId}
          refreshing={refreshing}
          onRefreshParent={onRefresh}
        />
      );
    } else if(selectedButton === 'Sejarah pembelian') {
      return (
        <ScrollView  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
        }
        >
        <View style={{height: 'auto'}}>
        { SalesHistoryData && SalesHistoryData.map((data,index)=>{
    return(
     <View key={index} style={{height:100,width:"95%",borderBottomWidth:0.5,marginHorizontal:'3%',flexDirection:'row',justifyContent:'space-around'}}>
     <View style={{width:"35%",height:'100%',justifyContent:'space-around'}}>
       <Text style={{fontSize:16,color:textColor}}>Tarikh:</Text>
       <Text style={{fontSize:16,color:textColor}}>No Resit:</Text>
       <Text style={{fontSize:16,color:textColor}}>Nilai Pembelian:</Text>
     </View>
     <View style={{width:"70%",height:'100%',justifyContent:'space-around',alignItems:"flex-end"}}>
     <Text style={{fontSize:16,color:textColor,fontWeight:"500"}}>{data.SaleDate}</Text>
       <Text style={{fontSize:16,color:textColor,fontWeight:"500"}}>{data.ResitNo}</Text>
       <Text style={{fontSize:16,color:textColor,fontWeight:"500"}}>RM {data.TotalAmt.toFixed(2)}</Text>
     </View>
   </View>)
  }) }
          <View
            style={{
              height: 130,
              width: '95%',
              marginHorizontal: '3%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: textColor}}>
              Jumlah Pembelian
            </Text>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '900',
                color: 'brown',
                marginRight: 20,
                marginTop: 6,
              }}>
              RM {TotalAmount}
            </Text>
          </View>
        </View>
      </ScrollView>
      )
    }
    else{
      return null
    }
  };
  return (
    <SafeAreaView style={{flex:1}}>
    <Header Screen='Transaksi' />
    {isLoader && <Loader />}
    <ImageBackground  source={backdrop} style={{height:'100%'}}>
    <View style={styles.toggles}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#CDCDCD',
          width: "95%",
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <TouchableOpacity
          style={[
            styles.togglebutton,
            selectedButton === 'Mata ganjaran'
              ? {backgroundColor: '#DFDFDF'}
              : {backgroundColor: '#CDCDCD'},
          ]}
          onPress={() => setSelectedButton('Mata ganjaran')}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={{
              color: selectedButton === 'Mata ganjaran' ? '#292A60' : 'gray',
              fontSize: 11,
              fontWeight: 'normal',
              textAlign: 'center',
              paddingHorizontal: 1,
            }}>
           MATA GANJARAN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.togglebutton,
            selectedButton === 'History'
              ? {backgroundColor: '#DFDFDF'}
              : {backgroundColor: '#CDCDCD'},
          ]}
          onPress={() => setSelectedButton('History')}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={{
              color: selectedButton === 'History' ? '#292A60' : 'gray',
              fontSize: 11,
              fontWeight: 'normal',
              textAlign: 'center',
              paddingHorizontal: 1,
            }}>
            SEJARAH MATA
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.togglebutton,
            selectedButton === 'Sejarah pembelian'
              ? {backgroundColor: '#DFDFDF'}
              : {backgroundColor: '#CDCDCD'},
          ]}
          onPress={() => setSelectedButton('Sejarah pembelian')}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={{
              color: selectedButton === 'Sejarah pembelian' ? '#292A60' : 'gray',
              fontSize: 11,
              fontWeight: 'normal',
              textAlign: 'center',
              paddingHorizontal: 1,
            }}>
            SEJARAH PEMBELIAN
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={{height: '80%', width: '95%', marginHorizontal: '3%'}}>
      {renderContent()}
    </View>
    </ImageBackground>
  </SafeAreaView>
  )
}

export default Transition

const styles = StyleSheet.create({
  toggles: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform:'uppercase'
  },
  togglebutton: {
    height: 50,
    flex: 1,
    paddingHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  card: {
    color:'black',
    backgroundColor: 'lightgrey',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  couponCode: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:"black"
  },
  couponDate: {
    fontSize: 16,
    marginBottom: 5,
  },
  customerId: {
    fontSize: 16,
    color:'black'
  },
  noCouponText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  tableHeader: {
    height: 40,
    backgroundColor: '#f5f5f5',
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  tableCellText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  }
})























































