import { IKeywordItem, IQuestionItem, interviewType } from './model';

export interface IInterviewQuestionRes {
  questionList: IQuestionItem[];
}

export interface IInterviewAnalyzeRes {
  type: interviewType;
  question: string;
  answer: string;
  skip: boolean;
  setStartTime: string;
  keywordList: IKeywordItem[];
}
