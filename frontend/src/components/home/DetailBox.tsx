import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../@common/Button/Button';

interface IDetailBox {
  type: 'left' | 'right';
  subTitle?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  buttonText: string;
  navigateUrl: string;
  video: any;
}

const DetailBox = ({ info }: { info: IDetailBox }) => {
  const navigate = useNavigate();

  const serviceFuncVarients = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const videoVarients = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const titleVarient = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3 } },
  };

  const descVarient = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
  };

  const buttonVarient = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.7 } },
  };

  return (
    <div className="w-[70%] h-[500px] mx-auto grid grid-cols-5 mb-40">
      {info.type === 'left' ? (
        <>
          <motion.div
            variants={serviceFuncVarients}
            initial="hidden"
            whileInView="visible"
            className="col-span-2 flex flex-col justify-center px-10"
          >
            <motion.div variants={titleVarient} initial="hidden" whileInView="visible">
              <div className="text-MAIN1 pb-2">{info.subTitle}</div>
              <div className="text-[25px] font-bold">{info.title}</div>
            </motion.div>
            <motion.div variants={descVarient} initial="hidden" whileInView="visible" className="text-gray-700 py-8">
              {info.description}
            </motion.div>
            <motion.div variants={buttonVarient} initial="hidden" whileInView="visible">
              {info.buttonText && info.navigateUrl && (
                <Button
                  text={info.buttonText}
                  width="w-full"
                  height="h-[45px]"
                  textColor="text-white"
                  backgroundColor="bg-gradient-to-r from-MAIN1 to-MAIN2"
                  style={{ fontWeight: '300', overflow: 'hidden', whiteSpace: 'nowrap', padding: '10px' }}
                  onClick={() => navigate(info.navigateUrl)}
                />
              )}
            </motion.div>
          </motion.div>
          <motion.div variants={videoVarients} initial="hidden" whileInView="visible" className="col-span-3">
            {info.video}
          </motion.div>
        </>
      ) : (
        <>
          <motion.div variants={videoVarients} initial="hidden" whileInView="visible" className="col-span-3">
            {info.video}
          </motion.div>
          <motion.div
            variants={serviceFuncVarients}
            initial="hidden"
            whileInView="visible"
            className="col-span-2 flex flex-col justify-center px-10"
          >
            <motion.div variants={titleVarient} initial="hidden" whileInView="visible">
              <div className="text-MAIN1 pb-2">{info.subTitle}</div>
              <div className="text-[25px] font-bold">{info.title}</div>
            </motion.div>
            <motion.div
              variants={descVarient}
              initial="hidden"
              whileInView="visible"
              className="text-gray-700 py-8"
              style={{ wordBreak: 'keep-all' }}
            >
              {info.description}
            </motion.div>
            <motion.div variants={buttonVarient} initial="hidden" whileInView="visible">
              {info.buttonText && info.navigateUrl && (
                <Button
                  text={info.buttonText}
                  width="w-full"
                  height="h-[45px]"
                  textColor="text-white"
                  backgroundColor="bg-gradient-to-r from-MAIN1 to-MAIN2"
                  style={{ fontWeight: '300', overflow: 'hidden', whiteSpace: 'nowrap', padding: '10px' }}
                  onClick={() => navigate(info.navigateUrl)}
                />
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default DetailBox;
