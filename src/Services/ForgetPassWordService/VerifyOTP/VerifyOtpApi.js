import API from "../../../Api/Api";
import { VERIFY_OTP } from "../../../Api/ApiPath";





export const VerifyOTPApi = payload => {
  const api = API.post(VERIFY_OTP, payload);
  const response = api.then(res => res.data);
  return response;
};