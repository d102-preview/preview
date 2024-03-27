import { getQuestionList, getQuestion } from '@/services/question/api';
import { useQuery } from '@tanstack/react-query';
import { questionType } from '@/types/question';

export const useQuestion = () => {
  const useGetQuestionList = (type: questionType) => {
    return useQuery({ queryKey: ['questionList', type], queryFn: () => getQuestionList(type) });
  };

  const useGetQuestion = (type: questionType, questionId: number) => {
    return useQuery({
      queryKey: [`${type}Question`, questionId],
      queryFn: () => getQuestion(type, questionId),
    });
  };
  return { useGetQuestionList, useGetQuestion };
};
