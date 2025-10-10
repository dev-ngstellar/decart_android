import API from "../../Api/Api";
import { BAKI_EPP } from "../../Api/ApiPath";



export const GetBakiApi = payload => {
    console.log("API CALL - GetBakiApi Payload:", payload);
    console.log("API CALL - GetBakiApi URL:", BAKI_EPP);
    const api = API.post(BAKI_EPP, payload);
    const response = api.then(res => res.data);
    return response;
  };
  