import { axiosAuthInstance, axiosFileInstance } from '@/apis/axiosInstance';
import { APIResponse, IPasswordInfo } from '@/types/model';
import { IGetUserRes, IPatchUserReq, IPatchUserRes, IPostProfileRes } from '@/types/user';

export const getUser = async (): Promise<APIResponse<IGetUserRes>> => {
  const res = await axiosAuthInstance.get('/api/user');
  return res.data;
};

export const deleteUser = async (): Promise<APIResponse<null>> => {
  const res = await axiosAuthInstance.delete('/api/user');
  return res.data;
};

export const patchUser = async ({ key, value }: IPatchUserReq): Promise<APIResponse<IPatchUserRes>> => {
  const res = await axiosAuthInstance.patch('/api/user', {
    [key]: value,
  });
  return res.data;
};

export const patchPassword = async ({
  currentPassword,
  changedPassword,
  checkChangePassword,
}: IPasswordInfo): Promise<APIResponse<null>> => {
  const res = await axiosAuthInstance.patch('/api/user/password', {
    currentPassword: currentPassword,
    changedPassword: changedPassword,
    checkChangePassword: checkChangePassword,
  });
  return res.data;
};

export const postProfile = async (profile: FormData): Promise<APIResponse<IPostProfileRes>> => {
  const res = await axiosFileInstance.post('/file/upload/profile', profile);
  return res.data;
};
