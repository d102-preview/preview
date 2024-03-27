import { deleteUser, getUser, patchPassword, patchUser } from '@/services/user/api';
import { IPasswordInfo } from '@/types/model';
import { IPatchUserReq } from '@/types/user';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useUser = () => {
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
    });
  };

  return { useGetUser, useDeleteUser, usePatchUser, usePatchPassword };
};
