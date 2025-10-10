import API from "../../Api/Api";
import { GET_POINTS, POINTS_HISTORY } from "../../Api/ApiPath";






export const GetPointsApi = payload => {
    console.log("API CALL - GetPointsApi Payload:", payload);
    console.log("API CALL - GetPointsApi URL:", GET_POINTS);
    const api = API.post(GET_POINTS, payload);
    const response = api.then(res => res.data);
    return response;
  };

  export const GetPointsHistoryApi = payload => {
    console.log("API CALL - GetPointsHistoryApi Payload:", payload);
    console.log("API CALL - GetPointsHistoryApi URL:", POINTS_HISTORY);
    const api = API.post(POINTS_HISTORY, payload);
    const response = api.then(res => res.data);
    return response;
  };
  