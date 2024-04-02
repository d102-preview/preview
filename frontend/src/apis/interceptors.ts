import { InternalAxiosRequestConfig } from 'axios';

const setAuthorization = (config: InternalAxiosRequestConfig) => {
  let accessToken = localStorage.getItem('PREVIEW_ACCESS_TOKEN');

  if (accessToken) {
    accessToken = accessToken.replace('Bearer ', '');
    config.headers.Authorization = accessToken;
  }

  return config;
};

export default setAuthorization;
