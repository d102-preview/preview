import { IGetIsEmailDuplicateRes } from '@/types/auth';
import { APIResponse } from '@/types/model';
import axios from 'axios';

export const getIsEmailDuplicate = async (email: string): Promise<APIResponse<IGetIsEmailDuplicateRes>> => {
  const res = await axios.get(`/api/auth/email?email=${email}`);
  console.log(res.data);
  return res.data;
};
