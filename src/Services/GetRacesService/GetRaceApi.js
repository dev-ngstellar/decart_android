import API from "../../Api/Api";
import { GET_RACES } from "../../Api/ApiPath";



export const GetRaceApi = () => {
    const api = API.post(GET_RACES);
    const response = api.then(res => res.data);
    return response;
  };