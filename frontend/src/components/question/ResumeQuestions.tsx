import QuestionsList from './QuestionsList';
import { IQuestionList } from '@/pages/question/QuestionPage';

interface QuestionsProps {
  questions: IQuestionList[];
  type: 'common' | 'resume';
}
const ResumeQuestions = ({ questions, type }: QuestionsProps) => {
  return (
    <div>
      <h3 className="text-lg">이력서 기반 질문</h3>
      <p className="text-UNIMPORTANT_TEXT">총 {questions.length}개의 질문이 있습니다.</p>
      <QuestionsList questions={questions} type={type} />
    </div>
  );
};
export default ResumeQuestions;
