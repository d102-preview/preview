import { motion } from 'framer-motion';

const FourthSection = () => {
  const firstTextVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 2, delay: 0.3 } },
  };

  return (
    <div>
      <div className="h-[400px]"></div>
      <motion.div variants={firstTextVariants} initial="hidden" whileInView="visible">
        <div className="w-full h-[200px] text-center font-extrabold text-[25px]">프리뷰만의 서비스</div>
      </motion.div>
      <div className="h-[200px]"></div>
      {/* @TODO: 서비스 기능 넣기 */}
    </div>
  );
};

export default FourthSection;
