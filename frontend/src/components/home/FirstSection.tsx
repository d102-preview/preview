import main from '@/assets/images/main.png';
import scroll from '@/assets/lotties/scroll.json';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import Button from '../@common/Button/Button';

const FirstSection = () => {
  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: scroll,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      <img src={main} alt="main" className="w-screen h-screen absolute left-0 top-0 z-[-1] object-cover" />
      <div className="w-screen h-screen absolute left-0 top-0 bottom-0 z-[-1] bg-white/10">
        <div className="text-white text-center absolute left-0 right-0 bottom-8">
          <Lottie options={defaultOptions} width={100} height={100} />
          <div className="text-lg">스크롤해서 프리뷰 알아보기</div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      >
        <div className="w-screen h-screen absolute left-0 top-0 bottom-0 z-[-1] bg-gradient-to-r from-white/70 to-white/20"></div>
        <div className="w-screen h-screen text-[40px] leading-14 font-extrabold text-BLACK pl-40 flex flex-col justify-center z-10">
          <div className="font-black">
            당신의 <br /> AI 면접 파트너
          </div>
          <div className="font-[yg-jalnan] text-[55px] text-black">preview</div>
          <div className="text-[20px] pb-4">
            AI 영상 분석을 통해 자세, 억양을 분석하고
            <br /> 피드백까지 한눈에 ! <br />
            당신만의 질문을 생성하고 피드백까지 받아보세요
          </div>
          <Button
            text="지금 바로 시작하기"
            width="w-[180px]"
            height="h-[50px]"
            backgroundColor="bg-MAIN1"
            hoverBackgroundColor="hover:bg-[#3273FF]"
            textColor="text-white"
            textSize="text-[18px]"
            onClick={() => navigate('/interview')}
          />
        </div>
      </motion.div>
    </>
  );
};

export default FirstSection;
