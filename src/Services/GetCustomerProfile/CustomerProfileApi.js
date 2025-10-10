import API from "../../Api/Api";
import { GET_CUSTOMER_PROFILE } from "../../Api/ApiPath";



export const CustomerProfileApi = payload => {
  console.log("API CALL - CustomerProfileApi Payload:", payload);
  console.log("API CALL - CustomerProfileApi URL:", GET_CUSTOMER_PROFILE);
  const api = API.post(GET_CUSTOMER_PROFILE, payload);
  const response = api.then(res => res.data);
  return response;
};