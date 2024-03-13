// import Header from '@/components/@common/Header/Header';
// const QuestionPage = () => {
//   return (
//     <>
//       <Header />
//       <div>질문 페이지 입니다</div>
//     </>
//   );
// };

// export default QuestionPage;
import Header from '@/components/@common/Header/Header';
import { useState } from 'react';
import Accordian from '@/components/@common/Accordian/Accordian';
import Textarea from '@/components/@common/Textarea/Textarea';
import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md';

const QuestionPage = () => {
  // 각 아코디언의 열림 상태를 관리하기 위한 상태 변수
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [isOpenThird, setIsOpenThird] = useState(false);

  // 토글 함수
  const toggleFirst = () => setIsOpenFirst(!isOpenFirst);
  const toggleSecond = () => setIsOpenSecond(!isOpenSecond);
  const toggleThird = () => setIsOpenThird(!isOpenThird);

  return (
    <>
      <Header />
      <div>질문 페이지 입니다</div>

      {/* 첫 번째 아코디언 */}
      <Accordian titleContent="첫 번째 아코디언" children={<Textarea />} isOpen={isOpenFirst} onToggle={toggleFirst} />
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
        isOpen={isOpenSecond}
        onToggle={toggleSecond}
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
        isOpen={isOpenThird}
        onToggle={toggleThird}
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
