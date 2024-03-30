import Lottie from 'react-lottie';
import { negativeOptions, neutralOptions, positiveOptions } from '@/assets/lotties/lottieOptions';

const Emotion = () => {
  return (
    <div className="p-5">
      <h4 className="text-2xl text-[#696969] font-bold pb-0">감정 통계</h4>
      <div className="flex justify-evenly p-3">
        <div>
          <Lottie options={positiveOptions} height={150} width={150} />
          <p className="font-bold text-2xl text-center text-BLACK">긍정</p>
          <p className="font-bold text-3xl text-center text-MAIN1">50%</p>
        </div>
        <div>
          <Lottie options={neutralOptions} height={150} width={150} />
          <p className="font-bold text-2xl text-center text-BLACK">중립</p>
          <p className="font-bold text-3xl text-center text-yellow-500">20%</p>
        </div>
        <div>
          <Lottie options={negativeOptions} height={150} width={150} />
          <p className="font-bold text-2xl text-center text-BLACK">부정</p>
          <p className="font-bold text-3xl text-center text-red-400">30%</p>
        </div>
      </div>
    </div>
  );
};

export default Emotion;
