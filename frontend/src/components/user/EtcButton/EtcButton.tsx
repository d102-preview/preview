import Button from '@/components/@common/Button/Button';
import Toast from '@/components/@common/Toast/Toast';
import { useUser } from '@/hooks/user/useUser';
import userStore from '@/stores/userStore';
import { useNavigate } from 'react-router-dom';

const EtcButton = () => {
  const navigate = useNavigate();
  const { logout } = userStore();

  const { useDeleteUser } = useUser();
  const { mutate } = useDeleteUser();

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout();
      navigate('/');
      Toast.success('로그아웃되었습니다.');
    }
  };

  const handleSignout = () => {
    if (window.confirm('회원탈퇴를 진행하시겠습니까?')) {
      mutate(undefined, {
        onSuccess: () => {
          logout();
          navigate('/signup');
          Toast.success('회원탈퇴 되었습니다.');

          setTimeout(() => {
            logout();
          }, 1000);
        },
        onError: () => {
          Toast.error('회원탈퇴에 실패했습니다.');
        },
      });
    }
  };

  return (
    <div className="py-8 flex justify-end">
      <Button
        text="로그아웃"
        width="w-20"
        height="h-10"
        backgroundColor="bg-gray-200"
        hoverBackgroundColor="hover:bg-gray-300"
        textColor="text-gray-500"
        style={{ marginRight: '10px' }}
        onClick={handleLogout}
      />
      <Button
        text="회원탈퇴"
        width="w-20"
        height="h-10"
        backgroundColor="bg-red-500"
        hoverBackgroundColor="hover:bg-red-600"
        textColor="text-white"
        onClick={handleSignout}
      />
    </div>
  );
};

export default EtcButton;
