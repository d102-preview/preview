import { ICommonQuestionsRes } from '@/types/commonQuestion';
import { APIResponse } from '@/types/model';
import axios from 'axios';

export const getCommonQuestionList = async (): Promise<APIResponse<ICommonQuestionsRes>> => {
  const res = await axios.get('/api/common/question/list');
  console.log(res);
  return res.data;
};
