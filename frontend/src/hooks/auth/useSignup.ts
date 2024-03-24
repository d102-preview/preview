import { getIsEmailDuplicate } from '@/services/auth/api';
import { useMutation } from '@tanstack/react-query';

export const useSignup = () => {
  const useGetIsDuplicateEmail = () => {
    return useMutation({
      mutationFn: (email: string) => getIsEmailDuplicate(email),
      onSuccess: data => {
        console.log('이메일 중복 확인 성공', data);
      },
      onError: err => {
        console.log('이메일 중복 확인 실패', err);
      },
    });
  };

  return { useGetIsDuplicateEmail };
};
