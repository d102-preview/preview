import Lottie from 'react-lottie';
import { negativeOptions, neutralOptions, positiveOptions2 } from '@/assets/lotties/lottieOptions';

interface IEmotion {
  ratio: {
    positive: number | null;
    negative: number | null;
    neutral: number | null;
  };
}

const Emotion = ({ ratio }: IEmotion) => {
  return (
    <div className="p-5">
      <h4 className="text-2xl text-[#696969] font-bold pb-0">감정 통계</h4>
      <div className="flex justify-evenly p-3 gap-5">
        <div>
          <Lottie options={positiveOptions2} height={120} width={120} />
          <p className="font-bold text-2xl text-center text-BLACK">긍정</p>
          <p className="font-bold text-3xl text-center text-MAIN1">{ratio.positive}%</p>
        </div>
        <div>
          <Lottie options={neutralOptions} height={120} width={120} />
          <p className="font-bold text-2xl text-center text-BLACK">중립</p>
          <p className="font-bold text-3xl text-center text-yellow-500">{ratio.neutral}%</p>
        </div>
        <div>
          <Lottie options={negativeOptions} height={120} width={120} />
          <p className="font-bold text-2xl text-center text-BLACK">부정</p>
          <p className="font-bold text-3xl text-center text-red-400">{ratio.negative}%</p>
        </div>
      </div>
    </div>
  );
};

export default Emotion;
