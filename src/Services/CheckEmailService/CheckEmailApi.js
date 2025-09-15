import API from "../../Api/Api";
import { CHECK_EMAIL } from "../../Api/ApiPath";



export const CheckEmailApi = payload => {
    const api = API.post(CHECK_EMAIL, payload);
    const response = api.then(res => res.data);
    return response;
  };
  