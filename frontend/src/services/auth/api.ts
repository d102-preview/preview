import {
  IGetEmailDuplicateRes,
  IPostEmailCertificationRes,
  IPostEmailVerifyReq,
  IPostEmailVerifyRes,
} from '@/types/auth';
import { APIResponse } from '@/types/model';
import axios from 'axios';
import { IPostJoinReq, IPostJoinRes } from './../../types/auth';

export const getIsEmailDuplicate = async (email: string): Promise<APIResponse<IGetEmailDuplicateRes>> => {
  const res = await axios.get(`/api/email?email=${email}`);
  console.log('1)', res.data);
  return res.data;
};

export const postEmailCertification = async (email: string): Promise<APIResponse<IPostEmailCertificationRes>> => {
  const res = await axios.post('/api/email', {
    email: email,
  });

  console.log('1)', res.data);
  return res.data;
};

export const postVerifyEmail = async ({
  email,
  authorizationCode,
}: IPostEmailVerifyReq): Promise<APIResponse<IPostEmailVerifyRes>> => {
  const res = await axios.post('/api/email/verify', {
    email: email,
    authorizationCode: authorizationCode,
  });

  console.log('1)', res.data);
  return res.data;
};

export const postSignup = async ({ email, password, name }: IPostJoinReq): Promise<APIResponse<IPostJoinRes>> => {
  const res = await axios.post('/api/auth/join', {
    email: email,
    password: password,
    name: name,
  });

  return res.data;
};
