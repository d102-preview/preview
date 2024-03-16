import Header from '@/components/@common/Header/Header';
import Accordian from '@/components/@common/Accordian/Accordian';
import Textarea from '@/components/@common/Textarea/Textarea';
import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md';

const QuestionPage = () => {
  return (
    <>
      <Header />
      <div>질문 페이지 입니다</div>

      {/* 첫 번째 아코디언 */}
      <Accordian titleContent="첫 번째 아코디언" children={<Textarea />} defaultOpen={true} />
      {/* 두 번째 아코디언 */}
      <Accordian
        titleContent="두 번째 아코디언"
        children={
          <Textarea
            placeholder="해당 질문에 대한 스크립트를 미리 작성해보세요!"
            maxLength={10}
            subText={{ text: '최대 10자까지 입력 가능합니다.', type: 'info' }}
          />
        }
        defaultOpen={false}
        iconOpen={MdOutlineExpandLess}
        iconClose={MdOutlineExpandMore}
        iconOpenColor="#5A8AF2"
        iconCloseColor="#5A8AF2"
        backgroundColor="bg-[#F1F5FF]"
        textColor="text-[#5A8AF2]"
        textWeight="font-bold"
      />
      {/* 세 번째 아코디언 */}
      <Accordian
        titleContent="세 번째 아코디언"
        children={<Textarea maxLength={30} label="스크립트" />}
        defaultOpen={true}
        iconOpen={MdOutlineExpandLess}
        iconClose={MdOutlineExpandMore}
        iconOpenColor="#5A8AF2"
        iconCloseColor="#5A8AF2"
        backgroundColor="bg-[#F1F5FF]"
        textColor="text-[#5A8AF2]"
        textWeight="font-bold"
      />
    </>
  );
};

export default QuestionPage;
