import API from "../../Api/Api";
import { UPDATE_PASSWORD } from "../../Api/ApiPath";

export const UpdatePassApi = payload => {
    const api = API.post(UPDATE_PASSWORD, payload);
    const response = api.then(res => res.data);
    return response;
  };