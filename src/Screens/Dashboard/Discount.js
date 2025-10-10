import {
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../component/Header';
import {useDispatch, useSelector} from 'react-redux';
import { getData } from '../../Utils/localHelper';
import { GetDiscountThunk } from '../../Services/GetDiscountService/GetDiscountSlice';
import backdrop from '../../Assets/LOGO/backdrop.jpg'
import Loader from '../../component/Loader';

const Discount = ({route}) => {
  const { deviceId } = route.params;
  
  const dispatch = useDispatch()
  const isLoader = useSelector(state => state.login.isLoader);
  const GetDiscountData = useSelector(state => state.getDiscount.GetDiscountData)


  const [refreshing, setRefreshing] = useState(false);

  const colorScheme = useColorScheme();
  const lightModeTextColor = 'grey';
  const darkModeTextColor = 'black';
  const textColor =
    colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;
    const TotalDiscount = GetDiscountData.reduce((sum, item) => sum + item.DiscAmt, 0).toFixed(2);

    useEffect(()=>{
      getDiscount()
    
    },[deviceId])
    const getDiscount = async () => {
      const custId=await getData("CustId")
      const payload = {
        CustID:custId, 
        DevID:deviceId
      };
      console.log("Discount - Get Discount Payload:", payload);
      await dispatch(GetDiscountThunk({payload}));
    };

    const onRefresh = async () => {
      setRefreshing(true);
      await getDiscount();
      setRefreshing(false);
    };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header Screen="Penjimatan" />
      {isLoader && <Loader/>}
      <ImageBackground source={backdrop} style={{height:'100%'}}> 
      <ScrollView  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }>
        <View style={{height: 'auto'}}>
        { GetDiscountData && GetDiscountData.map((data,index)=>{
    return(
     <View key={index} style={{height:100,width:"95%",borderBottomWidth:0.5,marginHorizontal:'3%',flexDirection:'row',justifyContent:'space-around'}}>
     <View style={{width:"50%",height:'100%',justifyContent:'space-around'}}>
       <Text style={{fontSize:16,color:textColor}}>Tarikh:</Text>
       <Text style={{fontSize:16,color:textColor}}>No Resit:</Text>
       <Text style={{fontSize:16,color:textColor}}>Nilai Penjimatan:</Text>
     </View>
     <View style={{width:"50%",height:'100%',justifyContent:'space-around',alignItems:"flex-end"}}>
     <Text style={{fontSize:16,color:textColor,fontWeight:"500"}}>{data.SaleDate}</Text>
       <Text style={{fontSize:16,color:textColor,fontWeight:"500"}}>{data.ResitNo}</Text>
       <Text style={{fontSize:16,color:textColor,fontWeight:"500"}}>RM {data.DiscAmt.toFixed(2)}</Text>
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
              Jumlah Penjimatan
            </Text>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '900',
                color: 'brown',
                marginRight: 20,
                marginTop: 6,
              }}>
              RM {TotalDiscount}
            </Text>
          </View>
        </View>
       
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Discount;

const styles = StyleSheet.create({});