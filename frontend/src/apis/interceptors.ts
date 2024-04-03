import { InternalAxiosRequestConfig } from 'axios';

const setAuthorization = (config: InternalAxiosRequestConfig) => {
  // const navigate = useNavigate();
  const accessToken = localStorage.getItem('PREVIEW_ACCESS_TOKEN');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  // else {
  //   navigate('/login');
  // }

  return config;
};

export default setAuthorization;
