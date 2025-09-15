import API from "../../Api/Api";
import { PROMO_LINK } from "../../Api/ApiPath";



export const PromoLinkApi = payload => {
  console.log("PROMOLINK",payload)
    return API.post(PROMO_LINK, payload);
  };