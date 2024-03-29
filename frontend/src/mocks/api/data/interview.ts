import { IInterviewQuestionRes } from '@/types/interview';
import { APIResponse, APISimpleResponse } from '@/types/model';

export const interviewQuestionRes: APIResponse<IInterviewQuestionRes> = {
  result: 'ok',
  data: {
    questionList: [
      {
        id: 1,
        question: '1분 자기소개 부탁드립니다.',
        type: 'common',
        keywordList: [
          {
            id: 2,
            keyword: '전공',
          },
        ],
      },
      {
        id: 5,
        question: '교내 해커톤 대회에서 수상을 하셨다고 했는데, 진행 중 가장 어려웠던 점이 무엇인가요?',
        type: 'resume',
        keywordList: [
          {
            id: 5,
            keyword: '빅데이터',
          },
          {
            id: 6,
            keyword: '데이터 수집',
          },
          {
            id: 8,
            keyword: '설문조사',
          },
        ],
      },
      {
        id: 7,
        question: '협업 중 어려움을 겪었던 경험에 대해 말씀해주세요.',
        type: 'common',
        keywordList: [
          {
            id: 1,
            keyword: '의견 충돌',
          },
          {
            id: 1,
            keyword: '설득',
          },
        ],
      },
      {
        id: 2,
        question: '평소 스트레스 관리를 어떻게 하는지 말씀해주세요.',
        type: 'common',
        keywordList: null,
      },
      {
        id: 0,
        question:
          '그동안 진행한 프로젝트들을 보면 MyBatis와 JPA를 모두 사용해보신 것 같은데, 사용하면서 느낀 둘의 장단점을 설명해주세요.',
        type: 'resume',
        keywordList: null,
      },
    ],
  },
};

export const interviewAnalyzeRes: APISimpleResponse = {
  result: 'ok',
};
