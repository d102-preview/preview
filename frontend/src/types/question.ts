import {
  IKeywordItem,
  IQuestionDetail,
  IQuestionListItem,
  IPaginationResponse,
  APIResponse,
  ISimpleResume,
} from './model';

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

export interface IScriptInfo extends IQeustionInfo {
  script: IScriptReq;
}

export interface IScriptRes {
  id: number;
  script: string | null;
}

export interface IKeywordReq {
  keyword: string;
}

export interface IKeywordRes {
  keywordList: IKeywordItem[];
}

export interface IKeywordInfo extends IQeustionInfo {
  keyword: IKeywordReq;
}

export interface IQeustionInfo {
  type: questionType;
  questionId: number;
}

export interface IDeleteKeywordInfo {
  type: questionType;
  keywordId: number;
}

export interface IResumeRes {
  resumeList: ISimpleResume[];
}
