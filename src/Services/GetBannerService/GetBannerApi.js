import API from "../../Api/Api";
import { GET_BANNER } from "../../Api/ApiPath";




export const GetBannerApi = payload => {
    console.log("API CALL - GetBannerApi Payload:", payload);
    console.log("API CALL - GetBannerApi URL:", GET_BANNER);
    return  API.post(GET_BANNER, payload);
  };
  