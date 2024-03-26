import { HttpResponse, http } from 'msw';
import {
  commonQuestionListRes,
  resumeQuestionListRes,
  commonQuestionsDetailsRes,
  resumeQuestionsDetailsRes,
} from '../data/question';

export const commonQuestionsHandlers = [
  http.get('/api/common/question/list', () => {
    return HttpResponse.json(commonQuestionListRes, { status: 201 });
  }),
];

export const resumeQuestionsHandlers = [
  http.get('/api/resume/question/list', () => {
    return HttpResponse.json(resumeQuestionListRes, { status: 201 });
  }),
];

export const commonQuestionDetailHandlers = [
  http.get('/api/common/question', ({ request }) => {
    const url = new URL(request.url);
    const questionId = url.searchParams.get('commonQuestionId');

    if (!questionId || !commonQuestionsDetailsRes[questionId]) {
      return HttpResponse.json(null, { status: 400 });
    }
    return HttpResponse.json(commonQuestionsDetailsRes[questionId], { status: 200 });
  }),
];


export const resumeQuestionDetailHandlers = [
  http.get('/api/resume/question', ({ request }) => {
    const url = new URL(request.url);
    const questionId = url.searchParams.get('resumeQuestionId');

    if (!questionId || !commonQuestionsDetailsRes[questionId]) {
      return HttpResponse.json(null, { status: 400 });
    }
    return HttpResponse.json(resumeQuestionsDetailsRes[questionId], { status: 200 });
  }),
];