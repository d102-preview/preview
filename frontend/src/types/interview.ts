import { interviewType } from './model';

export interface IInterviewQuestionRes {
  questionList: IInterviewQuestionItem[];
}

export interface IInterviewAnalyzeRes {
  type: interviewType;
  question: string;
  answer: string;
  skip: boolean;
  setStartTime: string;
  keywordList: IAnalyzeResKeyword[];
}

// 실전 면접 질문 목록
export interface IInterviewQuestionItem {
  question: string;
  type: interviewType;
  keywordList: IAnalyzeResKeyword[];
}

// 실전 면접 키워드
export interface IAnalyzeResKeyword {
  keyword: string;
}
