import computer from '@/assets/images/computer.png';
import logoWhite from '@/assets/images/logo_white.png';
import LoginForm from '@/components/login/LoginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex overflow-y-hidden">
      <div className="w-[55%] min-w-[600px] relative animate-showLeft">
        <img src={computer} alt="computer" className="w-full h-full object-cover rounded-r-3xl absolute" />
        <div className="w-full h-full absolute p-[50px]">
          <img src={logoWhite} alt="white logo" className="w-[200px] cursor-pointer" onClick={() => navigate('/')} />
          <div className="text-[100%] font-semibold text-[#DADADA] pt-2 cursor-pointer">
            당신만의 질문을 생성하고 <br />
            피드백까지 받아보세요
          </div>
        </div>
      </div>
      <div className="w-[45%] min-w-[600px]">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
