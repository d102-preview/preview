import { IQuestionListRes, IQuestionRes } from '@/types/question';
import { APIResponse } from '@/types/model';
import axios from 'axios';

export const getQuestionList = async <T extends 'common' | 'resume'>(
  type: T,
): Promise<APIResponse<IQuestionListRes>> => {
  const res = await axios.get(`/api/${type}/question/list`);
  console.log(res);
  return res.data;
};

export const getQuestion = async <T extends 'common' | 'resume'>(
  type: T,
  questionId: number,
): Promise<APIResponse<IQuestionRes>> => {
  const res = await axios.get(`/api/${type}/question?${type}QuestionId=${questionId}`);
  console.log(res);
  return res.data;
};
