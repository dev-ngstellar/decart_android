import API from "../../Api/Api";
import { CHECK_NEWLOGIN_ID } from "../../Api/ApiPath";

export const CheckNewLoginApi = payload => {
    const api = API.post(CHECK_NEWLOGIN_ID, payload);
    const response = api.then(res => res.data);
    return response;
  };