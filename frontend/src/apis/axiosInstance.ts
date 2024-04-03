import axios from 'axios';
import refresh from './refresh';
import setAuthorization from './setAuthorization';

const axiosRequestConfig = {
  baseURL: import.meta.env.VITE_NODE_ENV === 'development' ? '' : import.meta.env.VITE_BASE_URL,
};

const axiosWithCredentialConfig = {
  baseURL: import.meta.env.VITE_NODE_ENV === 'development' ? '' : import.meta.env.VITE_BASE_URL,
  withCredentials: true,
};

const axiosFileConfig = {
  baseURL: import.meta.env.VITE_NODE_ENV === 'development' ? '' : import.meta.env.VITE_BASE_URL,
  'Content-type': 'multipart/form-data',
  withCredentials: true,
};

// 토큰 필요없는 요청
export const axiosCommonInstance = axios.create(axiosRequestConfig);

// accessToken 재발급으로만 쓰는 용도
export const axiosWithCredentialInstance = axios.create(axiosWithCredentialConfig);

// @TODO: 추후 withCredentials 없는 설정으로 변경
// 토큰 필요한 요청
export const axiosAuthInstance = axios.create(axiosWithCredentialConfig);

// 파일 서버 요청
export const axiosFileInstance = axios.create(axiosFileConfig);

axiosAuthInstance.interceptors.request.use(setAuthorization);
axiosWithCredentialInstance.interceptors.request.use(setAuthorization);
axiosFileInstance.interceptors.request.use(setAuthorization);

axiosAuthInstance.interceptors.response.use(null, refresh);
axiosWithCredentialInstance.interceptors.response.use(null, refresh);
axiosFileInstance.interceptors.response.use(null, refresh);
