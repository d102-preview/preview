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
  analysisList: IAnalysisListItem[];
}

export interface IAnalysisListItem {
  id: number;
  question: string;
  thumbnailPath: string;
  videoLength: number;
  videoSize: number;
  status: 'success' | 'process' | 'fail';
  startTime: string;
}

// 무한스크롤
export interface IDealsResultListInfiniteReq {
  type: 'mock' | 'main';
  page: number;
  size: number;
  sort?: ISort;
}

// 분석 결과 상세 조회
export interface IAnalysisDetailRes {
  analysisDetail: IAnalysisDetail;
}

export interface IIntent {
  category: string;
  expression: string;
  ratio: number;
}

export interface IEmotionMap {
  ratio: {
    positive: number | null;
    negative: number | null;
    neutral: number | null;
  };
  list: Record<string, number>;
}

export interface IAnalysisDetail {
  id: number;
  questionType: string;
  question: string;
  answer: string;
  videoPath: string;
  thumbnailPath: string;
  keywordList: string[];
  videoLength: number;
  videoSize: number;
  emotionMap: IEmotionMap;
  intentList: IIntent[];
  startTime: string;
}
