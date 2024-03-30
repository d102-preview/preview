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

// 질문 리스트 타입
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
  keywordList: IKeywordItem[];
}

export interface ISubText {
  text: string;
  type: 'success' | 'info' | 'error';
}

export interface ResultItemData {
  result: 'ok' | 'fail';
  id: number;
  imagePath: string;
  type: 'mock' | 'main';
  date: Date;
  question: string;
  time: string;
}

// 회원 정보
export interface IUserInfo {
  email: string;
  profileImageName?: string;
  profileImageUrl: string;
  name: string;
  resumeList: (IResume | undefined)[];
}

// 이력서 정보
export interface IResume {
  id: number;
  displayName: string;
  filePath: string;
}

// 이력서 정보
export interface ISimpleResume {
  id: number;
  displayName: string;
}

// 비밀번호 정보
export interface IPasswordInfo {
  currentPassword: string;
  changedPassword: string;
  checkChangePassword: string;
}

export interface IProfile {
  url: string;
}

// 작업 완료 여부 응답 객체
export interface IStatusRes {
  complete: boolean;
}
