import logo from '@/assets/images/logo.png';
import profileImage from '@/assets/images/profile.png';
import userStore from '@/stores/userStore';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderLink from '../HeaderLink/HeaderLink';

const Header = ({ page }: { page?: string }) => {
  const { isLogin, name, profileUrl } = userStore();

  const navigate = useNavigate();
  const location = useLocation();

  const isCurrentPage = (location: string, target: string) => {
    if (location.includes(target)) {
      return true;
    }
    return false;
  };

  return (
    <div
      className={`flex justify-between items-center w-full h-14 p-5 px-10 ${page === 'main' ? ' bg-white/80 fixed top-0 left-0 z-10' : ''}`}
    >
      <img className="w-24 cursor-pointer" src={logo} alt="logo" onClick={() => navigate('/')} />
      <div className="flex">
        <HeaderLink
          label="질문 리스트"
          link="/question-list"
          isClicked={isCurrentPage(location.pathname, 'question-list')}
        />
        <HeaderLink label="모의면접" link="/interview" isClicked={isCurrentPage(location.pathname, 'interview')} />
        <HeaderLink label="분석결과" link="/result" isClicked={isCurrentPage(location.pathname, 'result')} />
        {!isLogin ? (
          <HeaderLink label="로그인" link="/login" isClicked={false} />
        ) : (
          <div className="p-1 pl-2 flex items-center cursor-pointer" onClick={() => navigate('/my')}>
            <img
              src={profileUrl || profileImage}
              alt="default profile"
              className="w-7 h-7 rounded-full cursor-pointer"
            />
            <span className="text-sm pl-2">{name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
