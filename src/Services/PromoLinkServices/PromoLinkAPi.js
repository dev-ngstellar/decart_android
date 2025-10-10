import API from "../../Api/Api";
import { PROMO_LINK } from "../../Api/ApiPath";



export const PromoLinkApi = payload => {
  console.log("API CALL - PromoLinkApi Payload:", payload);
  console.log("API CALL - PromoLinkApi URL:", PROMO_LINK);
    return API.post(PROMO_LINK, payload);
  };