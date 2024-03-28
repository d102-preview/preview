import { authHandlers } from './api/handlers/authHandlers';
import { interviewHandlers } from './api/handlers/interviewHandlers';
import {
  commonQuestionDetailHandlers,
  commonQuestionsHandlers,
  resumeQuestionDetailHandlers,
  resumeQuestionsHandlers,
} from './api/handlers/questionHandlers';
import { userHandlers } from './api/handlers/userHandlers';

export const handlers = [
  ...interviewHandlers,
  ...authHandlers,
  ...commonQuestionsHandlers,
  ...resumeQuestionsHandlers,
  ...commonQuestionDetailHandlers,
  ...resumeQuestionDetailHandlers,
  ...userHandlers,
];
