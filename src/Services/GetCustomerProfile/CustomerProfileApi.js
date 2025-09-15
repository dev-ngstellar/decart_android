import API from "../../Api/Api";
import { GET_CUSTOMER_PROFILE } from "../../Api/ApiPath";



export const CustomerProfileApi = payload => {
  const api = API.post(GET_CUSTOMER_PROFILE, payload);
  const response = api.then(res => res.data);
  return response;
};