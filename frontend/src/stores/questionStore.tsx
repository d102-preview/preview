import { create } from 'zustand';

interface IQuestionObj {
  question: string;
  id: number;
}

interface QuestionState {
  selectedQuestions: IQuestionObj[];
  addQuestion: (questionObj: IQuestionObj) => void;
  removeQuestion: (id: number) => void;
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
}));

export default questionStore;
