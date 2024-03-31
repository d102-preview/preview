import { HttpResponse, http } from 'msw';
import { interviewAnalyzeRes, interviewFollowupRes, interviewQuestionRes } from '../data/interview';

export const interviewHandlers = [
  http.get(`/api/interview/3`, () => {
    return HttpResponse.json(interviewQuestionRes, { status: 201 });
  }),

  http.post('file/upload/video', () => {
    return HttpResponse.json(interviewAnalyzeRes, { status: 201 });
  }),

  http.post('api/followup/question', ({ request }) => {
    console.log('꼬리질문 생성 request : ' + request);
    return HttpResponse.json(interviewFollowupRes, { status: 201 });
  }),
];
