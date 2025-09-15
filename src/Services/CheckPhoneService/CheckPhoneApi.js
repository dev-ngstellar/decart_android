import API from "../../Api/Api";
import { CHECK_PHONE } from "../../Api/ApiPath";



export const CheckPhoneApi = payload => {
    const api = API.post(CHECK_PHONE, payload);
    const response = api.then(res => res.data);
    return response;
  };
  