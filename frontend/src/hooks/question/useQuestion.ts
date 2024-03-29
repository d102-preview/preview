import { getQuestionList, getQuestion } from '@/services/question/api';
import { useQuery, useMutation } from '@tanstack/react-query';
import { questionType } from '@/types/question';

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

  return { useGetQuestionList, useGetQuestion };
};
