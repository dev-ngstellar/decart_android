import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  Modal,
  Button,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../component/Header";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import backdrop from "../../Assets/LOGO/backdrop.jpg";
import Loader from "../../component/Loader";
import CustomTabView from "../../component/CustomTabView";
import { UpdateNotificationThunk } from "../../Services/NotificationService/NotificationSlice";
import { getData } from "../../Utils/localHelper";
import DeviceInfo from "react-native-device-info";

const Notification = () => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const isLoader = useSelector((state) => state.login.isLoader);
  const lightModeTextColor = "grey";
  const darkModeTextColor = "black";
  const textColor =
    colorScheme === "dark" ? darkModeTextColor : lightModeTextColor;

  const NotifiationData = useSelector((state) => state.getNotifiation.NotifiationData);
  const ProfileData = useSelector((state) => state.getCustomerProfile.ProfileData);

  const [deviceId, setDeviceId] = useState("");
  const [profile , setProfileDevId] = useState(null);
  const [isDeviceRegistered, setIsDeviceRegistered] = useState(false);

  useEffect(() => {
    const fetchDeviceId = async () => {
      try {
        const devID = await DeviceInfo.getUniqueId();
        setDeviceId(devID);
      } catch (error) {
        console.error("Error fetching device ID:", error);
      }
    };

    fetchDeviceId();
    checkDeviceID();
  }, []);

  const checkDeviceID = () => {
    if (deviceId !== ProfileData[0]?.DevID) {
      // Alert.alert("Peranti ini tidak berdaftar");
      console.log("Notify DEVIDtest", deviceId !== ProfileData[0]?.DevID);
    }
  };
  // for modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // update Notification
  const UpdateNotification = async (item) => {
    const CustID = await getData("CustId");

    const payload = {
      CustNotificationId: 0,
      NotificationId: item.NotificationId,
      CustId: CustID,
      ReadStatusId: 1,
    };
    // console.log("updateparams", payload);
    const response = await dispatch(UpdateNotificationThunk({ payload }));
    // console.log("notifcation response", response);

    setModalVisible(false);
  };

  // Handle Message Click - Open modal
  const handleMessagePress = (item) => {
    setSelectedMessage(item); // Directly pass the message object
    setModalVisible(true);
  };

  const [selectedTab, setSelectedTab] = useState("1"); // State to keep track of the selected tab

  const handleTabPress = (id) => {
    setSelectedTab(id); // Update the selected tab
  };

  // Render content based on the active tab
  const renderContent = () => {
    if (
      selectedTab === "1" &&
      NotifiationData.some((item) => item.ReadStatus == 0)
    ) {
      return (
        <FlatList
          data={NotifiationData.filter((item) => item.ReadStatus === 0)}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handleMessagePress(item)}>
              <View key={index} style={styles.messageItem}>
                <View style={styles.messageRow}>
                  <Text style={styles.titleTxt}>{item.Title}</Text>
                  <Text style={styles.dateTxt}>{item.NotificationDate}</Text>
                </View>
                <View style={styles.msgPointsView}>
                  <Text style={[styles.msgTxt, { color: textColor }]}>
                    {item.Msg}
                  </Text>
                  <Text style={[styles.pointTxt, { color: textColor }]}>
                    {item.Points === 0 ? "" : item.Points}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
    if (
      selectedTab === "2" &&
      NotifiationData.some((item) => item.ReadStatus == 1)
    ) {
      return (
        <FlatList
          data={NotifiationData.filter((item) => item.ReadStatus === 1)}
          renderItem={({ item }) => (
            <View style={styles.messageItem}>
              <View style={styles.messageRow}>
                <Text style={styles.titleTxt}>{item.Title}</Text>
                <Text style={styles.dateTxt}>{item.NotificationDate}</Text>
              </View>

              <View style={styles.msgPointsView}>
                <Text style={[styles.msgTxt, { color: textColor }]}>
                  {item.Msg}
                </Text>
                <Text style={[styles.pointTxt, { color: textColor }]}>
                  {item.Points === 0 ? "" : item.Points}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header Screen="Notifikasi" />
      <ImageBackground source={backdrop} style={{ height: "100%" }}>
        {isLoader && <Loader />}
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "1" ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => handleTabPress("1")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "1"
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}
            >
              Mesej baharu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "2" ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => handleTabPress("2")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "2"
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}
            >
              Mesej dibaca
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {/* <Text>Device ID: {deviceId}</Text> */}
          {deviceId !== ProfileData[0]?.DevID && (
            <View
              style={[styles.notificationView, { backgroundColor: "#f8d7da" }]}
            >
              <Text style={[styles.titleTxt, { color: "#721c24" }]}>
                {"Peranti ini tidak berdaftar"}
              </Text>
            </View>
          )}
        </View>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 130 }}
        >
          {/* Tab Content */}
          <View style={styles.contentContainer}>{renderContent()}</View>
          {/* Modal for Popup */}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedMessage?.Title}</Text>
                <Text style={styles.modalDate}>
                  {selectedMessage?.NotificationDate}
                </Text>
                <Text style={[styles.modalMessage, { color: textColor }]}>
                  {selectedMessage?.Msg}
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#292A60",
                    width: 50,
                    height: 30,
                    borderRadius: 5,
                    justifyContent: "center",
                  }}
                  // onPress={() => {}}
                  onPress={() => UpdateNotification(selectedMessage)}
                >
                  <Text
                    style={{ color: "#fff", textAlign: "center", fontSize: 16 }}
                  >
                    {"Ok"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  scrollContainer: {
    height: "100%",
  },
  baseView: {
    height: 100,
    justifyContent: "center",
    borderBottomWidth: 0.5,
  },
  innerVIew: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  contentView: {
    width: "95%",
    height: "100%",
    marginHorizontal: "3%",
  },
  titledateContainer: {
    width: "100%",
    height: "auto",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  titleTxt: {
    color: "#292A60",
    fontSize: 16,
    fontWeight: "800",
    flexWrap: "wrap",
    width: "78%",
  },
  dateTxt: {
    color: "#292A60",
    fontSize: 16,
    fontWeight: "800",
  },
  msgPointsView: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  msgTxt: {
    fontSize: 14,
    fontWeight: "500",
    width: "75%",
    paddingTop: 5,
  },
  pointTxt: {
    color: "#292A60",
    fontSize: 14,
    fontWeight: "500",
  },

  // for tab view
  messageItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: "#000",
    width: "100%",
    marginBottom: 10,
  },
  messageRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Align title and date
    alignItems: "center", // Center vertically
    marginBottom: 5, // Space below the title and date
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 20,
  },
  tabButton: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    transitionDuration: "0.3s", // Smooth transition effect
  },
  activeTab: {
    backgroundColor: "#d6eaf8",
    elevation: 5,
    shadowOpacity: 0.5,
    // borderBottomWidth:2
  },
  inactiveTab: {
    backgroundColor: "#F1F1F1",
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  inactiveTabText: {
    color: "#000",
  },
  contentContainer: {
    width: "100%",
    height: "100%",
  },
  contentText: {
    fontSize: 18,
    textAlign: "center",
  },

  // modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    color: "#292A60",
    fontSize: 18,
    fontWeight: "800",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  modalDate: {
    color: "#292A60",
    fontSize: 16,
    fontWeight: "800",
  },
  modalMessage: {
    fontSize: 14,
    fontWeight: "500",
    paddingTop: 10,
    marginBottom: 20,
    textAlign: "center",
  },

  // devid check
  notificationView: {
    padding: 10,
    borderRadius: 5,
    // marginVertical: 5, // Space between notifications
    borderWidth: 1,
    borderColor: "#ccc", // Border color for contrast
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

{
  /* displat notifcations */
}
{
  /* {NotifiationData && NotifiationData.length > 0 ? (
            <FlatList
              data={NotifiationData}
              renderItem={({ item, index }) => (
                <View key={index} style={styles.baseView}>
                  <View style={styles.innerVIew}>
                    <View style={styles.contentView}>
                      <TouchableOpacity
                        onPress={() => {
                          index, console.log(index);
                        }}
                      >
                        <View style={styles.titledateContainer}>
                          <Text style={styles.titleTxt}>{item.Title}</Text>
                          <Text style={styles.dateTxt}>
                            {item.NotificationDate}
                          </Text>
                        </View>

                        <View style={styles.msgPointsView}>
                          <Text style={[styles.msgTxt, { color: textColor }]}>
                            {item.Msg}
                          </Text>
                          <Text style={[styles.pointTxt, { color: textColor }]}>
                            {item.Points === 0 ? "" : item.Points}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View
              style={{
                height: 500,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "500", color: textColor }}
              >
                Anda tidak mempunyai sebarang notifikasi
              </Text>
            </View>
          )} */
}
