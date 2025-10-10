import API from "../../Api/Api";
import { GET_DISCOUNT } from "../../Api/ApiPath";







export const GetDiscountApi = payload => {
    console.log("API CALL - GetDiscountApi Payload:", payload);
    console.log("API CALL - GetDiscountApi URL:", GET_DISCOUNT);
    const api = API.post(GET_DISCOUNT, payload);
    const response = api.then(res => res.data);
    return response;
  };