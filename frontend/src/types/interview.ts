import { IQuestionItem, interviewType } from './model';

export interface IInterviewQuestionRes {
  questionList: IQuestionItem[];
}

export interface IInterviewAnalyzeRes {
  type: interviewType;
  question: string;
  answer: string;
  script: string;
  keyword: string[];
  skip: boolean;
  setStartTime: string;
}
