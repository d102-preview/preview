import { postInterviewAnalyze, getMainInterviewQuestionList, postFollowupQuestion } from '@/services/interview/api';
import { IInterviewFollowupReq } from '@/types/interview';
import { useMutation } from '@tanstack/react-query';

export const useInterview = () => {
  const useGetMainInterviewQuestionList = () => {
    return useMutation({
      mutationKey: ['interview', 'questionList'],
      mutationFn: (resumeId: number) => getMainInterviewQuestionList(resumeId),
      onSuccess: () => {
        console.log('success');
      },
      onError: () => {
        console.log('fail');
      },
    });
  };

  const usePostInterviewAnalyze = () => {
    return useMutation({
      mutationKey: ['interview', 'analyze'],
      mutationFn: (info: FormData) => postInterviewAnalyze(info),
      onSuccess: () => {
        console.log('success');
      },
      onError: () => {
        console.log('fail');
      },
    });
  };

  const usePostFollowupQuestion = () => {
    return useMutation({
      mutationKey: ['interview', 'followup'],
      mutationFn: (info: IInterviewFollowupReq) => postFollowupQuestion(info),
      onSuccess: () => {
        console.log('success');
      },
      onError: () => {
        console.log('fail');
      },
    });
  };

  return { useGetMainInterviewQuestionList, usePostInterviewAnalyze, usePostFollowupQuestion };
};
