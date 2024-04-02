import { axiosCommonInstance } from '@/apis/axiosInstance';
import {
  IGetEmailDuplicateRes,
  IPostEmailCertificationRes,
  IPostEmailVerifyReq,
  IPostEmailVerifyRes,
  IPostJoinReq,
  IPostJoinRes,
  IPostLoginReq,
  IPostLoginRes,
} from '@/types/auth';
import { APIResponse } from '@/types/model';

export const getIsEmailDuplicate = async (email: string): Promise<APIResponse<IGetEmailDuplicateRes>> => {
  const res = await axiosCommonInstance.get(`/api/email?email=${email}`);
  return res.data;
};

export const postEmailCertification = async (email: string): Promise<APIResponse<IPostEmailCertificationRes>> => {
  const res = await axiosCommonInstance.post('/api/email', {
    email: email,
  });
  return res.data;
};

export const postVerifyEmail = async ({
  email,
  authorizationCode,
}: IPostEmailVerifyReq): Promise<APIResponse<IPostEmailVerifyRes>> => {
  const res = await axiosCommonInstance.post('/api/email/verify', {
    email: email,
    authorizationCode: authorizationCode,
  });
  return res.data;
};

export const postSignup = async ({ email, password, name }: IPostJoinReq): Promise<APIResponse<IPostJoinRes>> => {
  const res = await axiosCommonInstance.post('/api/auth/join', {
    email: email,
    password: password,
    name: name,
  });
  return res.data;
};

export const postLogin = async ({ email, password }: IPostLoginReq): Promise<APIResponse<IPostLoginRes>> => {
  const res = await axiosCommonInstance.post('/api/auth/login', {
    email: email,
    password: password,
  });

  if (res.status === 200 && res.headers.authorization) {
    localStorage.setItem('PREVIEW_ACCESS_TOKEN', res.headers.authorization.replace('Bearer ', ''));
  }

  return res.data;
};
