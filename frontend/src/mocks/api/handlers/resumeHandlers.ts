import { HttpResponse, http } from 'msw';
import { postResumeRes } from '../data/resume';

export const resumeHandlers = [
  http.post('/file/upload/resume', () => {
    const success = HttpResponse.json(postResumeRes, { status: 200 });
    return success;
  }),
  http.get('/file/download/resume', ({ request }) => {
    const url = new URL(request.url);
    const resumeId = url.searchParams.get('resumeId');

    if (!resumeId) {
      return HttpResponse.json(null, { status: 404 });
    }

    const success = HttpResponse.json(null, { status: 200 });
    return success;
  }),
  http.delete('/file/manage/resume', ({ request }) => {
    const url = new URL(request.url);
    const resumeId = url.searchParams.get('resumeId');

    if (!resumeId) {
      return HttpResponse.json(null, { status: 404 });
    }

    const success = HttpResponse.json(null, { status: 200 });
    return success;
  }),
];
