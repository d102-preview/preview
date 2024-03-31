import { motion } from 'framer-motion';

const ThirdSection = () => {
  const firstTextVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 2, delay: 0.3 } },
  };

  return (
    <motion.div>
      <div className="h-[400px]"></div>
      <motion.div variants={firstTextVariants} initial="hidden" whileInView="visible">
        <div className="w-full h-[200px] text-center font-extrabold text-[25px]">
          프리뷰는 당신의 답변을 심층 분석하여
          <br />
          실질적이고 실행 가능한 피드백을 제공함으로써
          <br />그 공백을 채워드립니다.
        </div>
      </motion.div>
      <div className="h-[200px]"></div>
      <motion.div variants={firstTextVariants} initial="hidden" whileInView="visible">
        <div className="w-full h-[200px] text-center font-extrabold text-[35px]">
          당신의 AI 면접 파트너
          <br />
          <span className="text-MAIN1">Preview</span>와 함께 면접을 대비하세요.
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ThirdSection;
