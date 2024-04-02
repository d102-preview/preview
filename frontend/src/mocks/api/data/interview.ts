import { IInterviewFollowupRes, IInterviewQuestionRes, IInterviewSetRes } from '@/types/interview';
import { APIResponse, APISimpleResponse } from '@/types/model';

export const interviewQuestionRes: APIResponse<IInterviewQuestionRes> = {
  result: 'ok',
  data: {
    questionList: [
      {
        question: '1분 자기소개 부탁드립니다.',
        type: 'common',
        keywordList: [
          {
            keyword: '전공',
          },
        ],
      },
      {
        question: '교내 해커톤 대회에서 수상을 하셨다고 했는데, 진행 중 가장 어려웠던 점이 무엇인가요?',
        type: 'resume',
        keywordList: [
          {
            keyword: '빅데이터',
          },
          {
            keyword: '데이터 수집',
          },
          {
            keyword: '설문조사',
          },
        ],
      },
      {
        question: '협업 중 어려움을 겪었던 경험에 대해 말씀해주세요.',
        type: 'resume',
        keywordList: [
          {
            keyword: '의견 충돌',
          },
          {
            keyword: '설득',
          },
        ],
      },
      {
        question: '평소 스트레스 관리를 어떻게 하는지 말씀해주세요.',
        type: 'resume',
        keywordList: [],
      },
      {
        question:
          '그동안 진행한 프로젝트들을 보면 MyBatis와 JPA를 모두 사용해보신 것 같은데, 사용하면서 느낀 둘의 장단점을 설명해주세요.',
        type: 'resume',
        keywordList: [],
      },
    ],
  },
};

export const interviewAnalyzeRes: APISimpleResponse = {
  result: 'ok',
};

export const interviewFollowupRes: APIResponse<IInterviewFollowupRes> = {
  result: 'ok',
  data: {
    followUpQuestion: {
      question:
        '이승현님께서는 사용자 중심의 솔루션을 개발하고, 그것이 현실 세계에 긍정적인 영향을 미칠 수 있다고 말씀하셨군요. 그렇다면 기억에 남는 프로젝트 중 하나를 들어주시고, 그 프로젝트에서 개발한 솔루션이 현실 세계에 어떠한 긍정적인 영향을 미쳤는지 구체적으로 설명해주실 수 있나요?',
    },
  },
};

export const interviewSetRes: APIResponse<IInterviewSetRes> = {
  result: 'ok',
  data: {
    interview: {
      id: 5,
    },
  },
};
