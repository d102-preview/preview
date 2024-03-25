import { IQuestionDetail, IQuestionListItem, PaginationResponse } from './model';

export interface IQuestionListPaginationResponse extends PaginationResponse {
  content: IQuestionListItem[];
}

export interface ICommonQuestionsRes {
  commonQuestionList: IQuestionListPaginationResponse;
}

export interface ICommonQuestionRes {
  questionDetail: IQuestionDetail
}  