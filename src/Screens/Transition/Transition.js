import { ImageBackground, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header';
import { useDispatch, useSelector } from 'react-redux';
import { GetArmsPointsHistoryThunk, GetPointHistoryThunk, GetPointsThunk } from '../../Services/GetPointsService/GetPointSlice';
import DeviceInfo from 'react-native-device-info';
import { getData } from '../../Utils/localHelper';
import { GetSalesHistoryThunk } from '../../Services/GetSalesHistory/SalesHistorySlice';
import backdrop from '../../Assets/LOGO/backdrop.jpg'
import Loader from '../../component/Loader';
import { Table, Row, Rows } from 'react-native-table-component';
import RewardHistoryTab from './components/RewardHistoryTab';
import { formatDate } from '../../Utils/rewardHistoryUtils';


const Transition = ({ route }) => {
  // const { deviceId } = route.params;
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const isLoader = useSelector(state => state.login.isLoader);
  const PointsData = useSelector(state => state.getPoints.PointsData);
  const ArmsPointsHistoryData = useSelector(state => state.getPoints?.ArmsPointsHistoryData);
  const SalesHistoryData = useSelector(state => state.getSalesHistory.SalesHistoryData);

  const tableHead = [
    <Text key="h-date" style={styles.tableHeaderText} numberOfLines={1} adjustsFontSizeToFit>
      Tarikh luput mata
    </Text>,
    <Text key="h-terima" style={styles.tableHeaderText} numberOfLines={1}>
      Terima
    </Text>,
    <Text key="h-tebus" style={styles.tableHeaderText} numberOfLines={1}>
      Tebus
    </Text>,
  ];

  const parseDateTimestamp = dateStr => {
    if (!dateStr || typeof dateStr !== 'string') return 0;
    const time = new Date(dateStr).getTime();
    return isNaN(time) ? 0 : time;
  };

  const sortedPointsHistory =
    ArmsPointsHistoryData && Array.isArray(ArmsPointsHistoryData)
      ? [...ArmsPointsHistoryData].sort((a, b) => {
          const dateA =
            (Number(a?.PointsRedeemed) > 0 ? a?.PointsExpiryDate : a?.TransactionDate) ||
            a?.TransactionDate ||
            a?.PointsExpiryDate;
          const dateB =
            (Number(b?.PointsRedeemed) > 0 ? b?.PointsExpiryDate : b?.TransactionDate) ||
            b?.TransactionDate ||
            b?.PointsExpiryDate;
          return parseDateTimestamp(dateB) - parseDateTimestamp(dateA);
        })
      : [];

  const tableData = sortedPointsHistory.map((history, index) => {
    const earned = Number(history?.PointsEarned ?? 0);
    const redeemed = Number(history?.PointsRedeemed ?? 0);
    const isEarned = !isNaN(earned) && earned > 0;
    const isRedeemed = !isNaN(redeemed) && redeemed > 0;

    // If the value is in terima: display TransactionDate. If tebus: display PointsExpiryDate.
    const dateRaw = isRedeemed
      ? history?.PointsExpiryDate
      : history?.TransactionDate;
    const dateText = formatDate(dateRaw);
    const terimaText = isEarned ? `${earned}` : '-';

    const tebusElement = isRedeemed ? (
      <Text style={[styles.tableCellText, { color: 'red' }]} numberOfLines={1}>
        ({redeemed})
      </Text>
    ) : (
      <Text style={styles.tableCellText} numberOfLines={1}>
        -
      </Text>
    );

    return [
      <Text key={`date-${index}`} style={styles.tableCellText} numberOfLines={1}>
        {dateText}
      </Text>,
      <Text key={`terima-${index}`} style={styles.tableCellText} numberOfLines={1}>
        {terimaText}
      </Text>,
      tebusElement,
    ];
  });

  const colorScheme = useColorScheme();
  const lightModeTextColor = 'grey';
  const darkModeTextColor = 'black';
  const textColor = colorScheme === 'dark' ? darkModeTextColor : lightModeTextColor;
  const mode = route?.params?.mode || 'pembelian';
  const [selectedButton, setSelectedButton] = useState(
    mode === 'points' ? 'History' : 'Sejarah pembelian'
  );

  const TotalAmount = SalesHistoryData?.reduce((sum, item) => sum + item.TotalAmt, 0).toFixed(2);

  const bakiPoints = (() => {
    let pts = null;
    if (Array.isArray(PointsData) && PointsData.length > 0) {
      const first = PointsData[0];
      pts = first?.Points ?? first?.points ?? first?.PointsBalance ?? first?.PointBalance;
    } else if (PointsData && typeof PointsData === 'object') {
      pts = PointsData?.Points ?? PointsData?.points ?? PointsData?.PointsBalance ?? PointsData?.PointBalance;
    } else if (typeof PointsData === 'number' || (typeof PointsData === 'string' && PointsData.trim() !== '')) {
      pts = PointsData;
    }

    if (pts === null || pts === undefined || pts === '') {
      if (ArmsPointsHistoryData && Array.isArray(ArmsPointsHistoryData) && ArmsPointsHistoryData.length > 0) {
        const fallback = ArmsPointsHistoryData[0]?.PointsBalance ?? ArmsPointsHistoryData[0]?.pointsBalance;
        if (fallback !== undefined && fallback !== null && String(fallback).trim() !== '') {
          pts = fallback;
        }
      }
    }

    return pts !== null && pts !== undefined ? String(pts) : '0';
  })();

  useEffect(() => {
    if (mode === 'points') {
      setSelectedButton('History');
    } else {
      setSelectedButton('Sejarah pembelian');
    }
  }, [mode, route?.params?.timestamp]);

  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = route?.params?.deviceId || await DeviceInfo.getUniqueId();
      setDeviceId(id);
    };
    fetchDeviceId();
  }, [route?.params?.deviceId]);

  const getPoints = async () => {
    const custId = await getData("CustId");
    const devId = deviceId || (await DeviceInfo.getUniqueId());
    const payload = {
      CustID: custId,
      DevID: devId,
    };
    console.log("Transition - Get Points Payload:", payload);
    await dispatch(GetPointsThunk({ payload }));
  };

  const getSalesHistory = async () => {
    const custId = await getData('CustId');
    const devId = deviceId || (await DeviceInfo.getUniqueId());
    const payload = {
      CustID: custId,
      DevID: devId,
    };
    console.log("Transition - Get Sales History Payload:", payload);
    await dispatch(GetSalesHistoryThunk({ payload }));
  };

  const getArmsPointsHistory = async () => {
    const custId = await getData('CustId');
    const devId = deviceId || (await DeviceInfo.getUniqueId());
    const payload = {
      CustId: custId,
      DevID: devId,
    };
    console.log("Transition - Get ARMS Points History (Sejarah Mata) Payload:", payload);
    await dispatch(GetArmsPointsHistoryThunk(payload));
  };

  const getPointsHistory = async () => {
    const custId = await getData('CustId');
    const devId = deviceId || (await DeviceInfo.getUniqueId());
    const payload = {
      CustID: custId,
      DevID: devId,
    };
    console.log("Transition - Get Points History (Mata Luput) Payload:", payload);
    await dispatch(GetPointHistoryThunk(payload));
  };

  useEffect(() => {
    getPoints();
    getSalesHistory();
    getArmsPointsHistory();
    getPointsHistory();
  }, [deviceId]);

  useEffect(() => {
    if (selectedButton === 'History') {
      getPoints();
      getArmsPointsHistory();
    } else if (selectedButton === 'Mata ganjaran') {
      getPointsHistory();
    }
  }, [selectedButton]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getPoints();
    await getSalesHistory();
    await getArmsPointsHistory();
    await getPointsHistory();
    setRefreshing(false);
  };
  const renderContent = () => {
    if (mode === 'points') {
      if (selectedButton === 'History') {
        return (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View
              style={{
                width: '100%',
                marginVertical: 14,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '900',
                  color: textColor,
                  marginRight: 6,
                }}>
                Baki Terkini :
              </Text>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: '900',
                  color: 'brown',
                }}>
                {bakiPoints}
              </Text>
            </View>
            {sortedPointsHistory && sortedPointsHistory.length > 0 ? (
              <View style={styles.tableWrapper}>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#000000' }}>
                  <Row
                    data={tableHead}
                    flexArr={[1.35, 1, 1]}
                    style={styles.tableHeader}
                  />
                  <Rows
                    data={tableData}
                    flexArr={[1.35, 1, 1]}
                    style={styles.tableRow}
                  />
                </Table>
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Tiada maklumat sejarah mata</Text>
              </View>
            )}
          </ScrollView>
        );
      } else if (selectedButton === 'Mata ganjaran') {
        return (
          <RewardHistoryTab
            deviceId={deviceId}
            refreshing={refreshing}
            onRefreshParent={onRefresh}
          />
        );
      }
      return null;
    } else {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{ height: 'auto' }}>
            {SalesHistoryData &&
              SalesHistoryData.map((data, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      height: 100,
                      width: '95%',
                      borderBottomWidth: 0.5,
                      marginHorizontal: '3%',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <View
                      style={{
                        width: '35%',
                        height: '100%',
                        justifyContent: 'space-around',
                      }}>
                      <Text style={{ fontSize: 16, color: textColor }}>Tarikh:</Text>
                      <Text style={{ fontSize: 16, color: textColor }}>
                        No Resit:
                      </Text>
                      <Text style={{ fontSize: 16, color: textColor }}>
                        Nilai Pembelian:
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '70%',
                        height: '100%',
                        justifyContent: 'space-around',
                        alignItems: 'flex-end',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: textColor,
                          fontWeight: '500',
                        }}>
                        {data.SaleDate}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          color: textColor,
                          fontWeight: '500',
                        }}>
                        {data.ResitNo}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          color: textColor,
                          fontWeight: '500',
                        }}>
                        RM {data.TotalAmt.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                );
              })}
            <View
              style={{
                height: 130,
                width: '95%',
                marginHorizontal: '3%',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{ fontSize: 18, fontWeight: 'bold', color: textColor }}>
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
      );
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header Screen="Transaksi" />
      {isLoader && <Loader />}
      <ImageBackground source={backdrop} style={{ height: '100%' }}>
        {mode === 'points' ? (
          <View style={styles.toggles}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#CDCDCD',
                width: '95%',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <TouchableOpacity
                style={[
                  styles.togglebutton,
                  selectedButton === 'History'
                    ? { backgroundColor: '#DFDFDF' }
                    : { backgroundColor: '#CDCDCD' },
                ]}
                onPress={() => setSelectedButton('History')}>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                  style={{
                    color: selectedButton === 'History' ? '#292A60' : 'gray',
                    fontSize: 13,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    paddingHorizontal: 2,
                  }}>
                  SEJARAH MATA
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.togglebutton,
                  selectedButton === 'Mata ganjaran'
                    ? { backgroundColor: '#DFDFDF' }
                    : { backgroundColor: '#CDCDCD' },
                ]}
                onPress={() => setSelectedButton('Mata ganjaran')}>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                  style={{
                    color:
                      selectedButton === 'Mata ganjaran' ? '#292A60' : 'gray',
                    fontSize: 13,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    paddingHorizontal: 2,
                  }}>
                  MATA LUPUT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.toggles}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#CDCDCD',
                width: '95%',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <View
                style={[
                  styles.togglebutton,
                  { backgroundColor: '#DFDFDF' },
                ]}>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                  style={{
                    color: '#292A60',
                    fontSize: 13,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    paddingHorizontal: 2,
                  }}>
                  SEJARAH PEMBELIAN
                </Text>
              </View>
            </View>
          </View>
        )}
        <View
          style={{
            flex: 1,
            width: '95%',
            alignSelf: 'center',
            marginBottom: 10,
          }}>
          {renderContent()}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Transition

const styles = StyleSheet.create({
  toggles: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase'
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
    color: 'black',
    backgroundColor: 'lightgrey',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  couponCode: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "black"
  },
  couponDate: {
    fontSize: 16,
    marginBottom: 5,
  },
  customerId: {
    fontSize: 16,
    color: 'black'
  },
  noCouponText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  tableWrapper: {
    marginTop: 10,
    backgroundColor: '#ffffff',
  },
  tableHeader: {
    height: 48,
    backgroundColor: '#ffffff',
  },
  tableHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    paddingHorizontal: 2,
  },
  tableRow: {
    height: 46,
    backgroundColor: '#ffffff',
  },
  tableCellText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  emptyContainer: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '500',
  },
})























































