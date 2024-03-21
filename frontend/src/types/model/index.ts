// 공통 응답 객체 타입
export interface APIResponse<T> {
  result: 'ok' | 'fail';
  data: T;
}

// 면접 질문 리스트 타입
export interface IQuestionItem {
  id: number;
  question: string;
  type: 'common' | 'resume';
  keywordList: IKeywordItem[] | null;
}

// 면접 키워드 리스트 타입
export interface IKeywordItem {
  id: number;
  keyword: string;
}
