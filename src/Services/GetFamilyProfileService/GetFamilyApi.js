import API from "../../Api/Api";
import { DELETE_FAMILY, GET_FAMILY_PROFILE } from "../../Api/ApiPath";




export const GetFamilyProfileApi = payload => {
    const api = API.post(GET_FAMILY_PROFILE, payload);
    const response = api.then(res => res.data);
    return response;
  };
  
 export const DeleteFamilyProfileApi = payload =>{
  const api = API.post(DELETE_FAMILY, payload);
  const response = api.then(res => res.data);
  return response;
 } 