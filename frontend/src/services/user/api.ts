import { axiosCommonInstance } from '@/apis/axiosInstance';
import { APIResponse, IPasswordInfo } from '@/types/model';
import { IGetUserRes, IPatchUserReq, IPatchUserRes } from '@/types/user';

export const getUser = async (): Promise<APIResponse<IGetUserRes>> => {
  const res = await axiosCommonInstance.get('/api/user');
  console.log('회원 조회 ', res);
  return res.data;
};

export const deleteUser = async (): Promise<APIResponse<null>> => {
  const res = await axiosCommonInstance.delete('/api/user');
  console.log('회원 삭제 ', res);
  return res.data;
};

export const patchUser = async ({ key, value }: IPatchUserReq): Promise<APIResponse<IPatchUserRes>> => {
  const res = await axiosCommonInstance.patch('/api/user', {
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
  const res = await axiosCommonInstance.patch('/api/user/password', {
    currentPassword: currentPassword,
    changedPassword: changedPassword,
    checkChangePassword: checkChangePassword,
  });
  console.log('비밀번호 수정', res);
  return res.data;
};
