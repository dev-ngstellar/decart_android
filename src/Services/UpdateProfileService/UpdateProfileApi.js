import API from "../../Api/Api";
import { UPDATE_PROFILE } from "../../Api/ApiPath";

export const UpdateProfileApi = payload => {
    console.log("API CALL - UpdateProfileApi Payload:", payload);
    console.log("API CALL - UpdateProfileApi URL:", UPDATE_PROFILE);
    const api = API.post(UPDATE_PROFILE, payload);
    const response = api.then(res => res.data);
    return response;
  };