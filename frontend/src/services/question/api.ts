import {
  IQuestionListRes,
  IQuestionRes,
  questionType,
  IScriptInfo,
  IScriptRes,
  IKeywordInfo,
  IKeywordRes,
} from '@/types/question';
import { APIResponse } from '@/types/model';
import { axiosAuthInstance, axiosCommonInstance } from '@/apis/axiosInstance';

export const getQuestionList = async (type: questionType): Promise<APIResponse<IQuestionListRes>> => {
  // @TODO: 무한 스크롤로 변경하기
  const params = { page: 0, size: 10 };
  const res = await axiosCommonInstance.get(`/api/${type}/question/list`, { params });
  return res.data;
};

export const getQuestion = async (type: questionType, questionId: number): Promise<APIResponse<IQuestionRes>> => {
  const res = await axiosAuthInstance.get(`/api/${type}/question/${questionId}`);
  return res.data;
};

export const postScrtip = async ({ type, questionId, script }: IScriptInfo): Promise<APIResponse<IScriptRes>> => {
  const res = await axiosAuthInstance.post(`/api/${type}/question/script/${questionId}`, script);
  return res.data;
};

export const postKeyword = async ({ type, questionId, keyword }: IKeywordInfo): Promise<APIResponse<IKeywordRes>> => {
  const res = await axiosAuthInstance.post(`/api/${type}/question/keyword/${questionId}`, keyword);
  console.log('키워드 추가', res);
  return res.data;
};
