import { IQuestionDetail, IQuestionListItem, PaginationResponse, APIResponse } from './model';

export interface IQuestionListPaginationResponse extends PaginationResponse {
  content: IQuestionListItem[];
}

export interface IQuestionListRes {
  questionList: IQuestionListPaginationResponse;
}

export interface IQuestionRes {
  questionDetail: IQuestionDetail;
}

export interface IQuestionsDetailsRes {
  [key: string]: APIResponse<IQuestionRes>;
}

export type questionType = 'common' | 'resume'