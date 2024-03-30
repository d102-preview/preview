import { getQuestionList, getQuestion, postScrtip, postKeyword, deleteKeyword } from '@/services/question/api';
import { useQuery, useMutation } from '@tanstack/react-query';
import { IQeustionInfo, questionType, IScriptInfo, IKeywordInfo, IDeleteKeywordInfo } from '@/types/question';

export const useQuestion = () => {
  const useGetQuestionList = (type: questionType) => {
    return useQuery({ queryKey: ['questionList', type], queryFn: () => getQuestionList(type) });
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

  return { useGetQuestionList, useGetQuestion, usePostScript, usePostKeyword, useDeleteKeyword };
};
