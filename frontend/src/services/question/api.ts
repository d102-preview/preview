import { IQuestionListRes, IQuestionRes, questionType } from '@/types/question';
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
