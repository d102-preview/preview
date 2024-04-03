import { IKeywordItem, IQuestionDetail, IQuestionListItem, APIResponse, ISimpleResume } from './model';

export interface IQuestionList {
  content: IQuestionListItem[];
  pageable: IPageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: ISort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

// 페이지네이션 정보 타입
export interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort?: ISort;
  offset?: number;
  paged?: boolean;
  unpaged?: boolean;
}

export interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface IQuestionListRes {
  questionList: IQuestionList;
}

export interface IQuestionRes {
  questionDetail: IQuestionDetail;
}

export interface IQuestionsDetailsRes {
  [key: string]: APIResponse<IQuestionRes>;
}

export type questionType = 'common' | 'resume' | 'followup';

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

export interface IuseGetQuestionProps extends IQeustionInfo {
  isEnabled: boolean;
}

export interface IDeleteKeywordInfo {
  type: questionType;
  keywordId: number;
}

export interface IResumeRes {
  resumeList: ISimpleResume[];
}

// 무한스크롤
export interface IDealsListInfiniteReq {
  resumeId?: number;
  page: number;
  size: number;
  sort?: ISort;
}
