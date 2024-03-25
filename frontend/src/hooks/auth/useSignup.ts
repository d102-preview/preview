import { getIsEmailDuplicate, postEmailCertification, postVerifyEmail } from '@/services/auth/api';
import { useMutation } from '@tanstack/react-query';
import { IPostEmailVerifyReq } from './../../types/auth';

export const useSignup = () => {
  const useGetIsDuplicateEmail = () => {
    return useMutation({
      mutationFn: (email: string) => getIsEmailDuplicate(email),
      onSuccess: res => {
        console.log('2) 이메일 중복 확인 성공', res);
      },
      onError: err => {
        console.log('2) 이메일 중복 확인 실패', err);
      },
    });
  };

  const usePostEmailCertification = () => {
    return useMutation({
      mutationFn: (email: string) => postEmailCertification(email),
      onSuccess: res => {
        console.log('2) 이메일 인증번호 전송 성공', res);
      },
      onError: err => {
        console.log('2) 이메일 인증번호 전송 실패', err);
      },
    });
  };

  const usePostEmailVerify = () => {
    return useMutation({
      mutationFn: ({ email, authorizationCode }: IPostEmailVerifyReq) => postVerifyEmail({ email, authorizationCode }),
      onSuccess: res => {
        console.log('2) 이메일 인증번호 확인 성공', res);
      },
      onError: err => {
        console.log('2) 이메일 인증번호 확인 실패', err);
      },
    });
  };

  return { useGetIsDuplicateEmail, usePostEmailCertification, usePostEmailVerify };
};
