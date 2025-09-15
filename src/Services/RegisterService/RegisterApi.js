import API from "../../Api/Api";
import { UPDATE_CUSTOMER_REGISTRATION } from "../../Api/ApiPath";


export const RegisterApi = payload => {
  const api = API.post(UPDATE_CUSTOMER_REGISTRATION, payload);
  const response = api.then(res => res.data);
  return response;
};