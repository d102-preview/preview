import { AxiosError } from 'axios';

const refresh = async (error: AxiosError) => {
  if (error.response?.status === 401) {
    localStorage.setItem('PREVIEW_ACCESS_TOKEN', '');
    localStorage.setItem('PREVIEW_USER_STORE', '');
    window.location.href = '/login';
  }

  return Promise.reject(error);
};

export default refresh;
