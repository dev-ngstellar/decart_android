import axios from "axios";
import { getData, clearData } from "../Utils/localHelper";
import { reset } from "../Utils/NavigationService";

const API = axios.create({});

API.interceptors.request.use(
  async config => {
    const token = await getData('token');
  

    config.headers['Authorization'] = `Bearer ${token}`;
    
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  async response => {
    // If backend uses 200 OK status but provides a custom error for invalid session/device
    // Add logic here based on your backend response structure
    const data = response.data;
    if (!data) return response;

    const stringified = JSON.stringify(data).toLowerCase();

    if (
      data.ApiResultID === -1 || data.ApiResultID === 3 || data.ApiResultID === 2 || data.ApiResultID === 0 ||
      data.API_Result_ID === -1 || data.API_Result_ID === 3 || data.API_Result_ID === 2 || data.API_Result_ID === 0 ||
      stringified.includes('sesi') ||
      stringified.includes('log masuk') ||
      stringified.includes('main device') ||
      stringified.includes('peranti utama') ||
      stringified.includes('token expired') ||
      stringified.includes('invalid_grant')
    ) {
      await clearData();
      reset('Login');
      return Promise.reject(new Error("Session Expired"));
    }
    return response;
  },
  async error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      await clearData();
      reset('Login');
    }
    return Promise.reject(error);
  }
);

export default API;