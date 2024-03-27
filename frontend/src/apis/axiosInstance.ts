import axios from 'axios';
import setAuthorization from './interceptors';

const axiosRequestConfig = {
  baseURL: import.meta.env.VITE_NODE_ENV === 'development' ? '' : import.meta.env.VITE_BASE_URL,
};

export const axiosCommonInstance = axios.create(axiosRequestConfig);

axiosCommonInstance.interceptors.request.use(setAuthorization);
