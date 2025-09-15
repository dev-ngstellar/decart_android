import API from "../../Api/Api";
import { DEVICE_LOG, VERSION_LOG } from "../../Api/ApiPath";



export const DeviceLogApi = payload => {
    const api = API.post(DEVICE_LOG, payload);
    const response = api.then(res => res.data);
    return response;
  };

  export const DeviceVersionApi = payload => {
    const api = API.post(VERSION_LOG, payload);
    const response = api.then(res => res.data);
    return response;
  };

  
  