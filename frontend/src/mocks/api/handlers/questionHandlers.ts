import { HttpResponse, http } from 'msw';
import { commonQuestionsRes, commonQuestionRes } from '../data/question';

export const commonQuestionHandlers = [
  http.get('/api/common/question/list', () => {
    return HttpResponse.json(commonQuestionsRes, { status: 201 });
  }),
];

export const commonQuestionDetailHandlers = [
  http.get('/api/common/question', () => {
    return HttpResponse.json(commonQuestionRes, { status: 201 });
  }),
];
