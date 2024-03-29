import { getQuestionList, getQuestion, postScrtip, postKeyword } from '@/services/question/api';
import { useQuery, useMutation } from '@tanstack/react-query';
import { questionType, IScriptInfo, IKeywordInfo } from '@/types/question';

export const useQuestion = () => {
  const useGetQuestionList = (type: questionType) => {
    return useQuery({ queryKey: ['questionList', type], queryFn: () => getQuestionList(type) });
  };

  const useGetQuestion = (type: questionType, questionId: number) => {
    return useMutation({
      mutationKey: [`${type}Question`, questionId],
      mutationFn: () => getQuestion(type, questionId),
      onSuccess: res => {
        console.log('2) 질문 상세 조회 성공', res);
      },
      onError: err => {
        console.log('2) 질문 상세 조회 실패', err);
      },
    });
  };

  const usePostScript = (type: questionType, questionId: number) => {
    return useMutation({
      mutationKey: [`${type}Script`, questionId],
      mutationFn: ({ type, questionId, script }: IScriptInfo) => postScrtip({ type, questionId, script }),
      onSuccess: res => {
        console.log('스크립트 작성 성공', res);
      },
      onError: err => {
        console.log('스크립트 작성 실패', err);
      },
    });
  };

  const usePostKeyword = (type: questionType, questionId: number) => {
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

  return { useGetQuestionList, useGetQuestion, usePostScript, usePostKeyword };
};
