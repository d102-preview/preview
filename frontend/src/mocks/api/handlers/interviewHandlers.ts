import { HttpResponse, http } from 'msw';
import { interviewQuestionRes } from '../data/interview';

export const interviewHandlers = [
  http.get('/api/interview/main', () => {
    return HttpResponse.json(interviewQuestionRes, { status: 201 });
  }),
];
