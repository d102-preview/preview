import { IPageable, ISort } from './question';

export type analysisType = 'emotion' | 'intent' | 'keyword';

export interface IResultListRes {
  interviewList: IResultList;
}

export interface IResultList {
  content: IResultListItem[];
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

export interface IResultListItem {
  id: number;
  startTime: string;
  analysisList: analysisListItem[];
}

export interface analysisListItem {
  id: number;
  question: string;
  thumbnailPath: string;
  videoLength: number;
  complete: boolean;
}

// 무한스크롤
export interface IDealsResultListInfiniteReq {
  type: 'mock' | 'main';
  page: number;
  size: number;
  sort?: ISort;
}
