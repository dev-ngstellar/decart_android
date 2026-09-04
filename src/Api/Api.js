import axios from "axios";
import { getData, clearData } from "../Utils/localHelper";
import { reset } from "../Utils/NavigationService";

const API = axios.create({});

API.interceptors.request.use(
  async config => {
    const token = await getData('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  async response => {
    // If backend uses 200 OK status but provides a custom error for invalid session/device
    const data = response.data;
    if (!data) return response;

    const url = response.config?.url || "";
    // Do not trigger session clearing on authentication, version check, or asset endpoints
    if (
      url.includes("CustomerLogin") ||
      url.includes("BiometricLogin") ||
      url.includes("UpdateDeviceID") ||
      url.includes("DeviceVersionLog") ||
      url.includes("GetPromolink") ||
      url.includes("GetBanner")
    ) {
      return response;
    }

    // Only inspect error message text fields rather than large payloads (e.g. base64 images)
    const msg = (
      (typeof data?.errorMessage === 'string' ? data.errorMessage : '') + ' ' +
      (typeof data?.DeviceMsg === 'string' ? data.DeviceMsg : '') + ' ' +
      (typeof data?.data?.DeviceMsg === 'string' ? data.data.DeviceMsg : '') + ' ' +
      (typeof data?.data?.errorMessage === 'string' ? data.data.errorMessage : '')
    ).toLowerCase();

    const isSessionExpired =
      msg.includes('sesi tamat') ||
      msg.includes('token expired') ||
      msg.includes('invalid_grant') ||
      msg.includes('peranti utama') ||
      msg.includes('log masuk di peranti lain');

    if (isSessionExpired) {
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