import Header from '@/components/@common/Header/Header';
import QuestionItem from '@/components/question/QuestionItem';

const QuestionPage = () => {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto">
        <div>
          <h3 className="text-2xl font-semibold mb-2">면접 질문 리스트</h3>
          <p className="text-sm text-[#B0B0B0]">면접 연습을 진행할 리스트를 생성해주세요</p>
        </div>
        <div className="bg-GRAY">
          <QuestionItem question="본인의 장점이 무엇인가요?" id={1} />
          <QuestionItem question="본인의 단점은 무엇인가요?" id={2} />
          <QuestionItem question="본인의 단점은 무엇인가요?" id={2} />
        </div>
      </main>
    </>
  );
};

export default QuestionPage;
