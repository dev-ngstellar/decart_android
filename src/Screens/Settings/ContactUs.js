import {
  Alert,
  Image,
  ImageBackground,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import pernama from "../../Assets/pernama.png";
import logo from "../../Assets/logo-17.png";
import logo1 from "../../Assets/logo-18.png";
import logo2 from "../../Assets/logo-19.png";
import logo3 from "../../Assets/logo-20.png";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import backdrop from "../../Assets/LOGO/backdrop.jpg";
import {
  FeedBackThunk,
  getFeedBackThunk,
} from "../../Services/FeedbackService/FeedBackSlice";
import Loader from "../../component/Loader";
import { getData } from "../../Utils/localHelper";
import DeviceInfo from "react-native-device-info";
import logo4 from "../../Assets/logo-1.png";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";

const ContactUs = ({ navigation }) => {
  const dispatch = useDispatch();
  const phoneNumber = "03 3093 0572";
  const isLoader = useSelector((state) => state.login.isLoader);
  const [value, setValue] = useState(1);
  const [isFocus, setIsFocus] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [userProfileData, setUserProfileData] = useState("")
  const state = useSelector((state) => state);
  const { ProfileData } = state.getCustomerProfile;
  const { FeedBackTypeData } = state.feedBack;


  const colorScheme = useColorScheme();
  const lightModeTextColor = "grey";
  const darkModeTextColor = "black";
  const textColor =
    colorScheme === "dark" ? darkModeTextColor : lightModeTextColor;

  const FeedBackType = async () => {
    await dispatch(FeedBackThunk());
  };
  const handleFeedBackSubmit = () => {
    GetFeedBack();
    setFeedback("");
    setValue(1);
  };
  const GetFeedBack = async () => {
    const custId = await getData("CustId");
    const payload = {
      FeedbackId: 0,
      CustId: custId,
      FeedbackTypeId: value,
      Remarks: feedback,
      StatusId: 1,
      UserId: 1,
      DevID: deviceId,
      FeedbackEmail:ProfileData[0]?.cEmail
    };

    console.log('feedBackData',payload)
    const response = await dispatch(getFeedBackThunk({ payload }));
    if (response) {
      Alert.alert("", response.payload.DeCartMsg, [
        { text: "OK", onPress: () => navigation.navigate("Dashboard") },
      ]);
    }
  };

  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);

    };
    fetchDeviceId();
  }, []);

  useEffect(() => {
    FeedBackType();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header Screen="Hubungi Kami" />

      <ImageBackground source={backdrop} style={{ height: "100%" }}>
        {isLoader && <Loader />}
        <View
          style={{
            height: "20%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={pernama} style={{ height: 250, width: 150 }} />
        </View>
        <View
          style={{
            height: "5%",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://www.facebook.com/PerwiraNiagaMalaysia");
            }}
          >
            <Image source={logo} style={{ height: 35, width: 35 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("http://m.me/183219218471377");
            }}
          >
            <Image source={logo1} style={{ height: 35, width: 35 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://www.instagram.com/perwiraniagamalaysia/"
              );
            }}
          >
            <Image source={logo2} style={{ height: 35, width: 35 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              Linking.openURL(`tel:${phoneNumber}`);
            }}
          >
            <FontAwesomeIcon icon={faHeadset} size={25} color="#292A60" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View
            style={{
              height: 450,
              width: "90%",
              marginHorizontal: "5%",
              justifyContent: "space-around",
            }}
          >
            <TextInput
              style={{ ...styles.textInput, color: textColor }}
              name="nama"
              placeholder="Nama"
              placeholderTextColor="#000"
              value={ProfileData[0]?.CustName}
              editable={false}
            />
            <TextInput
              style={{ ...styles.textInput, color: textColor }}
              name="NoTentra"
              placeholder="No Tentera"
              placeholderTextColor="#000"
              value={ProfileData[0]?.SerNo}
              editable={false}
            />
            <TextInput
              style={{ ...styles.textInput, color: textColor }}
              name="KadPengenalan"
              placeholder="Kad Pengenalan"
              placeholderTextColor="#000"
              value={ProfileData[0]?.cIC}
              editable={false}
            />
            <TextInput
              style={{ ...styles.textInput, color: textColor }}
              name="email"
              placeholder="Email"
              placeholderTextColor="#000"
              value={ProfileData[0]?.cEmail}
              editable={false}
            />
            <Dropdown
              style={[styles.textInput, isFocus]}
              placeholderStyle={{
                ...styles.placeholderStyle,
                color: textColor,
              }}
              selectedTextStyle={{
                ...styles.placeholderStyle,
                color: textColor,
              }}
              itemTextStyle={{ color: textColor }}
              data={FeedBackTypeData}
              labelField="FeedbackName"
              valueField="FeedbackTypeId"
              placeholder="Soalan"
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.FeedbackTypeId);
                setIsFocus(false);
              }}
            />

            <TextInput
              style={{ ...styles.textInput, color: textColor }}
              placeholder="Sila Nyatakan Pertanyaan Anda "
              placeholderTextColor="#000"
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) => setFeedback(text)}
            />
            <Text style={{ color: "black", fontSize: 14 }}>
              Pertanyaan anda akan dijawab dalam masa 5 hari waktu bekerja.
            </Text>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleFeedBackSubmit}
            >
              <Text style={styles.loginText}>Hantar Sekarang</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 3,
    borderColor: "grey",
    padding: 15,
  },
  placeholderStyle: {
    fontSize: 15,
  },
  loginBtn: {
    width: "100%",
    borderRadius: 5,
    marginVertical: "3%",
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#292A60",
  },
  loginText: { fontSize: 16, fontWeight: "bold", color: "white" },
});
