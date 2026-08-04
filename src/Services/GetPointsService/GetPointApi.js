import API from "../../Api/Api";
import { GET_POINTS, POINTS_HISTORY, ARMS_POINTSHISTORY } from "../../Api/ApiPath";

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
  
  export const GetArmsPointsHistoryApi = async payload => {
    console.log("BEFORE API CALL - GetArmsPointsHistoryApi Payload:", JSON.stringify(payload));
    console.log("BEFORE API CALL - GetArmsPointsHistoryApi URL:", ARMS_POINTSHISTORY);
    try {
      const res = await API.post(ARMS_POINTSHISTORY, payload);
      console.log("AFTER API CALL - GetArmsPointsHistoryApi Status:", res.status);
      console.log("AFTER API CALL - GetArmsPointsHistoryApi Response Data:", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      console.log("API ERROR - GetArmsPointsHistoryApi Status:", error?.response?.status);
      console.log("API ERROR - GetArmsPointsHistoryApi Response:", JSON.stringify(error?.response?.data || error?.message));
      throw error;
    }
  };