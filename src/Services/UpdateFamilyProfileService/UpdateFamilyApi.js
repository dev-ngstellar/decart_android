import API from "../../Api/Api";
import { UPDATE_FAMILY_PROFILE } from "../../Api/ApiPath";

export const UpdateFamilyApi = payload => {
    const api = API.post(UPDATE_FAMILY_PROFILE, payload);
    //console.log("API CALL - update_family Payload:", payload);
    const response = api.then(res => res.data);
    return response;
  };