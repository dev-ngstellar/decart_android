import API from "../../Api/Api";
import { UPDATE_PROFILE } from "../../Api/ApiPath";

export const UpdateProfileApi = payload => {
    const api = API.post(UPDATE_PROFILE, payload);
    const response = api.then(res => res.data);
    return response;
  };