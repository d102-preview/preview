import { IGetEmailDuplicateRes, IPostEmailCertificationRes, IPostEmailVerifyRes, IPostJoinRes } from '@/types/auth';
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

export const postJoinRes: APIResponse<IPostJoinRes> = {
  result: 'ok',
  data: {
    user: {
      email: 'tnghk9611@naver.com',
      profileImageName: 'image',
      profileImageUrl: 'image',
      name: '이수화',
    },
  },
};
