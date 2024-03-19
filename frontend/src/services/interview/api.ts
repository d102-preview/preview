// import { axiosAuthInstance } from '@/apis/axiosInstance';
import { IInterviewQuestionRes } from '@/types/interview';
import { APIResponse } from '@/types/model';
import axios from 'axios';

// axiosAuthInstance
export const getMainInterviewQuestionList = async (): Promise<APIResponse<IInterviewQuestionRes>> => {
  const res = await axios.get('/api/interview/main');
  console.log(res);
  return res.data;
};
