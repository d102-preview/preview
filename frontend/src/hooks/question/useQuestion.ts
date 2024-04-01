import {
  getCommonQuestionList,
  getResumeQuestionList,
  getQuestion,
  postScrtip,
  postKeyword,
  deleteKeyword,
  getResumeList,
  checkQuestionStatus,
} from '@/services/question/api';
import { useQuery, useMutation } from '@tanstack/react-query';
import { IQeustionInfo, IScriptInfo, IKeywordInfo, IDeleteKeywordInfo } from '@/types/question';

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
      onSuccess: res => {
        console.log('스크립트 성공', res);
      },
      onError: err => {
        console.log('스크립트 실패', err);
      },
    });
  };

  const usePostKeyword = ({ type, questionId }: IQeustionInfo) => {
    return useMutation({
      mutationKey: [`${type}Script`, questionId],
      mutationFn: ({ type, questionId, keyword }: IKeywordInfo) => postKeyword({ type, questionId, keyword }),
      onSuccess: res => {
        console.log('키워드 추가 성공', res);
      },
      onError: err => {
        console.log('키워드 추가 실패', err);
      },
    });
  };

  const useDeleteKeyword = () => {
    return useMutation({
      mutationFn: ({ type, keywordId }: IDeleteKeywordInfo) => deleteKeyword(type, keywordId),
      onSuccess: res => {
        console.log('키워드 삭제 성공', res);
      },
      onError: err => {
        console.log('키워드 삭제 실패', err);
      },
    });
  };

  const useGetResumeList = () => {
    return useQuery({ queryKey: ['ResumeList'], queryFn: () => getResumeList() });
  };

  const useGetQuestionStatus = (resumeId: number, options = {}) => {
    return useQuery({
      queryKey: ['questionStatus', resumeId],
      queryFn: () => checkQuestionStatus(resumeId),
      enabled: resumeId !== -1,
      ...options,
    });
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
  };
};
