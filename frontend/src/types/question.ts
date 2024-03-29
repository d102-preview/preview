import { IQuestionDetail, IQuestionListItem, IPaginationResponse, APIResponse } from './model';

export interface IQuestionListPaginationResponse extends IPaginationResponse {
  content: IQuestionListItem[];
}

export interface IQuestionListRes {
  questionList: IQuestionListPaginationResponse;
}

export interface IQuestionRes {
  questionDetail: IQuestionDetail;
}

export interface IQuestionsDetailsRes {
  [key: string]: APIResponse<IQuestionRes>;
}

export type questionType = 'common' | 'resume';

export interface IScriptReq {
  script: string;
}

export interface IScriptInfo {
  type: questionType;
  questionId: number;
  script: IScriptReq;
}

export interface IScriptRes {
  id: number;
  script: string | null;
}
