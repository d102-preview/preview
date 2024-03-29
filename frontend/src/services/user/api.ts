import { axiosAuthInstance, axiosFileInstance } from '@/apis/axiosInstance';
import { APIResponse, IPasswordInfo } from '@/types/model';
import { IGetUserRes, IPatchUserReq, IPatchUserRes, IPostProfileRes } from '@/types/user';

export const getUser = async (): Promise<APIResponse<IGetUserRes>> => {
  const res = await axiosAuthInstance.get('/api/user');
  console.log('회원 조회 ', res);
  return res.data;
};

export const deleteUser = async (): Promise<APIResponse<null>> => {
  const res = await axiosAuthInstance.delete('/api/user');
  console.log('회원 삭제 ', res);
  return res.data;
};

export const patchUser = async ({ key, value }: IPatchUserReq): Promise<APIResponse<IPatchUserRes>> => {
  const res = await axiosAuthInstance.patch('/api/user', {
    [key]: value,
  });

  console.log('회원 정보 수정 ', res);
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
  console.log('비밀번호 수정', res);
  return res.data;
};

export const postProfile = async (profile: FormData): Promise<APIResponse<IPostProfileRes>> => {
  const res = await axiosFileInstance.post('/file/upload/profile', profile);
  console.log('프로필 업로드', res);
  return res.data;
};
