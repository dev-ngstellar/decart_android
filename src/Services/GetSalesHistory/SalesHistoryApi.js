import API from "../../Api/Api";
import { GET_SALES_HISTORY } from "../../Api/ApiPath";






export const SalesHistoryApi = payload => {
    console.log("API CALL - SalesHistoryApi Payload:", payload);
    console.log("API CALL - SalesHistoryApi URL:", GET_SALES_HISTORY);
    const api = API.post(GET_SALES_HISTORY, payload);
    const response = api.then(res => res.data);
    return response;
  };
  