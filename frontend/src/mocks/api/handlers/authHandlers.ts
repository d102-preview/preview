import { getIsEmailDuplicateRes } from '@/mocks/api/data/auth';
import { HttpResponse, http } from 'msw';

export const authHandlers = [
  http.get('/api/auth/email', ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    if (!email) {
      return new HttpResponse(null, { status: 404 });
    }

    const success = HttpResponse.json(getIsEmailDuplicateRes, { status: 200 });
    const error = HttpResponse.json(null, { status: 409 });

    return error;
  }),
];
