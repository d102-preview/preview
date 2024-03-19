import axios from 'axios';
import setAuthorization from './interceptors';

const axiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
};

export const axiosCommonInstance = axios.create(axiosRequestConfig);

export const axiosAuthInstance = axios.create(axiosRequestConfig);

axiosAuthInstance.interceptors.request.use(setAuthorization);
