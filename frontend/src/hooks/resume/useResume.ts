import Toast from '@/components/@common/Toast/Toast';
import { deleteResume, getResume, postResume } from '@/services/resume/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useResume = () => {
  const queryClient = useQueryClient();

  const usePostResume = () => {
    return useMutation({
      mutationFn: (resume: FormData) => postResume(resume),
      onSuccess: () => {
        Toast.success('이력서를 등록했습니다.');
        queryClient.invalidateQueries({
          queryKey: ['my'],
        });
      },
      onError: () => {
        Toast.error('이력서를 등록하지 못했습니다.');
      },
    });
  };

  const useGetResume = () => {
    return useMutation({
      mutationFn: (resumeId: string) => getResume(resumeId),
      onError: () => {
        Toast.error('이력서를 다운로드 하지 못했습니다.');
      },
    });
  };

  const useDeleteResume = () => {
    return useMutation({
      mutationFn: (resumeId: string) => deleteResume(resumeId),
      onSuccess: () => {
        Toast.success('이력서를 삭제했습니다.');
        queryClient.invalidateQueries({
          queryKey: ['my'],
        });
      },
      onError: () => {
        Toast.error('이력서를 삭제하지 못했습니다.');
      },
    });
  };

  return { usePostResume, useGetResume, useDeleteResume };
};
