import Lottie from 'react-lottie';
import positive from '@/assets/lotties/positive.json';
import negative from '@/assets/lotties/negative.json';
import neutral from '@/assets/lotties/neutral.json';

const Emotion = () => {
  const negativeOptions = {
    loop: true,
    autoplay: true,
    animationData: negative, // Lottie 애니메이션 데이터
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const neutralOptions = {
    loop: true,
    autoplay: true,
    animationData: neutral, // Lottie 애니메이션 데이터
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const positiveOptions = {
    loop: true,
    autoplay: true,
    animationData: positive, // Lottie 애니메이션 데이터
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="p-5">
      <h4 className="text-2xl text-[#696969] font-bold pb-0">감정 통계</h4>
      <div className="flex justify-evenly p-3">
        <div>
          <Lottie options={positiveOptions} height={150} width={150} />
          <p className="font-bold text-2xl text-center text-BLACK">긍정</p>
          <p className="font-bold text-3xl text-center text-green-600">50%</p>
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
