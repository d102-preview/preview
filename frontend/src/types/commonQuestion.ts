import { IQuestionListItem, PaginationResponse } from './model';

export interface IQuestionListPaginationResponse extends PaginationResponse {
  content: IQuestionListItem[];
}

export interface ICommonQuestionsRes {
  commonQuestionList: IQuestionListPaginationResponse;
}
