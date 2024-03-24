import { HttpResponse, http } from 'msw';
import { commonQuestionRes } from '../data/commonQuestion';

export const commonQuestionHandlers = [
  http.get('/api/common/question/list', () => {
    return HttpResponse.json(commonQuestionRes, { status: 201 });
  }),
];
