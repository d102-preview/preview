import { ICommonQuestionsRes } from '@/types/commonQuestion';
import { APIResponse } from '@/types/model';

export const commonQuestionRes: APIResponse<ICommonQuestionsRes> = {
  result: 'ok',
  data: {
    commonQuestionList: {
      content: [
        { id: 1, question: '1분 자기소개 해주세요.' },
        { id: 2, question: '본인의 장점은 무엇인가요?' },
        { id: 3, question: '본인의 단점은 무엇인가요?' },
        { id: 4, question: '인생에서 가장 중요한 것은 무엇인가요?' },
        { id: 5, question: '리더쉽을 발휘했던 경험에 대해서 말씀해주세요.' },
        { id: 6, question: '동료와 친구들은 본인을 어떻게 생각하나요?' },
        { id: 7, question: '마지막 포부 말씀해주세요.' },
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
