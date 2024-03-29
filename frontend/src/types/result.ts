export type analysisType =  'emotion' | 'intent' | 'keyword';

export interface IResult {
  emotion: {
    ratio: {
      positive: number;
      neutral: number;
      negative: number;
    };
    list: number[]; // 각 프레임별 감정 분류 배열의 타입을 가정합니다.
  };
  intent: {
    // intent 관련 타입 정의 필요
  };
}
