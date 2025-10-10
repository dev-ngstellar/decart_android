import API from "../../Api/Api";
import { GET_CAMPAIGNS, GET_SUB_CAMPAIGNS, UPDATE_CAMPAIGNS } from "../../Api/ApiPath";

export const getCampaignsApi = payload => {
    console.log("API CALL - getCampaignsApi Payload:", payload);
    console.log("API CALL - getCampaignsApi URL:", GET_CAMPAIGNS);
    const api = API.post(GET_CAMPAIGNS, payload);
    const response = api.then(res => res.data);
    return response;
};

export const updateCampaignsApi = payload => {
    console.log("API CALL - updateCampaignsApi Payload:", payload);
    console.log("API CALL - updateCampaignsApi URL:", UPDATE_CAMPAIGNS);
    const api = API.post(UPDATE_CAMPAIGNS, payload);
    const response = api.then(res => res.data);
    return response;
};

export const getSubCampaignsApi = payload => {
    console.log("API CALL - getSubCampaignsApi Payload:", payload);
    console.log("API CALL - getSubCampaignsApi URL:", GET_SUB_CAMPAIGNS);
    const api = API.post(GET_SUB_CAMPAIGNS, payload);
    const response = api.then(res => res.data);
    return response;
};
