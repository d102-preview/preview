import { IQuestionListRes, IQuestionRes, questionType, IScriptInfo, IScriptRes } from '@/types/question';
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
  console.log('스크립트 작성', res);
  return res.data;
};
