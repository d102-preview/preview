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
import { APIResponse, interviewType } from '@/types/model';
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
    type: interviewType,
    enabled = true,
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
      getNextPageParam: lastPage => {
        if (lastPage && !lastPage.data.questionList.last) {
          const nextPage = lastPage.data.questionList.number + 1;
          if (lastPage.data.questionList.last) return; // 마지막 페이지면
          return nextPage;
        }
      },
      // resume 타입일 때 resumeId가 -1이 아니어야 하며, common 타입일 때는 항상 enabled
      enabled: enabled && ((type === 'resume' && props.resumeId && props.resumeId !== -1) || type === 'common'),
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

  const useGetQuestionStatus = (resumeId: number, options = {}) => {
    return useQuery({
      queryKey: ['questionStatus', resumeId],
      queryFn: () => checkQuestionStatus(resumeId),
      enabled: resumeId !== -1,
      ...options,
    });
  };

  const useGetListWithStatusCheck = () => {
    const queryClient = useQueryClient();
    const { data, isSuccess } = useQuery<APIResponse<IResumeRes>, Error>({
      queryKey: ['ResumeList'],
      queryFn: getResumeList,
    });

    useEffect(() => {
      const checkAndUpdateStatus = async () => {
        if (isSuccess && data?.data?.resumeList) {
          // 모든 이력서에 대해 상태 확인
          for (const resume of data?.data?.resumeList) {
            if (!resume.complete) {
              // complete가 false이면 상태 확인 함수에 resumeId 전달
              const statusRes = await checkQuestionStatus(resume.id);
              if (statusRes.data.complete) {
                // 캐시 업데이트
                queryClient.setQueryData<APIResponse<IResumeRes>>(['ResumeList'], oldData => {
                  return {
                    ...oldData!,
                    data: {
                      ...oldData!.data,
                      resumeList: oldData!.data.resumeList.map(r =>
                        r.id === resume.id ? { ...r, complete: true } : r,
                      ),
                    },
                  };
                });
              }
            }
          }
        }
      };

      checkAndUpdateStatus();
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
