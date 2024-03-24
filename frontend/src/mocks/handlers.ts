import { authHandlers } from './api/handlers/authHandlers';
import { interviewHandlers } from './api/handlers/interviewHandlers';
import { commonQuestionHandlers } from './api/handlers/questionHandlers';

export const handlers = [...interviewHandlers, ...authHandlers, ...commonQuestionHandlers];
