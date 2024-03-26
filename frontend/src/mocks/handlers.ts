import { authHandlers } from './api/handlers/authHandlers';
import { interviewHandlers } from './api/handlers/interviewHandlers';
import {
  commonQuestionsHandlers,
  resumeQuestionsHandlers,
  commonQuestionDetailHandlers,
  resumeQuestionDetailHandlers,
} from './api/handlers/questionHandlers';

export const handlers = [
  ...interviewHandlers,
  ...authHandlers,
  ...commonQuestionsHandlers,
  ...resumeQuestionsHandlers,
  ...commonQuestionDetailHandlers,
  ...resumeQuestionDetailHandlers,
];
