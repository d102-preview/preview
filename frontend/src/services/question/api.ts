import { IQuestionListRes, IQuestionRes } from '@/types/question';
import { APIResponse } from '@/types/model';
import { axiosCommonInstance } from '@/apis/axiosInstance';
import { questionType } from '@/types/question';

export const getQuestionList = async (type: questionType): Promise<APIResponse<IQuestionListRes>> => {
  // @TODO: 무한 스크롤로 변경하기
  const params = { page: 0, size: 10 };
  const { data } = await axiosCommonInstance.get(`/api/${type}/question/list`, { params });
  console.log('1) 질문 리스트', data);
  return data;
};

// @TODO: 헤더에 토큰 보내기
export const getQuestion = async (type: questionType, questionId: number): Promise<APIResponse<IQuestionRes>> => {
  const { data } = await axiosCommonInstance.get(`/api/${type}/question?${type}QuestionId=${questionId}`);
  console.log('1) 질문 상세', data);
  return data;
};
