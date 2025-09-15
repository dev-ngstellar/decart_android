import API from "../../Api/Api";
import { GET_VOUCHER } from "../../Api/ApiPath";






export const GetVouchersApi = payload => {
    const api = API.post(GET_VOUCHER, payload);
    const response = api.then(res => res.data);
    return response;
  };
  