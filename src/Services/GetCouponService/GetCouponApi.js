import API from "../../Api/Api";
import { GET_COUPONS } from "../../Api/ApiPath";


export const GetCouponApi = payload => {
    console.log("API CALL - GetCouponApi Payload:", payload);
    console.log("API CALL - GetCouponApi URL:", GET_COUPONS);
    const api = API.post(GET_COUPONS, payload);
    const response = api.then(res => res.data);
    return response;
  };
  