import { axiosAuthInstance, axiosFileInstance } from '@/apis/axiosInstance';
import {
  IInterviewFollowupReq,
  IInterviewFollowupRes,
  IInterviewQuestionRes,
  IInterviewSetReq,
  IInterviewSetRes,
} from '@/types/interview';
import { APIResponse, APISimpleResponse } from '@/types/model';

export const getMainInterviewQuestionList = async (resumeId: number): Promise<APIResponse<IInterviewQuestionRes>> => {
  const res = await axiosAuthInstance.get(`/api/interview/${resumeId}`);
  return res.data;
};

export const postInterviewAnalyze = async (info: FormData): Promise<APISimpleResponse> => {
  const res = await axiosFileInstance.post('/file/upload/video', info);
  return res.data;
};

export const postFollowupQuestion = async (
  info: IInterviewFollowupReq,
): Promise<APIResponse<IInterviewFollowupRes>> => {
  const res = await axiosFileInstance.post('/api/followup/question', info);
  return res.data;
};

export const postInterviewSet = async (info: IInterviewSetReq): Promise<APIResponse<IInterviewSetRes>> => {
  const res = await axiosFileInstance.post('/api/interview', info);
  return res.data;
};
