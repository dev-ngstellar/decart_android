import API from "../../Api/Api";
import { DEVICE_LOG, VERSION_LOG } from "../../Api/ApiPath";



export const DeviceLogApi = payload => {
    console.log("API CALL - DeviceLogApi Payload:", payload);
    console.log("API CALL - DeviceLogApi URL:", DEVICE_LOG);
    const api = API.post(DEVICE_LOG, payload);
    const response = api.then(res => res.data);
    return response;
  };

  export const DeviceVersionApi = payload => {
    console.log("API CALL - DeviceVersionApi Payload:", payload);
    console.log("API CALL - DeviceVersionApi URL:", VERSION_LOG);
    const api = API.post(VERSION_LOG, payload);
    const response = api.then(res => res.data);
    return response;
  };

  
  