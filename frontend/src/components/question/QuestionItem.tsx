import Accordian from '@/components/@common/Accordian/Accordian';
import Toast from '@/components/@common/Toast/Toast';
import Keywords from '@/components/question/Keywords';
import Script from '@/components/question/Script';
import { useQuestion } from '@/hooks/question/useQuestion';
import userStore from '@/stores/userStore';
import { IInterviewQuestionItem } from '@/types/interview';
import { interviewType } from '@/types/model';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface IQuestionItemProps {
  question: string;
  id: number;
  isSelected: boolean;
  onAdd: (questionObj: IInterviewQuestionItem) => void;
  onRemove: (id: number) => void;
  type: interviewType;
}

const QuestionItem = ({ question, id, isSelected, onAdd, onRemove, type }: IQuestionItemProps) => {
  const location = useLocation();
  const isQuestionPage = location.pathname === '/question';

  const { useGetQuestion } = useQuestion();
  const { mutate: getQuestion, data } = useGetQuestion({ type, questionId: id });

  const { isLogin } = userStore();

  const handleClick = () => {
    if (!isLogin) {
      Toast.info('스크립트 및 키워드 작성 기능을 이용하려면 로그인이 필요합니다.');
      return;
    }
    getQuestion();
  };

  const script = data?.data?.questionDetail?.script?.script || '';
  const keywords = data?.data?.questionDetail.keywordList || [];

  const [plusClick, setPlusClick] = useState<boolean>(false);
  const handlePlusClick = () => {
    getQuestion();
    setPlusClick(true);
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
      >
        <Script initialScript={script} id={id} type={type} />
        <Keywords initialKeywords={keywords} id={id} type={type} />
      </Accordian>
    </div>
  );
};
export default QuestionItem;
