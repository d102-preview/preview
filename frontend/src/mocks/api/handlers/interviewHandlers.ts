import { HttpResponse, http } from 'msw';
import { interviewAnalyzeRes, interviewQuestionRes } from '../data/interview';

export const interviewHandlers = [
  http.get(`/api/interview`, () => {
    return HttpResponse.json(interviewQuestionRes, { status: 201 });
  }),

  http.post('file/upload/video', () => {
    return HttpResponse.json(interviewAnalyzeRes, { status: 201 });
  }),
];
