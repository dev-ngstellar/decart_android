import API from "../../Api/Api";
import { GET_POINTS, POINTS_HISTORY } from "../../Api/ApiPath";






export const GetPointsApi = payload => {
    const api = API.post(GET_POINTS, payload);
    const response = api.then(res => res.data);
    return response;
  };

  export const GetPointsHistoryApi = payload => {
    const api = API.post(POINTS_HISTORY, payload);
    const response = api.then(res => res.data);
    return response;
  };
  