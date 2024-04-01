import { HttpResponse, delay, http } from 'msw';
import { interviewAnalyzeRes, interviewFollowupRes, interviewQuestionRes, interviewSetRes } from '../data/interview';

export const interviewHandlers = [
  http.get(`/api/interview/0`, () => {
    return HttpResponse.json(interviewQuestionRes, { status: 201 });
  }),

  http.post('file/upload/video', () => {
    return HttpResponse.json(interviewAnalyzeRes, { status: 201 });
  }),

  http.post('api/followup/question', async ({ request }) => {
    console.log('꼬리질문 생성 request : ' + request);

    await delay(4000);

    return HttpResponse.json(interviewFollowupRes, { status: 201 });
  }),

  http.post('api/interview', () => {
    return HttpResponse.json(interviewSetRes, { status: 201 });
  }),
];
