import { HttpResponse, http } from 'msw';
import { deleteUserRes, getUserRes, patchPasswordRes, patchUserRes } from '../data/user';

export const userHandlers = [
  http.get('/api/user', () => {
    const success = HttpResponse.json(getUserRes, { status: 200 });
    return success;
  }),
  http.delete('/api/user', () => {
    const success = HttpResponse.json(deleteUserRes, { status: 200 });
    return success;
  }),
  http.patch('/api/user', () => {
    const success = HttpResponse.json(patchUserRes, { status: 200 });
    return success;
  }),
  http.post('/api/user/password', () => {
    const success = HttpResponse.json(patchPasswordRes, { status: 200 });
    return success;
  }),
];
