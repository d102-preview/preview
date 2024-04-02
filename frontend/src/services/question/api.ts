import {
  IDealsListInfiniteReq,
  IQeustionInfo,
  IQuestionListRes,
  IQuestionRes,
  questionType,
  IScriptInfo,
  IScriptRes,
  IKeywordInfo,
  IKeywordRes,
  IResumeRes,
} from '@/types/question';
import { APIResponse, IStatusRes } from '@/types/model';
import { axiosAuthInstance, axiosCommonInstance } from '@/apis/axiosInstance';

export const getCommonQuestionListReq = async ({
  page,
  size,
  sort,
}: IDealsListInfiniteReq): Promise<APIResponse<IQuestionListRes>> => {
  const res = await axiosCommonInstance.get(`/api/common/question/list`, {
    params: {
      page: page,
      size: size,
      sort: sort,
    },
  });
  return res.data;
};

export const getResumeQuestionListReq = async ({
  resumeId,
  page,
  size,
  sort,
}: IDealsListInfiniteReq): Promise<APIResponse<IQuestionListRes>> => {
  const res = await axiosAuthInstance.get(`/api/resume/question/list/${resumeId}`, {
    params: {
      page: page,
      size: size,
      sort: sort,
    },
  });
  return res.data;
};

export const getCommonQuestionList = async (): Promise<APIResponse<IQuestionListRes>> => {
  const params = { page: 0, size: 10 };
  const res = await axiosCommonInstance.get(`/api/common/question/list`, { params });
  return res.data;
};

export const getResumeQuestionList = async (resumeId: number): Promise<APIResponse<IQuestionListRes>> => {
  const params = { page: 0, size: 10 };
  const res = await axiosAuthInstance.get(`/api/resume/question/list/${resumeId}`, { params });
  return res.data;
};

export const getQuestion = async ({ type, questionId }: IQeustionInfo): Promise<APIResponse<IQuestionRes>> => {
  const res = await axiosAuthInstance.get(`/api/${type}/question/${questionId}`);
  return res.data;
};

export const postScrtip = async ({ type, questionId, script }: IScriptInfo): Promise<APIResponse<IScriptRes>> => {
  const res = await axiosAuthInstance.post(`/api/${type}/question/script/${questionId}`, script);
  return res.data;
};

export const postKeyword = async ({ type, questionId, keyword }: IKeywordInfo): Promise<APIResponse<IKeywordRes>> => {
  const res = await axiosAuthInstance.post(`/api/${type}/question/keyword/${questionId}`, keyword);
  return res.data;
};

export const deleteKeyword = async (type: questionType, keywordId: number): Promise<APIResponse<null>> => {
  const res = await axiosAuthInstance.delete(`/api/${type}/question/keyword/${keywordId}`);
  return res.data;
};

export const getResumeList = async (): Promise<APIResponse<IResumeRes>> => {
  const res = await axiosAuthInstance.get(`/api/resume/list`);
  return res.data;
};

export const checkQuestionStatus = async (resumeId: number): Promise<APIResponse<IStatusRes>> => {
  const res = await axiosAuthInstance.get(`/api/task/question/list/${resumeId}`);
  return res.data;
};
