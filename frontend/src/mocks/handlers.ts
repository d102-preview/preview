import { authHandlers } from './api/handlers/authHandlers';
import { interviewHandlers } from './api/handlers/interviewHandlers';

export const handlers = [...interviewHandlers, ...authHandlers];
