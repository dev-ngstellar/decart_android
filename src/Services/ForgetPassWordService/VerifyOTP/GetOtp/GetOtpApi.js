import API from "../../../../Api/Api";
import { GET_OTP } from "../../../../Api/ApiPath";


export const GetOTPApi = payload => {
    const api = API.post(GET_OTP, payload);
    const response = api.then(res => res.data);
    return response;
  };