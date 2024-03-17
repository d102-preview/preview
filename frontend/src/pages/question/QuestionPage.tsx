import Header from '@/components/@common/Header/Header';
import Accordian from '@/components/@common/Accordian/Accordian';
import Textarea from '@/components/@common/Textarea/Textarea';
import Keywords from '@/components/question/Keywords';
import Script from '@/components/question/Script';
import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md';

const QuestionPage = () => {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto">
        <div>
          <h3 className="text-2xl font-semibold mb-2">면접 질문 리스트</h3>
          <p className="text-sm text-[#B0B0B0]">면접 연습을 진행할 리스트를 생성해주세요</p>
        </div>

        {/* 첫 번째 아코디언 */}
        <Accordian
          titleContent="첫 번째 아코디언"
          children={
            <>
              <Script initialScript="단점이 없는 게 장점입니다." maxLength={20} />
              <Keywords />
            </>
          }
          defaultOpen={true}
        />
        {/* 두 번째 아코디언 */}
        <Accordian
          titleContent="두 번째 아코디언"
          children={
            <>
              <Textarea
                value="하이이"
                placeholder="해당 질문에 대한 스크립트를 미리 작성해보세요!"
                maxLength={10}
                subText={{ text: '최대 10자까지 입력 가능합니다.', type: 'info' }}
              />
              <Keywords />
            </>
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
          children={<Textarea value="" maxLength={30} label="스크립트" />}
          defaultOpen={true}
          iconOpen={MdOutlineExpandLess}
          iconClose={MdOutlineExpandMore}
          iconOpenColor="#5A8AF2"
          iconCloseColor="#5A8AF2"
          backgroundColor="bg-[#F1F5FF]"
          textColor="text-[#5A8AF2]"
          textWeight="font-bold"
        />
      </main>
    </>
  );
};

export default QuestionPage;
