import API from "../../Api/Api";
import { FORGOT_PASSWORD } from "../../Api/ApiPath";




export const ForgotPassApi = payload => {
  const api = API.post(FORGOT_PASSWORD, payload);
  const response = api.then(res => res.data);
  return response;
};