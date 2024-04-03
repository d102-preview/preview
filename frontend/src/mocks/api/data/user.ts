import { APIResponse } from '@/types/model';
import { IGetUserRes, IPatchUserRes } from '@/types/user';

export const getUserRes: APIResponse<IGetUserRes> = {
  result: 'ok',
  data: {
    user: {
      email: 'tnghk9611@naver.com',
      name: '이수화',
      profileImageName: '',
      profileImageUrl: 'https://t1.kakaocdn.net/together_action_prod/admin/20230730/b8d3ba0648d64f5c8564b2e7e908a171',
      resumeList: [
        {
          id: 0,
          displayName: '수화의 이력서',
          filePath: 'file:///Users/lsh/Downloads/2024%20NAVER%20Diary%20ORANGE.pdf',
          fileSize: '3000',
          status: 'success',
        },
      ],
    },
  },
};

export const deleteUserRes: APIResponse<null> = {
  result: 'ok',
  data: null,
};

export const patchUserRes: APIResponse<IPatchUserRes> = {
  result: 'ok',
  data: {
    user: {
      email: 'tnghk9611@naver.com',
      name: '이수화',
      profileImageName: '',
      profileImageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3y0SNLoQ2b2mZPT12onQlsRDn0X2elSzYcYyXG3sMMsjnjMyCc63H0u4fvWU-NA51OhY&usqp=CAU',
      resumeList: [
        {
          id: 1,
          displayName: '수화의 이력서',
          filePath: '',
          fileSize: '3000',
          status: 'success',
        },
      ],
    },
  },
};

export const patchPasswordRes: APIResponse<null> = {
  result: 'ok',
  data: null,
};
