import API from "../../Api/Api";
import { GET_CUSTOMER_TYPES } from "../../Api/ApiPath";


export const GetCustomerTypesApi = () => {
    const api = API.post(GET_CUSTOMER_TYPES);
    const response = api.then(res => res.data);
    return response;
  };