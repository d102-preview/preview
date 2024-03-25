import { getCommonQuestionList, getCommonQuestion } from '@/services/question/api';
import { useQuery } from '@tanstack/react-query';

export const useQuestion = () => {
  const useGetCommonQuestionList = () => {
    return useQuery({ queryKey: ['commonQuestions', 'resumeQuestions'], queryFn: () => getCommonQuestionList() });
  };

  const useGetCommonQuestion = (commonQuestionId: number) => {
    return useQuery({
      queryKey: ['commonQuestion', commonQuestionId],
      queryFn: () => getCommonQuestion(commonQuestionId),
    });
  };
  return { useGetCommonQuestionList, useGetCommonQuestion };
};