import {
  getCommonQuestionList,
  getResumeQuestionList,
  getQuestion,
  postScrtip,
  postKeyword,
  deleteKeyword,
  getResumeList,
  checkQuestionStatus,
  getCommonQuestionListReq,
  getResumeQuestionListReq,
} from '@/services/question/api';
import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import {
  IQeustionInfo,
  IScriptInfo,
  IKeywordInfo,
  IDeleteKeywordInfo,
  IDealsListInfiniteReq,
  IResumeRes,
} from '@/types/question';
import { APIResponse, questionType } from '@/types/model';
import { useEffect } from 'react';

export const useQuestion = () => {
  const useGetCommonQuestionList = () => {
    return useQuery({ queryKey: ['CommonQuestionList'], queryFn: () => getCommonQuestionList() });
  };

  const useGetRusmeQuestionList = (resumeId: number) => {
    return useQuery({
      queryKey: ['ResumeQuestionList', resumeId],
      queryFn: () => getResumeQuestionList(resumeId),
      enabled: resumeId !== -1, // enabled 값이 0 false이면 쿼리가 자동적으로 실행되는 것을 막을 수 있음
    });
  };

  const useGetListInfinite = (
    props: IDealsListInfiniteReq & { resumeId?: number },
    type: questionType,
    // enabled = true,
  ) => {
    return useInfiniteQuery({
      queryKey: ['questionsInfinite', props],
      queryFn: ({ pageParam }) => {
        if (type === 'common') {
          return getCommonQuestionListReq({ ...props, page: pageParam });
        } else if (type === 'resume' && props.resumeId) {
          return getResumeQuestionListReq({ ...props, page: pageParam });
        }
      },
      initialPageParam: 0, // 페이지는 0부터 시작하도록 설정
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && !lastPage.data.questionList.last) {
          const nextPage = allPages.length + 1;
          if (lastPage.data.questionList.last) return; // 마지막 페이지면
          return nextPage;
        }
      },
      // resume 타입일 때 resumeId가 -1이 아니어야 하며, common 타입일 때는 항상 enabled
      // enabled: enabled && ((type === 'resume' && props.resumeId && props.resumeId !== -1) || type === 'common'),
    });
  };

  const useGetQuestion = ({ type, questionId }: IQeustionInfo) => {
    return useMutation({
      mutationKey: [`${type}Question`, questionId],
      mutationFn: () => getQuestion({ type, questionId }),
    });
  };

  const usePostScript = ({ type, questionId }: IQeustionInfo) => {
    return useMutation({
      mutationKey: [`${type}Script`, questionId],
      mutationFn: ({ type, questionId, script }: IScriptInfo) => postScrtip({ type, questionId, script }),
    });
  };

  const usePostKeyword = ({ type, questionId }: IQeustionInfo) => {
    return useMutation({
      mutationKey: [`${type}Script`, questionId],
      mutationFn: ({ type, questionId, keyword }: IKeywordInfo) => postKeyword({ type, questionId, keyword }),
    });
  };

  const useDeleteKeyword = () => {
    return useMutation({
      mutationFn: ({ type, keywordId }: IDeleteKeywordInfo) => deleteKeyword(type, keywordId),
    });
  };

  const useGetResumeList = () => {
    return useQuery<APIResponse<IResumeRes>, Error>({
      queryKey: ['ResumeList'],
      queryFn: () => getResumeList(),
    });
  };

  const useGetQuestionStatus = (resumeId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ['questionStatus', resumeId],
      mutationFn: () => checkQuestionStatus(resumeId),
      onSuccess: data => {
        if (data.data.status === 'success') {
          queryClient.invalidateQueries({ queryKey: ['questionsInfinite'] });
        }
        console.log(data);
      },
    });
  };

  const useGetListWithStatusCheck = () => {
    const queryClient = useQueryClient();
    const { data, isSuccess } = useQuery<APIResponse<IResumeRes>, Error>({
      queryKey: ['ResumeList'],
      queryFn: getResumeList,
    });

    const intervalIds: { [resumeId: number]: NodeJS.Timeout } = {};

    useEffect(() => {
      const checkAndUpdateStatus = async () => {
        if (isSuccess && data) {
          data.data.resumeList.map(resume => {
            if (resume.status === 'process') {
              // 이력서의 상태를 주기적으로 확인하는 함수
              const checkStatusPeriodically = async (resumeId: number) => {
                try {
                  const statusRes = await checkQuestionStatus(resumeId);
                  if (statusRes.data.status !== 'process') {
                    clearInterval(intervalIds[resumeId]); // 주기적 확인 중단
                    delete intervalIds[resumeId]; // 사용된 intervalId는 삭제
                    // 낙관적 UI 업데이트
                    queryClient.setQueryData<APIResponse<IResumeRes>>(['ResumeList'], oldData => ({
                      ...oldData!,
                      data: {
                        ...oldData!.data,
                        resumeList: oldData!.data.resumeList.map(r =>
                          r.id === resumeId ? { ...r, status: statusRes.data.status } : r,
                        ),
                      },
                    }));
                  }
                } catch (error) {
                  console.error(`Error checking status for resume ${resume.id}:`, error);
                }
              };

              // 이력서의 상태를 5초마다 확인합니다.
              intervalIds[resume.id] = setInterval(() => checkStatusPeriodically(resume.id), 5000);
            }
          });
        }
      };

      checkAndUpdateStatus();

      // 컴포넌트가 언마운트될 때 모든 주기적 호출을 정리합니다.
      return () => {
        Object.values(intervalIds).forEach(clearInterval); // Cleanup on unmount
      };
    }, [isSuccess, data, queryClient]);

    return { data };
  };

  return {
    useGetCommonQuestionList,
    useGetRusmeQuestionList,
    useGetQuestion,
    usePostScript,
    usePostKeyword,
    useDeleteKeyword,
    useGetResumeList,
    useGetQuestionStatus,
    useGetListInfinite,
    useGetListWithStatusCheck,
  };
};
