import computer from '@/assets/images/computer.png';
import logoWhite from '@/assets/images/logo_white.png';
import Toast from '@/components/@common/Toast/Toast';
import SignupForm from '@/components/signup/SignupForm';
// import userStore from '@/stores/userStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  // const { isLogin } = userStore();

  useEffect(() => {
    // if (isLogin) {
    //   navigate('/');
    // }

    Toast.error('점검중입니다. 테스트 계정을 이용해주세요.');
    navigate(-1);
  }, []);

  return (
    <div className="w-screen h-screen flex overflow-y-hidden">
      <div className="w-[55%] min-w-[600px] relative animate-showLeft">
        <img src={computer} alt="computer" className="w-full h-screen object-cover rounded-r-3xl absolute" />
        <div className="w-full h-full absolute p-[50px]">
          <img src={logoWhite} alt="white logo" className="w-[200px] cursor-pointer" onClick={() => navigate('/')} />
          <div className="text-[100%] font-semibold text-[#DADADA] pt-2 cursor-pointer">
            당신만의 질문을 생성하고 <br />
            피드백까지 받아보세요
          </div>
        </div>
      </div>
      <div className="w-[45%] min-w-[600px]">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignUpPage;
