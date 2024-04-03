import { IQuestionListItem, questionType } from '@/types/model';
import QuestionItem from './QuestionItem';
import questionStore from '@/stores/questionStore';

interface QuestionsListProps {
  questions: IQuestionListItem[];
  type: questionType;
}

const QuestionsList = ({ questions, type }: QuestionsListProps) => {
  const { selectedQuestions, addQuestion, removeQuestion } = questionStore();

  return (
    <div className="pr-7">
      {questions.map(question => (
        <QuestionItem
          key={question.id}
          question={question.question}
          id={question.id}
          isSelected={selectedQuestions.some(q => q.id === question.id)}
          onAdd={addQuestion}
          onRemove={removeQuestion}
          type={type}
        />
      ))}
    </div>
  );
};

export default QuestionsList;
