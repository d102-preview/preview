// 공통 응답 객체 타입
export interface APIResponse<T> {
  result: 'ok' | 'fail';
  data: T;
}

// 면접 질문 리스트 타입
export interface IQuestionItem {
  id: number;
  question: string;
  type: interviewType;
  keywordList: IKeywordItem[] | null;
}

export type interviewType = 'common' | 'resume';

// 면접 스크립트 타입
export interface IScriptItem {
  id: number;
  script: string | null;
}

// 면접 키워드 리스트 타입
export interface IKeywordItem {
  id: number;
  keyword: string;
}

// 이력서 리스트 타입
export interface IResumeList {
  name: string;
  filePath: string;
}

export interface IQuestionListItem {
  id: number;
  question: string;
}

// 페이지네이션 정보 타입
export interface IPaginationResponse {
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

export interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort: ISort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface IQuestionDetail {
  script: IScriptItem;
  keywords: IKeywordItem[];
}

export interface ISubText {
  text: string;
  type: 'success' | 'info' | 'error';
}