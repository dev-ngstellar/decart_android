import API from "../../Api/Api";
import { USER_PROFILE } from "../../Api/ApiPath";


export const UserProfileApi = payload => {
  const api = API.post(USER_PROFILE, payload);
  const response = api.then(res => res.data);
  return response;
};

