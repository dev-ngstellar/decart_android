import API from "../../Api/Api";
import { GET_RELIGION } from "../../Api/ApiPath";



export const GetReligionApi = () => {
    const api = API.post(GET_RELIGION);
    const response = api.then(res => res.data);
    return response;
  };