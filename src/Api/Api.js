import axios from "axios";
import { getData } from "../Utils/localHelper";


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

export default API;