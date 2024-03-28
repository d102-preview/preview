import { InternalAxiosRequestConfig } from 'axios';

const setAuthorization = (config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('PREVIEW_ACCESS_TOKEN');

  if (accessToken) {
    config.headers.Authorization = accessToken;
  }

  return config;
};

export default setAuthorization;
