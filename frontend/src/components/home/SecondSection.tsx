import { motion, useScroll, useTransform } from 'framer-motion';

const SecondSection = () => {
  // variants 객체 정의
  const firstTextVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 2, delay: 0.3 } },
  };

  const secondTextVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 2, delay: 0.6 } },
  };

  const chatBoxVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 2, delay: 1.0 } },
  };

  const firstChatBoxText: string[] = [
    '자세나 몸짓이 너무 긴장되어 보이진 않았을까?',
    '말을 너무 빨리 하거나, 너무 많이 말하지 않았나 ..',
    '과연 내 경험들을 충분히 잘 전달했는지 모르겠어요.',
  ];

  const secondChatBoxText: string[] = [
    '면접관 앞에서의 그 긴장감을 어떻게 연습해야 할지 모르겠네요.',
    '질문에 대한 답변은 외웠지만, 눈맞춤이나 몸짓 같은 비언어적인 요소를 피드백 받을 기회가 없었어요.',
    '실제 면접 환경에서 연습하고 피드백까지 받는 서비스는 없을까요?',
  ];

  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(scrollYProgress, [0, 0.6, 0.9, 1], ['#ffffff', '#DDE7FF', '#DDE7FF', '#ffffff']);

  return (
    <motion.div className="w-full h-auto px-40" style={{ background: backgroundColor }} viewport={{ once: true }}>
      <div className="h-[300px]"></div>

      <motion.div variants={secondTextVariants} initial="hidden" whileInView="visible">
        <div className="h-[200px] text-left font-extrabold text-[30px] pl-20">
          면접 준비에 <span className="text-MAIN1">정확한 피드백</span>을 받고 싶었지만
          <br /> 구체적인 조언을 얻기 어려웠던 적이 없으신가요?
        </div>
      </motion.div>

      <motion.div
        variants={chatBoxVariants}
        initial="hidden"
        whileInView="visible"
        className="flex flex-col items-end pb-[100px]"
      >
        {firstChatBoxText.map(ele => {
          return (
            <div className="flex justify-center items-center font-bold text-[22px] px-10 py-6 mb-6 mr-20 shadow-md rounded-xl bg-white/80">
              {ele}
            </div>
          );
        })}
      </motion.div>

      <div className="h-[300px]"></div>

      <motion.div variants={secondTextVariants} initial="hidden" whileInView="visible">
        <div className="h-[200px] text-right font-extrabold text-[30px] pr-20">
          질문에 대한 답변은 준비했지만 <br />
          <span className="text-MAIN1">실제 면접 상황에서의 압박감을 연습</span>할 방법이 <br />
          없지는 않았나요?
        </div>
      </motion.div>

      <motion.div
        variants={chatBoxVariants}
        initial="hidden"
        whileInView="visible"
        className="flex flex-col items-start pb-[100px]"
      >
        {secondChatBoxText.map(ele => {
          return (
            <div className="flex justify-center items-center font-bold text-[22px] px-10 py-6 mb-6 ml-20 shadow-md rounded-xl bg-white/80">
              {ele}
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default SecondSection;
