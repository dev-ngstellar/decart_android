import API from "../../Api/Api";
import { REDEEM_VOUCHER } from "../../Api/ApiPath";



export const RedeemVoucherApi = payload => {
    const api = API.post(REDEEM_VOUCHER, payload);
    const response = api.then(res => res.data);
    return response;
  };