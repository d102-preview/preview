import profileImage from '@/assets/images/profile.png';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderLink from '../HeaderLink/HeaderLink';

const Header = () => {
  // @TODO: 추후 로그인 상태인지 store에서 받아오기
  const isLogin = false;

  const navigate = useNavigate();
  const location = useLocation();

  const isCurrentPage = (location: string, target: string) => {
    if (location.includes(target)) {
      return true;
    }
    return false;
  };

  return (
    <div className="w-full h-14 p-6 flex items-center justify-between">
      <div>로고</div>
      <div className="flex">
        <HeaderLink label="모의면접" link="/interview" isClicked={isCurrentPage(location.pathname, 'interview')} />
        <HeaderLink label="분석결과" link="/result" isClicked={isCurrentPage(location.pathname, 'result')} />
        {!isLogin ? (
          <HeaderLink label="로그인" link="/login" isClicked={false} />
        ) : (
          //   내 이름
          <div className="p-1" onClick={() => navigate('/my')}>
            <img src={profileImage} alt="default profile" className="w-7 rounded-full cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
