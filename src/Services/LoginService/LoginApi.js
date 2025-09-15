import API from "../../Api/Api";
import { BIOMETRIC_LOGIN, LOGIN, UPDATE_DEVICEID } from "../../Api/ApiPath";


export const loginApi = payload => {
  const api = API.post(LOGIN, payload);
  const response = api.then(res => res.data);
  return response;
};

export const biometricLoginApi = payload => {
  const api = API.post(BIOMETRIC_LOGIN, payload);
  const response = api.then(res => res.data);
  return response;
};

export const update_device_id = payload => {
  console.log('updatedeviceid',payload)
  const api = API.post(UPDATE_DEVICEID, payload);
  const response = api.then(res => res.data);
  return response;
};