import { ICommonQuestionsRes, ICommonQuestionRes } from '@/types/question';
import { APIResponse } from '@/types/model';
import axios from 'axios';

export const getCommonQuestionList = async (): Promise<APIResponse<ICommonQuestionsRes>> => {
  const res = await axios.get('/api/common/question/list');
  console.log(res);
  return res.data;
};

export const getCommonQuestion = async (commonQuestionId: number): Promise<APIResponse<ICommonQuestionRes>> => {
  const res = await axios.get(`/api/common/question?commonQuestionId=${commonQuestionId}`);
  console.log(res);
  return res.data;
};
