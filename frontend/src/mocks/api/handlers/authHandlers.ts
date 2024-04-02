import {
  getEmailDuplicateRes,
  postEmailCertificationRes,
  postEmailVerifyRes,
  postJoinRes,
  postLoginRes,
} from '@/mocks/api/data/auth';
import { HttpResponse, http } from 'msw';

export const authHandlers = [
  http.get('/api/email', ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    if (!email) {
      return new HttpResponse(null, { status: 404 });
    }

    const success = HttpResponse.json(getEmailDuplicateRes, { status: 200 });
    return success;
  }),

  http.post('/api/email', ({ request }) => {
    console.log('3) 이메일 인증번호 전송 api 요청값', request);

    const success = HttpResponse.json(postEmailCertificationRes, { status: 200 });
    return success;
  }),

  http.post('/api/email/verify', ({ request }) => {
    console.log('3) 이메일 인증번호 확인 api 요청값', request);

    const success = HttpResponse.json(postEmailVerifyRes, { status: 200 });
    return success;
  }),

  http.post('/api/auth/join', () => {
    const success = HttpResponse.json(postJoinRes, { status: 200 });
    return success;
  }),

  http.post('/api/auth/login', () => {
    const success = HttpResponse.json(postLoginRes, {
      status: 200,
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0bmdoazk2MTFAbmF2ZXIuY29tIiwiaWF0IjoxNzExOTMyNzA2LCJleHAiOjE3MTIwMTkxMDYsImF1dGgiOiJqYXZhLnV0aWwuc3RyZWFtLlJlZmVyZW5jZVBpcGVsaW5lJDNAMThjZmVmZjcifQ.EjNEBOOjYYFM_rGWUrDq7di7dVhHmaCto074s4l2GD8',
      },
    });
    return success;
  }),
];
