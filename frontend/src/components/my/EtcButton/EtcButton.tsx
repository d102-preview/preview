import Button from '@/components/@common/Button/Button';
import Toast from '@/components/@common/Toast/Toast';
import userStore from '@/stores/userStore';
import { useNavigate } from 'react-router-dom';

const EtcButton = () => {
  const navigate = useNavigate();
  const { logout } = userStore();

  // @TODO: 로그아웃 로직
  const handleLogout = () => {
    logout();
    Toast.success('로그아웃되었습니다.');

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  // @TODO: 회원탈퇴 로직
  const handleSignout = () => {};

  return (
    <div className="py-8 flex justify-end">
      <Button
        text="로그아웃"
        width="w-20"
        height="h-10"
        backgroundColor="bg-gray-200"
        textColor="text-gray-500"
        style={{ marginRight: '10px' }}
        onClick={handleLogout}
      />
      <Button
        text="회원탈퇴"
        width="w-20"
        height="h-10"
        backgroundColor="bg-red-500"
        textColor="text-white"
        onClick={handleSignout}
      />
    </div>
  );
};

export default EtcButton;
