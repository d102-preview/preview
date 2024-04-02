// 공통 응답 객체 타입
export interface APIResponse<T> {
  result: 'ok' | 'fail';
  data: T;
}

// no data response
export interface APISimpleResponse {
  result: 'ok' | 'fail';
}

// 면접 질문 리스트 타입
export interface IQuestionItem {
  id: number;
  question: string;
  type: interviewType;
  keywordList: IKeywordItem[];
}

export type interviewType = 'common' | 'resume' | 'followup';

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
  status: 'success' | 'process' | 'fail';
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
  status: 'success' | 'process' | 'fail';
}

export type statusType = 'success' | 'process' | 'fail';
