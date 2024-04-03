import Accordian from '@/components/@common/Accordian/Accordian';
import Toast from '@/components/@common/Toast/Toast';
import Keywords from '@/components/question/Keywords';
import Script from '@/components/question/Script';
import { questionType } from '@/types/model';
import { useQuestion } from '@/hooks/question/useQuestion';
import userStore from '@/stores/userStore';
import { IInterviewQuestionItem } from '@/types/interview';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface IQuestionItemProps {
  question: string;
  id: number;
  isSelected: boolean;
  onAdd: (questionObj: IInterviewQuestionItem) => void;
  onRemove: (id: number) => void;
  type: questionType;
}

const QuestionItem = ({ question, id, isSelected, onAdd, onRemove, type }: IQuestionItemProps) => {
  const location = useLocation();
  const isQuestionPage = location.pathname === '/question';

  const [isOpen, setIsOpen] = useState(false);
  const [plusClick, setPlusClick] = useState<boolean>(false);
  const { useGetQuestion } = useQuestion();
  const { data, refetch } = useGetQuestion({ type, questionId: id, isEnabled: plusClick });

  const { isLogin } = userStore();

  const handleClick = () => {
    if (!isLogin) {
      Toast.info('스크립트 및 키워드 작성 기능을 이용하려면 로그인이 필요합니다.');
      return;
    }
  };

  const script = data?.data?.questionDetail?.script?.script || '';
  const keywords = data?.data?.questionDetail.keywordList || [];

  const handlePlusClick = () => {
    setPlusClick(true);
  };

  // 아코디언 토글 핸들러
  const handleAccordionToggle = () => {
    if (!isOpen) {
      refetch(); // 아코디언이 닫혀있는 경우만 refetch 호출
    }
    setIsOpen(!isOpen); // 이후 상태를 반전
  };

  useEffect(() => {
    if (plusClick && data) {
      onAdd({ id, question, type, keywordList: keywords, script });
      setPlusClick(false);
    }
  }, [plusClick, data]);

  return (
    <div className="my-4" onClick={handleClick}>
      <Accordian
        titleContent={question}
        defaultOpen={false}
        disabled={!isLogin}
        isSelected={isSelected}
        onPlusClick={handlePlusClick} // '+' 아이콘 클릭 시 호출될 함수
        onMinusClick={() => onRemove(id)} // '-' 아이콘 클릭 시 호출될 함수
        hasIcons={isQuestionPage}
        textSize="text-base"
        textWeight="font-medium"
        onToggle={handleAccordionToggle}
      >
        <Script initialScript={script} id={id} type={type} />
        <Keywords initialKeywords={keywords} id={id} type={type} />
      </Accordian>
    </div>
  );
};
export default QuestionItem;
