import interview from '@/assets/lotties/interview.json';
import question from '@/assets/lotties/question.json';
import reoport from '@/assets/lotties/result.json';
import resume from '@/assets/lotties/resume.json';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';

const ServiceFunc = () => {
  const serviceTextVarients = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const serviceFuncVarients = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
  };

  const funcInfo: [string, any][] = [
    ['이력서 기반 질문 생성', resume],
    ['면접 연습 녹화', interview],
    ['무작위 꼬리 질문', question],
    ['분석 보고서', reoport],
  ];

  return (
    <section className="flex flex-col items-center">
      <div className="h-[100px]"></div>
      <motion.div
        variants={serviceTextVarients}
        initial="hidden"
        whileInView="visible"
        className="text-[40px] text-center"
      >
        <div className="font-bold">
          <span className="text-MAIN1">preview</span>만의 서비스
        </div>
        <div className="text-[20px]">preview의 주요 기능을 소개해드릴게요</div>
      </motion.div>

      <div className="grid grid-cols-4 gap-4 w-[70%] min-w-[600px] pt-16 pb-32 ">
        {funcInfo.map(([text, lottie], idx) => {
          return (
            <motion.div
              key={idx}
              variants={serviceFuncVarients}
              initial="hidden"
              whileInView="visible"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg shadow-lg flex flex-col justify-center items-center py-10"
            >
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: lottie,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice',
                  },
                }}
                width={180}
                height={150}
              />
              <div className="pt-6 text-xl">{text}</div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ServiceFunc;
