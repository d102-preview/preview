import { getEmailDuplicateRes, postEmailCertificationRes, postEmailVerifyRes } from '@/mocks/api/data/auth';
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
];
