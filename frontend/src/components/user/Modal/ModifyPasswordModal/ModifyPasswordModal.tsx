import Button from '@/components/@common/Button/Button';
import Input from '@/components/@common/Input/Input';
import Modal from '@/components/@common/Modal/Modal';
import Toast from '@/components/@common/Toast/Toast';
import { useUser } from '@/hooks/user/useUser';
import { IPasswordInfo } from '@/types/model';
import { useState } from 'react';

const ModifyPasswordModal = ({ onClose }: { onClose: () => void }) => {
  const { usePatchPassword } = useUser();
  const { mutate: patchPassword } = usePatchPassword();
  const [passwordInfo, setPasswordInfo] = useState<IPasswordInfo>({
    currentPassword: '',
    changedPassword: '',
    checkChangePassword: '',
  });

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>, type: keyof IPasswordInfo) => {
    setPasswordInfo(prev => {
      return {
        ...prev,
        [type]: e.target.value,
      };
    });
  };

  // @TODO: 비밀번호 변경하기
  const handleModify = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,15}$/g;

    if (!passwordInfo.changedPassword.trim().length) {
      Toast.error('비밀번호를 입력하지 않았습니다.');
      return;
    }

    if (!passwordRegex.test(passwordInfo.changedPassword)) {
      Toast.error('비밀번호는 6-15자리이며, 영문, 숫자, 특수문자를 포함해야합니다.');
      return;
    }

    if (passwordInfo.changedPassword !== passwordInfo.checkChangePassword) {
      Toast.error('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    patchPassword(
      {
        currentPassword: passwordInfo.currentPassword,
        changedPassword: passwordInfo.changedPassword,
        checkChangePassword: passwordInfo.checkChangePassword,
      },
      {
        onSuccess: () => {},
        onError: () => {},
      },
    );
  };

  return (
    <Modal width="w-[420px]" onClose={onClose}>
      <form className="p-4">
        <div className="text-xl pb-2">비밀번호 변경</div>
        <div className="text-sm text-gray-700">변경할 비밀번호를 입력하고 [변경하기] 버튼을 눌러주세요</div>
        <br />
        <Input
          label="비밀번호"
          placeholder="현재 비밀번호를 입력해주세요."
          type="password"
          value={passwordInfo.currentPassword}
          onChange={e => handleChangePassword(e, 'currentPassword')}
        />
        <Input
          label="새 비밀번호"
          placeholder="변경할 비밀번호를 입력해주세요."
          type="password"
          value={passwordInfo.changedPassword}
          onChange={e => handleChangePassword(e, 'changedPassword')}
        />
        <Input
          label="새 비밀번호 확인"
          placeholder="변경할 비밀번호를 재입력해주세요."
          type="password"
          value={passwordInfo.checkChangePassword}
          onChange={e => handleChangePassword(e, 'checkChangePassword')}
        />

        <div className="flex gap-2 justify-center text-center pt-2">
          <Button
            text="취소하기"
            width="w-[100px]"
            height="h-[40px]"
            textColor="text-white"
            backgroundColor="bg-gray-200"
            onClick={onClose}
          />
          <Button
            text="변경하기"
            width="w-[100px]"
            height="h-[40px]"
            textColor="text-white"
            backgroundColor="bg-MAIN1"
            hoverBackgroundColor="hover:bg-[#3273FF]"
            onClick={handleModify}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ModifyPasswordModal;
