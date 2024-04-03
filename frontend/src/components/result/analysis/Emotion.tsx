import Lottie from 'react-lottie';
import { negativeOptions, neutralOptions, smileOptions } from '@/assets/lotties/lottieOptions';

interface IEmotion {
  ratio: {
    positive: number | null;
    negative: number | null;
    neutral: number | null;
  };
}

const Emotion = ({ ratio }: IEmotion) => {
  return (
    <div className="p-5 w-full">
      <h4 className="text-lg text-[#696969] font-bold pb-0">감정 통계</h4>
      <div className="flex justify-evenly p-3 gap-5">
        <div>
          <div className="w-full">
            <Lottie options={smileOptions} />
          </div>
          <p className="font-bold text-center text-BLACK">긍정</p>
          <p className="font-bold text-center text-MAIN1">{ratio.positive ? ratio.positive : 0}%</p>
        </div>
        <div>
          <div className="w-full">
            <Lottie options={neutralOptions} />
          </div>
          <p className="font-bold text-center text-BLACK">중립</p>
          <p className="font-bold text-center text-yellow-500">{ratio.neutral ? ratio.neutral : 0}%</p>
        </div>
        <div>
          <div className="w-full">
            <Lottie options={negativeOptions} />
          </div>
          <p className="font-bold text-center text-BLACK">부정</p>
          <p className="font-bold text-center text-red-400">{ratio.negative ? ratio.negative : 0}%</p>
        </div>
      </div>
      <p className="text-sm text-right pr-3 text-UNIMPORTANT_TEXT">
        *{'  '}
        <span className="underline underline-offset-4">
          <a
            href="https://aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&aihubDataSe=data&dataSetSn=82"
            target="_blank"
          >
            한국인 감정인식을 위한 복합 영상
          </a>
        </span>
        의 감정 분석 및 표정 분석
      </p>
    </div>
  );
};

export default Emotion;
