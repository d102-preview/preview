import { IInterviewQuestionItem } from '@/types/interview';
import { create } from 'zustand';

interface QuestionState {
  selectedQuestions: IInterviewQuestionItem[];
  addQuestion: (questionObj: IInterviewQuestionItem) => void;
  removeQuestion: (id: number) => void;
  resetQuestion: () => void;
  message: string;
}

const questionStore = create<QuestionState>(set => ({
  selectedQuestions: [],
  message: '',
  addQuestion: questionObj =>
    set(state => {
      if (state.selectedQuestions.length < 3) {
        return {
          selectedQuestions: [...state.selectedQuestions, questionObj],
          message: '',
        };
      } else {
        return {
          ...state,
          message: '면접 질문은 최대 3개 선택 가능합니다.',
        };
      }
    }),
  removeQuestion: id =>
    set(state => ({
      selectedQuestions: state.selectedQuestions.filter(q => q.id !== id),
      message: '',
    })),
  resetQuestion: () => {
    set({ selectedQuestions: [] });
  },
}));

export default questionStore;
