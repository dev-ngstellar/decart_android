import API from "../../Api/Api";
import { CHECK_NRIC } from "../../Api/ApiPath";



export const CheckNRICApi = payload => {
    const api = API.post(CHECK_NRIC, payload);
    const response = api.then(res => res.data);
    return response;
  };
  