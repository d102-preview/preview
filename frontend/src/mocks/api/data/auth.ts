import { IGetIsEmailDuplicateRes } from '@/types/auth';
import { APIResponse } from '@/types/model';

export const getIsEmailDuplicateRes: APIResponse<IGetIsEmailDuplicateRes> = {
  result: 'ok',
  data: {
    available: true,
  },
};
