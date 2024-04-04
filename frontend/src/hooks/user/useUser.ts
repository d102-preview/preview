import Toast from '@/components/@common/Toast/Toast';
import { deleteUser, getUser, patchPassword, patchUser, postProfile } from '@/services/user/api';
import { IPasswordInfo } from '@/types/model';
import { IPatchUserReq } from '@/types/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useUser = () => {
  const queryClient = useQueryClient();

  const useGetUser = () => {
    return useQuery({
      queryKey: ['my'],
      queryFn: () => getUser(),
    });
  };

  const useDeleteUser = () => {
    return useMutation({
      mutationFn: () => deleteUser(),
    });
  };

  const usePatchUser = () => {
    return useMutation({
      mutationFn: ({ key, value }: IPatchUserReq) => patchUser({ key, value }),
      onSuccess: () => {
        Toast.success('수정되었습니다.');
        queryClient.invalidateQueries({ queryKey: ['my'] });
      },
      onError: () => {
        Toast.error('수정에 실패했습니다.');
      },
    });
  };

  const usePatchPassword = () => {
    return useMutation({
      mutationFn: ({ currentPassword, changedPassword, checkChangePassword }: IPasswordInfo) =>
        patchPassword({
          currentPassword,
          changedPassword,
          checkChangePassword,
        }),
      onSuccess: () => {
        Toast.success('수정되었습니다.');
      },
      onError: err => {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            Toast.error('기존 비밀번호와 다릅니다.');
            return;
          }
        }
        Toast.error('수정에 실패했습니다.');
      },
    });
  };

  const usePostProfile = () => {
    return useMutation({
      mutationFn: (profile: FormData) => postProfile(profile),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['my'] });
        Toast.success('수정되었습니다.');
      },
      onError: err => {
        console.log('에러', err);
        Toast.error('수정에 실패했습니다.');
      },
    });
  };

  return { useGetUser, useDeleteUser, usePatchUser, usePatchPassword, usePostProfile };
};
