import { errorOptions } from '@/assets/lotties/lottieOptions';
import Button from '@/components/@common/Button/Button';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">페이지를 찾을 수 없어요</h1>
      <p className="pt-3 pb-5">페이지를 새로고침하거나 메인페이지로 이동해보세요</p>
      <Button
        text="메인 페이지 이동"
        width="w-32"
        height="h-8"
        borderColor="border"
        hoverBackgroundColor="hover:bg-BLACK"
        hoverTextColor="hover:text-white"
        borderRadius="rounded-lg"
        onClick={() => navigate('/')}
      />

      <Lottie options={errorOptions} width={460} height={400} />
    </div>
  );
};

export default ErrorPage;
