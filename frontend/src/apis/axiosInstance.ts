import axios from 'axios';
import setAuthorization from './interceptors';

const axiosRequestConfig = {
  baseURL: import.meta.env.VITE_NODE_ENV === 'development' ? '' : import.meta.env.VITE_BASE_URL,
};

const axiosWithCredentialConfig = {
  baseURL: import.meta.env.VITE_NODE_ENV === 'development' ? '' : import.meta.env.VITE_BASE_URL,
  withCredentials: true,
};

// 토큰 필요없는 요청
export const axiosCommonInstance = axios.create(axiosRequestConfig);

// accessToken 재발급으로만 쓰는 용도
export const axiosWithCredentialInstance = axios.create(axiosWithCredentialConfig);

// @TODO: 추후 withCredentials 없는 설정으로 변경
// 토큰 필요한 요청
export const axiosAuthInstance = axios.create(axiosWithCredentialConfig);

axiosAuthInstance.interceptors.request.use(setAuthorization);
axiosWithCredentialInstance.interceptors.request.use(setAuthorization);
