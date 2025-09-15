import API from "../../Api/Api";
import { GENERATE_OTP } from "../../Api/ApiPath";



export const GenerateOTPApi = payload => {
    const api = API.post(GENERATE_OTP, payload);
    const response = api.then(res => res.data);
    return response;
  };
  