import API from "../../Api/Api";
import { GET_SALES_HISTORY } from "../../Api/ApiPath";






export const SalesHistoryApi = payload => {
    const api = API.post(GET_SALES_HISTORY, payload);
    const response = api.then(res => res.data);
    return response;
  };
  