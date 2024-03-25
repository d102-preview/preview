import { IGetEmailDuplicateRes, IPostEmailCertificationRes, IPostEmailVerifyRes } from '@/types/auth';
import { APIResponse } from '@/types/model';

export const getEmailDuplicateRes: APIResponse<IGetEmailDuplicateRes> = {
  result: 'ok',
  data: {
    available: true,
  },
};

export const postEmailCertificationRes: APIResponse<IPostEmailCertificationRes> = {
  result: 'ok',
  data: {
    result: '',
  },
};

export const postEmailVerifyRes: APIResponse<IPostEmailVerifyRes> = {
  result: 'ok',
  data: {
    verify: true,
  },
};
