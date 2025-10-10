import API from "../../Api/Api";
import { CHECK_NEWLOGIN_ID } from "../../Api/ApiPath";

export const CheckNewLoginApi = payload => {
    console.log("API CALL - CheckNewLoginApi Payload:", payload);
    console.log("API CALL - CheckNewLoginApi URL:", CHECK_NEWLOGIN_ID);
    const api = API.post(CHECK_NEWLOGIN_ID, payload);
    const response = api.then(res => res.data);
    return response;
  };