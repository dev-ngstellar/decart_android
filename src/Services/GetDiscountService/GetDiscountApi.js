import API from "../../Api/Api";
import { GET_DISCOUNT } from "../../Api/ApiPath";







export const GetDiscountApi = payload => {
    const api = API.post(GET_DISCOUNT, payload);
    const response = api.then(res => res.data);
    return response;
  };