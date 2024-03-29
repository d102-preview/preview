import { IQuestionListRes, IQuestionsDetailsRes } from '@/types/question';
import { APIResponse } from '@/types/model';

export const commonQuestionListRes: APIResponse<IQuestionListRes> = {
  result: 'ok',
  data: {
    questionList: {
      content: [
        { id: 1, question: '1분 자기소개 해주세요.' },
        { id: 2, question: '본인의 장점은 무엇인가요?' },
        { id: 3, question: '본인의 단점은 무엇인가요?' },
        { id: 4, question: '인생에서 가장 중요한 것은 무엇인가요?' },
        { id: 5, question: '리더쉽을 발휘했던 경험에 대해서 말씀해주세요.' },
        { id: 6, question: '동료와 친구들은 본인을 어떻게 생각하나요?' },
        { id: 7, question: '갈등을 해결해본 경험을 말씀해주세요.' },
        { id: 8, question: '마지막 포부 말씀해주세요.' },
      ],
      pageable: {
        pageNumber: 0,
        pageSize: 3,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      last: false,
      totalElements: 7,
      totalPages: 3,
      size: 3,
      number: 0,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true,
      },
      first: true,
      numberOfElements: 3,
      empty: false,
    },
  },
};

export const resumeQuestionListRes: APIResponse<IQuestionListRes> = {
  result: 'ok',
  data: {
    questionList: {
      content: [
        { id: 1, question: '자바스크립트 ES6+의 새로운 기능들을 사용한 구체적인 예를 들어주세요.' },
        { id: 2, question: 'React, Vue, Angular 중 사용해 본 해당 프레임워크를 선택한 이유는 무엇인가요?' },
        { id: 3, question: '크로스 브라우징 이슈를 해결한 경험이 있나요?' },
        {
          id: 4,
          question:
            '기존의 관행에 얽매이지 않고 새로운 아이디어를 제안하여 문제를 해결했다고 하셨는데, 구체적으로 어떤 아이디어였습니까?',
        },
        { id: 5, question: '리더쉽을 발휘했던 경험에 대해서 말씀해주세요.' },
      ],
      pageable: {
        pageNumber: 0,
        pageSize: 3,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      last: false,
      totalElements: 7,
      totalPages: 3,
      size: 3,
      number: 0,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true,
      },
      first: true,
      numberOfElements: 3,
      empty: false,
    },
  },
};

export const commonQuestionsDetailsRes: IQuestionsDetailsRes = {
  '1': {
    result: 'ok',
    data: {
      questionDetail: {
        script: {
          id: 1,
          script:
            '안녕하세요, 저는 [이름]입니다. [직업/전공]을 전공했으며, [관련 경험 또는 특기]를 가지고 있습니다. [개인적 특징이나 취미]에 관심이 많습니다.',
        },
        keywordList: [
          { id: 1, keyword: '직업/전공' },
          { id: 2, keyword: '관련 경험' },
          { id: 3, keyword: '취미' },
        ],
      },
    },
  },
  '2': {
    result: 'ok',
    data: {
      questionDetail: {
        script: {
          id: 1,
          script: '저의 장점은 단점이 없는 것입니다.',
        },
        keywordList: [
          { id: 1, keyword: '장점' },
          { id: 2, keyword: '단점' },
          { id: 3, keyword: '우하하' },
        ],
      },
    },
  },
  '3': {
    result: 'ok',
    data: {
      questionDetail: {
        script: {
          id: 1,
          script:
            '제 단점은 [단점 1], [단점 2], 그리고 [단점 3]입니다. 하지만 이를 극복하기 위해 [개선 방법]을 끊임없이 모색하고 있습니다.',
        },
        keywordList: [
          { id: 1, keyword: '단점 1' },
          { id: 2, keyword: '단점 2' },
          { id: 3, keyword: '단점 3' },
          { id: 4, keyword: '개선 방법' },
        ],
      },
    },
  },
  '4': {
    result: 'ok',
    data: {
      questionDetail: {
        script: {
          id: 1,
          script:
            '인생에서 가장 중요한 것은 [중요한 가치나 원칙]입니다. 이를 기반으로 [행동이나 선택의 기준]을 세우고 있습니다.',
        },
        keywordList: [
          { id: 1, keyword: '중요한 가치' },
          { id: 2, keyword: '원칙' },
          { id: 3, keyword: '선택의 기준' },
        ],
      },
    },
  },
  '5': {
    result: 'ok',
    data: {
      questionDetail: {
        script: {
          id: 1,
          script:
            '저는 [경험한 리더십 상황]에서 [어떤 역할을 맡았고, 어떤 결과를 이끌어 냈는지]에 대해 설명하고 싶습니다. [주요 행동]은 [행동 1], [행동 2], [행동 3]이었습니다.',
        },
        keywordList: [
          { id: 1, keyword: '리더십' },
          { id: 2, keyword: '역할' },
          { id: 3, keyword: '결과' },
          { id: 4, keyword: '주요 행동' },
        ],
      },
    },
  },
  '6': {
    result: 'ok',
    data: {
      questionDetail: {
        script: {
          id: 1,
          script:
            '동료와 친구들은 저를 [어떻게 인식하고 있는지, 저의 강점과 약점을 어떻게 평가하는지]에 대해 언급해야겠습니다. 일반적으로 저는 [동료/친구들의 인상]을 받았습니다.',
        },
        keywordList: [
          { id: 1, keyword: '강점' },
          { id: 2, keyword: '약점' },
          { id: 3, keyword: '인상' },
        ],
      },
    },
  },
  '7': {
    result: 'ok',
    data: {
      questionDetail: {
        script: {
          id: 1,
          script:
            '제가 해결했던 갈등 상황은 [갈등의 배경과 내용]이었고, 저는 [어떻게 갈등을 해결했는지, 어떤 전략이나 방법을 사용했는지]에 대해 이야기하고자 합니다. 결과적으로 [해결 방법의 효과]를 봤습니다.',
        },
        keywordList: [],
      },
    },
  },
  '8': {
    result: 'ok',
    data: {
      questionDetail: {
        script: {
          id: 1,
          script: null,
        },
        keywordList: [
          { id: 1, keyword: '포부' },
          { id: 2, keyword: '행동 계획' },
          { id: 3, keyword: '노력' },
        ],
      },
    },
  },
};

export const resumeQuestionsDetailsRes: IQuestionsDetailsRes = {
  '1': {
    result: 'ok',
    data: {
      questionDetail: {
        script: {
          id: 1,
          script:
            'ES6+의 새로운 기능 중 하나는 화살표 함수(arrow functions)입니다. 예를 들어, 이전의 함수 선언 방식보다 간결한 문법을 사용하여 함수를 정의할 수 있습니다.',
        },
        keywordList: [
          { id: 1, keyword: 'ES6+' },
          { id: 2, keyword: '화살표 함수' },
          { id: 3, keyword: '간결한 문법' },
        ],
      },
    },
  },
  '2': {
    result: 'ok',
    data: {
      questionDetail: {
        script: {
          id: 1,
          script:
            '저는 React를 선택했습니다. 이유는 React의 가볍고 유연한 컴포넌트 기반 아키텍처와 가상 돔(Virtual DOM)을 통한 성능 향상이 주된 이유입니다. 또한 React의 활발한 커뮤니티와 풍부한 생태계도 선택에 영향을 미쳤습니다.',
        },
        keywordList: [
          { id: 1, keyword: 'React' },
          { id: 2, keyword: '컴포넌트 기반 아키텍처' },
          { id: 3, keyword: '가상 돔' },
          { id: 4, keyword: '성능 향상' },
          { id: 5, keyword: '커뮤니티' },
          { id: 6, keyword: '생태계' },
        ],
      },
    },
  },
  '3': {
    result: 'ok',
    data: {
      questionDetail: {
        script: {
          id: 1,
          script:
            '이전 프로젝트에서 IE 브라우저에서 발생한 CSS 그리드 레이아웃의 호환성 문제를 해결한 적이 있습니다. Flexbox와 Grid를 조합하여 유연한 레이아웃 시스템을 구축하고, IE에서도 동작하도록 폴리필을 적용하여 문제를 해결했습니다.',
        },
        keywordList: [
          { id: 1, keyword: '크로스 브라우징' },
          { id: 2, keyword: '호환성 문제' },
          { id: 3, keyword: 'CSS 그리드' },
          { id: 4, keyword: 'Flexbox' },
          { id: 5, keyword: '폴리필' },
        ],
      },
    },
  },
  '4': {
    result: 'ok',
    data: {
      questionDetail: {
        script: {
          id: 1,
          script:
            '이전 프로젝트에서 기존의 페이지 로딩 방식을 개선하기 위해 SPA(Single Page Application) 아키텍처를 도입하는 것을 제안했습니다. 기존의 멀티페이지 방식에서 클라이언트 측 라우팅을 통해 페이지 간의 전환을 부드럽게 만들고 성능을 향상시킬 수 있었습니다.',
        },
        keywordList: [
          { id: 1, keyword: 'SPA' },
          { id: 2, keyword: 'Single Page Application' },
          { id: 3, keyword: '클라이언트 측 라우팅' },
          { id: 4, keyword: '성능 향상' },
        ],
      },
    },
  },
  '5': {
    result: 'ok',
    data: {
      questionDetail: {
        script: {
          id: 1,
          script:
            '이전 프로젝트에서 저는 팀 내에서 프로젝트 일정을 관리하고 팀원 간의 업무 분배를 조정하는 리더십 역할을 맡았습니다. 주기적인 회의와 업무 상황 파악을 통해 프로젝트의 진행 상황을 효과적으로 관리하여 목표를 달성하는데 기여했습니다.',
        },
        keywordList: [
          { id: 1, keyword: '프로젝트 일정 관리' },
          { id: 2, keyword: '업무 분배' },
          { id: 3, keyword: '회의' },
          { id: 4, keyword: '진행 상황 관리' },
        ],
      },
    },
  },
};
