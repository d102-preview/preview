import { getCommonQuestionList } from '@/services/question/api';
import { useQuery } from '@tanstack/react-query';

export const useQuestion = () => {
  const useGetCommonQuestionList = () => {
    return useQuery({ queryKey: ['commonQuestions', 'resumeQuestions'], queryFn: () => getCommonQuestionList() });
  };

  return { useGetCommonQuestionList };
};
