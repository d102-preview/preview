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
  profileImageName: string;
  profileImageUrl: string;
  name: string;
}
