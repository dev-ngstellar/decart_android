import API from "../../Api/Api";
import { GET_BANNER } from "../../Api/ApiPath";




export const GetBannerApi = payload => {
    console.log('bannerapi',payload)
    return  API.post(GET_BANNER, payload);
  };
  