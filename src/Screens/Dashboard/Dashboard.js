import {
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
  Alert,
  BackHandler,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import logo1 from "../../Assets/logo-16.png";
import logo2 from "../../Assets/Waterwark.png";
import logo4 from "../../Assets/LOGO/coin.png";
import logo5 from "../../Assets/BUTTON-2.png";
import logo6 from "../../Assets/BUTTON-3.png";
import logo7 from "../../Assets/BUTTON-4.png";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import { Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { GetCustomerProfileThunk } from "../../Services/GetCustomerProfile/CustomerProfileSlice";
import {
  GetNotifiationThunk,
  GetNotifiationCountThunk,
} from "../../Services/NotificationService/NotificationSlice";
import { getData } from "../../Utils/localHelper";
import { GetVouchersThunk } from "../../Services/GetVoucherService/GetVoucherSlice";
import DeviceInfo from "react-native-device-info";
import { GetCouponThunk } from "../../Services/GetCouponService/GetCouponSlice";
import { GetPromoThunk } from "../../Services/PromoLinkServices/PromoLinkSlice";
import { WebView } from "react-native-webview";
import Carousel from "react-native-snap-carousel";
import { GetSalesHistoryThunk } from "../../Services/GetSalesHistory/SalesHistorySlice";
import { GetBannerThunk } from "../../Services/GetBannerService/GetBannerSlice";
import Loader from "../../component/Loader";
import { VersionLogThunk } from "../../Services/DeviceLogService/DeviceSlice";
import UseBackHandler from "../../component/UseBackHandler";
import { useIsFocused } from "@react-navigation/native";
import { getCampaignsThunk, getSubCampaignsThunk } from "../../Services/CampaignsService/CampaignsSlice";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Dashboard = ({ navigation }) => {
  const { width: viewportWidth } = Dimensions.get("window");
  const dispatch = useDispatch();
  const [deviceId, setDeviceId] = useState("");
  const [appVersion, setAppVersion] = useState("");
  const [appName, setAppName] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [hasShownAlert, setHasShownAlert] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const state = useSelector((state) => state);
  const { loginData } = state.login;
  const { ProfileData } = state.getCustomerProfile;
  const isLoader = useSelector((state) => state.login.isLoader);
  const { NotifiationData, GetNotificationCountData } = state.getNotifiation;
  const profileImage = useSelector((state) => state.login.profileImage);
  const VersionLogData = useSelector((state) => state.deviceLog.VersionLogData);

  const GetPromoData = useSelector((state) => state.getPromo.GetPromoData);
  const GetBannerData = useSelector((state) => state.getBanner.GetBannerData);
  const subCampaignsData = useSelector((state) => state.getSubCampaigns.subCampaignsData);
  const promoData = GetPromoData?.data?.map((item) => ({
    link: item.WebLink,
    image: `data:image/png;base64,${item.Data}`,
  }));

  const Banner = GetBannerData?.data?.map((item) => ({
    uri: `data:image/png;base64,${item.Data}`,
  }));

  const isFocused = useIsFocused();
  UseBackHandler(isFocused);

  const getCustomerProfile = async () => {
    const custId = await getData("CustId");

    const payload = {
      CustId: custId,
      SerNo: "",
      CustName: "",
      cIC: "",
    };
    console.log("Dashboard - Customer Profile Payload:", payload);
    try {
      const response = await dispatch(GetCustomerProfileThunk({ payload }));
      if (response) {

        // checkDeviceID(); logged id device id and reponse device id
      //  if (deviceId !== ProfileData[0]?.DevID) {
      //     Alert.alert("Peranti ini tidak berdaftar");
      //
      // app version check if both are not equal alert for update the app response "AppVer":"2.0",

      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCampaigns = async () => {
    const custId = await getData("CustId");

    const payload = {
      CustId: custId,
    };
    console.log("Dashboard - Campaigns Payload:", payload);
    try {
      const resp = await dispatch(getSubCampaignsThunk({ payload }));
      if (resp && resp.payload) {
        setIsModalVisible(true)
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const showConfirmAlert = () => {
  //   Alert.alert(
  //     'Confirmation',
  //     'Eligible for Contest',
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'OK',
  //         onPress: async () => {
  //           try {
  //             await getCampaigns(); 
  //             navigation.navigate('campaigns'); 
  //           } catch (error) {
  //             console.error('API error:', error);
  //           }
  //         },
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // };

  const handleNavigation = async (CampaignID) => {
    const custId = await getData("CustId");

    const payload = {
      CustId: custId,
      CampaignID: CampaignID
    };
    console.log("Dashboard - Handle Navigation Payload:", payload);
    const resp = await dispatch(getCampaignsThunk({ payload }));
    if (resp && resp.payload && resp.payload[0]?.CampaignID > 0) {
      navigation.navigate('campaigns')
    }{
      setIsModalVisible(false)
    }

  }

  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
      console.log("Dashboard - Device ID Set:", id);
      const version = await DeviceInfo.getVersion();
      setAppVersion(version);
      const appName = await DeviceInfo.getApplicationName();
      setAppName(appName);
      
      // Call APIs with the deviceId directly
      await getCustomerProfile();
      await getNotification(id);
      await getPromo();
      await getBanner();
      await getNotificationCount(id);
      await VersionLog(id); // Add VersionLog call
    };
    fetchDeviceId();
  }, []);

  const checkDeviceID = () => {
    if (deviceId !== ProfileData[0]?.DevID) {
      Alert.alert("Peranti ini tidak berdaftar");
      console.log("ProfileData DEVIDtest", deviceId !== ProfileData[0]?.DevID);
    }
  };
  // console.log("ProfileData DEVIDtest---", deviceId !== ProfileData[0]?.DevID);
  // console.log("deviceId", deviceId);
  // console.log("ProfileDataDevID", ProfileData[0]?.DevID);

  // Notifation api call
  const getNotification = async (devId = deviceId) => {
    const custId = await getData("CustId");

    const payload = {
      CustID: custId,
      DevID: devId,
    };
   
   console.log("Dashboard - Notification Payload:", payload);
    const response = await dispatch(GetNotifiationThunk({ payload }));
     //console.log("notification data:", response);
  };

  //notification count api call
  const getNotificationCount = async (devId = deviceId) => {
    const custId = await getData("CustId");

    const payload = {
      CustID: custId,
      DevID: devId,
    };

    console.log("Dashboard - Notification Count Payload:", payload);
    await dispatch(GetNotifiationCountThunk({ payload }));

  };

  const getPromo = async () => {
    const custId = await getData("CustId");
    const payload = {
      CustId: custId,
    };
    console.log("Dashboard - Promo Payload:", payload);
    dispatch(GetPromoThunk({ payload }));
  };

  const getBanner = async () => {
    try {
      const custId = await getData("CustId");
      // console.log('custid',custId)
      const payload = {
        CustId: custId,
      };
      console.log("Dashboard - Banner Payload:", payload);
      dispatch(GetBannerThunk({ payload }));
    } catch (error) {
      // console.log(error, "getBannerError");
    }
  };
    const VersionLog = async (devId = deviceId) => {
    const APP_VERSION = DeviceInfo.getVersion();
    const custId = await getData("CustId");
    const payload = {
      CustID: custId,
      DevID: devId,
      HPVerNo: APP_VERSION,
    };
    console.log(payload);
    console.log("Dashboard - Version Log Payload:", payload);
    const res = await dispatch(VersionLogThunk({ payload }));
    console.log("Version Log :: " + JSON.stringify(res));
    const backendVersion = res?.payload?.DeCart_Ver;
    const message = res?.payload?.API_Result;
    console.log("Local App Version:", APP_VERSION);
    console.log("Backend App Version:", backendVersion);

    // ✅ If version is not latest → show popup
    if (backendVersion && backendVersion !== APP_VERSION) {
      Alert.alert(
        "New update available... please update to the New version 2.1",
        message || `A new version (${backendVersion}) of the app is available.`,
        [{ text: "OK" }]
      );
    } else {
      console.log("App is up to date.");
    }
};

  const onRefresh = async () => {
    setRefreshing(true);
    await getCustomerProfile();
    await VersionLog(deviceId);
    setRefreshing(false);
  };

  // Removed duplicate useEffect - APIs are now called in fetchDeviceId

  useEffect(() => {
    if (isFocused && ProfileData[0]?.BioYN === 1 && !hasShownAlert) {
      setHasShownAlert(true);
      getCampaigns()
    }
  }, [isFocused, ProfileData]);

  // Add additional API calls to ensure all APIs are triggered
  useEffect(() => {
    const triggerAllAPIs = async () => {
      console.log("Dashboard - Triggering all APIs for payload verification");
      
      // Trigger GetSubCampaigns if not already called
      if (ProfileData && ProfileData.length > 0) {
        const custId = await getData("CustId");
        const campaignsPayload = {
          CustId: custId,
        };
        console.log("Dashboard - GetSubCampaigns Payload:", campaignsPayload);
        dispatch(getSubCampaignsThunk({ payload: campaignsPayload }));
      }
    };
    
    if (ProfileData && ProfileData.length > 0) {
      triggerAllAPIs();
    }
  }, [ProfileData]);

  const handleModalClose = () => {
    setIsModalVisible(false)
  }

  const renderItem = ({ item }) => {
    return (
      <View style={{ height: "100%", justifyContent: "center" }}>
        <Image
          source={{ uri: item.uri }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="stretch"
        />
      </View>
    );
  };
  const renderPromoItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{ height: "100%", width: "100%" }}
        onPress={() => Linking.openURL(item.link)}
      >
        <Image
          source={{ uri: item.image }}
          style={{ height: "100%", width: "100%" }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoader && <Loader />}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            height: "10%",
            backgroundColor: "lightgrey",
            width: "95%",
            marginHorizontal: "3%",
            marginTop: 30,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            source={profileImage ? { uri: profileImage } : logo2}
            style={{ height: 45, width: 60, marginLeft: 10 }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#292A60",
                marginRight: 10,
              }}
            >
              {ProfileData && ProfileData[0]?.LoginID}
            </Text>
            {ProfileData && ProfileData[0]?.BioYN == 1 && (
              <FontAwesomeIcon icon={faCircleCheck} size={20} color="#292A60" />
            )}
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Notification");
            }}
          >
            {/* {NotifiationData?.length === 0 ? ( */}
            {/* {GetNotificationCountData[0]?.NewCount !== 0 && (
              <>
                <View
                  style={{
                    backgroundColor: "red",
                    position: "absolute",
                    top: -5,
                    left: 13,
                    height: 18,
                    width: 18,
                    borderRadius: 18,
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "400",
                      color: "white",
                    }}
                    numberOfLines={1}
                  >
                    {GetNotificationCountData[0]?.NewCount}
                  </Text>
                </View>
              </>
            )} */}
            <Image
              source={logo1}
              style={{ height: 30, width: 30, marginRight: 10 }}
            />
            {/* // ) : (
          //   <Image source={logo3} style={{height: 30, width: 30,marginRight:10}} />
          // )} */}
          </TouchableOpacity>
        </View>
        <Divider
          style={{
            borderBottomWidth: 2,
            borderColor: "lightgrey",
            width: "95%",
            marginHorizontal: "3%",
            marginTop: 10,
          }}
        />
        <View
          style={{
            height: "10%",
            width: "95%",
            marginHorizontal: "3%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: 5,
            marginTop: 5,
          }}
        >
          <TouchableOpacity
            style={{ height: 80, width: 80 }}
            onPress={() => {
              navigation.navigate("Transition", { deviceId });
            }}
          >
            <Image
              source={logo4}
              style={{ height: "100%", width: "100%", marginTop: 5 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ height: 80, width: 80 }}
            onPress={() => {
              navigation.navigate("Discount", { deviceId });
            }}
          >
            <Image
              source={logo5}
              style={{ height: "100%", width: "100%", marginTop: 5 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ height: 80, width: 80 }}
            onPress={() => {
              navigation.navigate("Vouchar", { deviceId });
            }}
          >
            <Image
              source={logo6}
              style={{ height: "100%", width: "100%", marginTop: 5 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ height: 80, width: 80 }}
            onPress={() => {
              navigation.navigate("Coupan", { deviceId });
            }}
          >
            <Image
              source={logo7}
              style={{ height: "100%", width: "100%", marginTop: 5 }}
            />
          </TouchableOpacity>
        </View>
        <Divider
          style={{
            borderBottomWidth: 2,
            borderColor: "lightgrey",
            width: "95%",
            marginHorizontal: "3%",
            marginTop: 10,
          }}
        />
        <View style={{ height: "35%", width: "100%" }}>
          <Carousel
            data={Banner}
            renderItem={renderItem}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            autoplay={true}
            autoplayInterval={5000}
            loop={true}
          />
          {/* <Image source={{uri:`data:image/png;base64,${GetBannerData?.images[0]?.Data}`}} style={{height:'100%',width:'100%'}} /> */}
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: "red",
            backgroundColor: "lightgrey",
            padding: 5,
          }}
        >
          Promosi Bulan Ini!
        </Text>
        <View
          style={{
            height: "35%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Image source={{uri:`data:image/png;base64,${GetPromoData?.images[0]?.Data}`}} style={{height:'100%',width:'100%'}} /> */}
          <Carousel
            data={promoData}
            renderItem={renderPromoItem}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            autoplay={true}
            autoplayInterval={3000}
            loop={true}
          />
        </View>
      </ScrollView>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.closeButton}>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={handleModalClose}
              >
                <FontAwesomeIcon icon={faTimes} size={24} color='black' />
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: `data:image/png;base64,${subCampaignsData[0]?.SubImageData}` }}
              style={styles.modalImage}
              resizeMode="contain"
            />
            <TouchableOpacity style={styles.loginBtn} onPress={() => handleNavigation(subCampaignsData[0]?.CampaignID)}>
              <Text style={styles.loginText}>Jom Sertai!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
0;
export const APP_VERSION = "2.1";
export default Dashboard;

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  column: {
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
  },
  headingImage: {
    width: "100%",
    height: 15,
    resizeMode: "contain",
  },
  slideImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    position: "relative",
  },
  modalImage: {
    width: "100%",
    height: 300,
  },
  closeButton: {
    width: '100%',
    alignItems: 'flex-end',
  },
  loginBtn: {
    width: '90%',
    borderRadius: 5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#292A60',
  },
  loginText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});
