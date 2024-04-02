import { useQuestion } from '@/hooks/question/useQuestion';
import questionStore from '@/stores/questionStore';
import QuestionItem from './QuestionItem';
import { useIntersectionObserver } from '@/hooks/@common/userIntersectionObserver';

interface QuestionsProps {
  type: 'common';
}

const CommonQuestions = ({ type }: QuestionsProps) => {
  const { useGetListInfinite } = useQuestion();
  const { data, fetchNextPage, hasNextPage } = useGetListInfinite({ page: 0, size: 10 }, type);
  const totalQuestions = data?.pages[0]?.data?.questionList?.totalElements || 0;

  const { selectedQuestions, addQuestion, removeQuestion } = questionStore();
  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return (
    <>
      <h3 className="text-lg font-semibold">공통 면접 질문</h3>
      <p className="text-UNIMPORTANT_TEXT pt-1 mb-1">총 {totalQuestions}개의 질문이 있습니다.</p>
      <div className="h-[calc(100%-3.5rem)] overflow-y-auto px-3">
        {data?.pages?.map(
          (page, i) =>
            page && ( // page가 정의되어 있으면 아래의 컴포넌트 렌더링 실행
              <div key={i}>
                {page.data.questionList.content.map(question => (
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
            ),
        )}
      </div>
      {/* 페이지 최하단에 작은 div요소 만들어 ref에 setTarget적용 */}
      <div ref={setTarget} className="h-[1rem]" />
    </>
  );
};
export default CommonQuestions;
