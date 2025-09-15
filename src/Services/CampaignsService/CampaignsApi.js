import API from "../../Api/Api";
import { GET_CAMPAIGNS, GET_SUB_CAMPAIGNS, UPDATE_CAMPAIGNS } from "../../Api/ApiPath";

export const getCampaignsApi = payload => {
    const api = API.post(GET_CAMPAIGNS, payload);
    const response = api.then(res => res.data);
    return response;
};

export const updateCampaignsApi = payload => {
    const api = API.post(UPDATE_CAMPAIGNS, payload);
    const response = api.then(res => res.data);
    return response;
};

export const getSubCampaignsApi = payload => {
    const api = API.post(GET_SUB_CAMPAIGNS, payload);
    const response = api.then(res => res.data);
    return response;
};
