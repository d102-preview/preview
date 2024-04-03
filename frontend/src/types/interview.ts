import { questionType } from './model';

export interface IInterviewQuestionRes {
  questionList: IInterviewQuestionItem[];
}

export interface IInterviewAnalyzeReq {
  interviewId: number;
  questionType: questionType;
  question: string;
  answer: string;
  skip: boolean;
  keywordList: string[];
}

// 실전 면접 질문 목록
export interface IInterviewQuestionItem {
  question: string;
  type: questionType;
  keywordList: IAnalyzeResKeyword[];
  id?: number;
  script?: string;
}

// // 실전 면접 키워드
export interface IAnalyzeResKeyword {
  keyword: string;
}

// 실전 면접 꼬리 질문 request
export interface IInterviewFollowupReq {
  question: string;
  answer: string;
}

// 실전 면접 꼬리 질문 response
export interface IInterviewFollowupRes {
  followUpQuestion: IFollowUpQuestion;
}

export interface IFollowUpQuestion {
  question: string;
}

// 면접 세트 생성 및 아이디 조회 response
export interface IInterviewSetRes {
  interview: IInterviewSeId;
}

// 면접 세트 생성 및 아이디 조회 request
export interface IInterviewSetReq {
  type: 'main' | 'mock';
  startTime: string;
}

export interface IInterviewSeId {
  id: number;
}
