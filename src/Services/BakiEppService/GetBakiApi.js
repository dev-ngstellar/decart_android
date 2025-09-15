import API from "../../Api/Api";
import { BAKI_EPP } from "../../Api/ApiPath";



export const GetBakiApi = payload => {
    const api = API.post(BAKI_EPP, payload);
    const response = api.then(res => res.data);
    return response;
  };
  