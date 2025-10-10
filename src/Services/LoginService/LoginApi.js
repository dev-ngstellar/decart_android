import API from "../../Api/Api";
import { BIOMETRIC_LOGIN, LOGIN, UPDATE_DEVICEID } from "../../Api/ApiPath";


export const loginApi = payload => {
  console.log("API CALL - loginApi Payload:", payload);
  console.log("API CALL - loginApi URL:", LOGIN);
  const api = API.post(LOGIN, payload);
  const response = api.then(res => res.data);
  return response;
};

export const biometricLoginApi = payload => {
  console.log("API CALL - biometricLoginApi Payload:", payload);
  console.log("API CALL - biometricLoginApi URL:", BIOMETRIC_LOGIN);
  const api = API.post(BIOMETRIC_LOGIN, payload);
  const response = api.then(res => res.data);
  return response;
};

export const update_device_id = payload => {
  console.log("API CALL - update_device_id Payload:", payload);
  console.log("API CALL - update_device_id URL:", UPDATE_DEVICEID);
  const api = API.post(UPDATE_DEVICEID, payload);
  const response = api.then(res => res.data);
  return response;
};