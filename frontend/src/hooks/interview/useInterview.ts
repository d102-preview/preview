import { getMainInterviewQuestionList } from '@/services/interview/api';
import { useMutation } from '@tanstack/react-query';

export const useInterview = () => {
  const useGetMainInterviewQuestionList = () => {
    return useMutation({
      mutationKey: ['interview', 'questionList'],
      mutationFn: () => getMainInterviewQuestionList(),
      onSuccess: () => {
        console.log('success');
      },
      onError: () => {
        console.log('fail');
      },
    });
  };

  return { useGetMainInterviewQuestionList };
};