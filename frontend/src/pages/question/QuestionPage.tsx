import Header from '@/components/@common/Header/Header';
import QuestionItem from '@/components/question/QuestionItem';
import QuestionTab from '@/components/question/QuestionTab';
import SelectedQuestions from '@/components/question/SelectedQuestions';
import { useEffect, useState } from 'react';

interface IQuestionObj {
  question: string;
  id: number;
}

const QuestionPage = () => {
  const [selected, setSelected] = useState<IQuestionObj[]>([]);

  const addQuestion = (questionObj: IQuestionObj) => {
    setSelected(prev => [...prev, questionObj]);
  };

  const removeQuestion = (id: number) => {
    setSelected(prev => prev.filter(questionObj => questionObj.id !== id));
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <>
      <Header />
      <main className="w-10/12 mx-auto h-[calc(100vh-3.5rem)]">
        <div>
          <h3 className="text-xl font-semibold mb-1">면접 질문 리스트</h3>
          <p className="text-sm text-[#B0B0B0]">면접 연습을 진행할 리스트를 생성해주세요</p>
        </div>
        <div className="mt-3 flex h-5/6">
          <div className="flex rounded-2xl shadow-lg bg-GRAY w-10/12">
            <QuestionTab />
            <div className="p-7 w-11/12">
              <h3 className="text-lg">공통 면접 질문</h3>
              <p className="text-UNIMPORTANT_TEXT">총 0개의 질문이 있습니다.</p>
              <div className="pr-7">
                <QuestionItem
                  question="본인의 장점이 무엇인가요?"
                  id={1}
                  onAdd={() => addQuestion({ id: 1, question: '1분 자기소개 해주세요' })}
                  onRemove={() => removeQuestion(1)}
                />
                <QuestionItem
                  question="자바스크립트 ES6+의 새로운 기능들을 사용한 구체적인 예를 들어주세요."
                  id={2}
                  onAdd={() =>
                    addQuestion({
                      id: 2,
                      question: '자바스크립트 ES6+의 새로운 기능들을 사용한 구체적인 예를 들어주세요.',
                    })
                  }
                  onRemove={() => removeQuestion(2)}
                />
                <QuestionItem
                  question="인생에서 가장 중요한 것은 무엇인가요?"
                  id={3}
                  onAdd={() => addQuestion({ id: 3, question: '인생에서 가장 중요한 것은 무엇인가요?' })}
                  onRemove={() => removeQuestion(3)}
                />
              </div>
            </div>
          </div>
          <SelectedQuestions selectedQuestion={selected} onRemove={removeQuestion} />
        </div>
      </main>
    </>
  );
};

export default QuestionPage;
