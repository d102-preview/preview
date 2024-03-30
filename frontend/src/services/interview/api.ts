import { axiosAuthInstance, axiosFileInstance } from '@/apis/axiosInstance';
import { IInterviewQuestionRes } from '@/types/interview';
import { APIResponse, APISimpleResponse } from '@/types/model';

export const getMainInterviewQuestionList = async (resumeId: number): Promise<APIResponse<IInterviewQuestionRes>> => {
  const res = await axiosAuthInstance.get(`/api/interview/${resumeId}`);
  console.log(res);
  return res.data;
};

export const getInterviewAnalyze = async (info: FormData): Promise<APISimpleResponse> => {
  const res = await axiosFileInstance.post('/file/upload/video', info);
  console.log(res);
  return res.data;
};
