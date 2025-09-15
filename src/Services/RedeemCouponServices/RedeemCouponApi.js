import API from "../../Api/Api";
import { REDEEM_COUPON } from "../../Api/ApiPath";


export const RedeemCouponApi = payload => {
    const api = API.post(REDEEM_COUPON, payload);
    const response = api.then(res => res.data);
    return response;
  };