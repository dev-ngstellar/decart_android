import API from "../../Api/Api";
import { BAKI_EPP } from "../../Api/ApiPath";



export const GetBakiApi = async payload => {
  console.log("API CALL - GetBakiApi Payload:", payload);
  console.log("API CALL - GetBakiApi URL:", BAKI_EPP);
  try {
    const res = await API.post(BAKI_EPP, payload);
    console.log('API CALL - GetBakiApi Response status:', res.status);
    console.log('API CALL - GetBakiApi Response data:', res.data);
    return res.data;
  } catch (error) {
    console.log('API CALL - GetBakiApi Error:', error);
    throw error;
  }
};