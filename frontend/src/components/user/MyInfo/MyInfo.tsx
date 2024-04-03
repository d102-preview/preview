import profileImage from '@/assets/images/profile.png';
import Button from '@/components/@common/Button/Button';
import Input from '@/components/@common/Input/Input';
import Toast from '@/components/@common/Toast/Toast';
import { useUser } from '@/hooks/user/useUser';
import userStore from '@/stores/userStore';
import { IUserInfo } from '@/types/model';
import { ChangeEvent, useState } from 'react';
import { PiNotePencil } from 'react-icons/pi';
import ModifyPasswordModal from '../Modal/ModifyPasswordModal/ModifyPasswordModal';
import ProfileModifyModal from '../Modal/ProfileModifyModal/ProfileModifyModal';

interface IModalType {
  profile: boolean;
  password: boolean;
}

const MyInfo = ({ user }: { user: IUserInfo }) => {
  const { usePatchUser } = useUser();
  const { mutate: patchUser } = usePatchUser();
  const { name } = userStore();

  const [isShowModal, setIsShowModal] = useState<IModalType>({
    profile: false,
    password: false,
  });

  const [isModifyName, setIsModifyName] = useState<boolean>(false);
  const [modifyName, setModifyName] = useState<string>(name);
  const [prevName, setPrevName] = useState<string>('');

  const handleModifyName = (e: ChangeEvent<HTMLInputElement>) => {
    setModifyName(e.target.value);
  };

  const setShow = (key: keyof IModalType, flag: boolean) => {
    setIsShowModal(prev => {
      return {
        ...prev,
        [key]: flag,
      };
    });
  };

  const handleCancelName = () => {
    setModifyName(prevName);
    setIsModifyName(false);
  };

  const handleSaveName = () => {
    if (modifyName.length < 2 || modifyName.length > 4) {
      Toast.error('이름은 2~4글자 사이여야 합니다.');
      return;
    }

    patchUser(
      { key: 'name', value: modifyName },
      {
        onSuccess: () => {
          setIsModifyName(false);
        },
      },
    );
  };

  const handleChangeName = () => {
    setIsModifyName(true);
    setPrevName(modifyName);
  };

  return (
    <div className="flex pb-4">
      <div className="w-[70%] mr-[10px]">
        <span>이메일</span>
        <div className="pt-2 pb-6 text-gray-500">{user.email}</div>
        <div className="flex w-full">
          <span>이름</span>
          <div className="flex-1 text-right text-gray-500 text-sm">
            {isModifyName ? (
              <div>
                <span className="cursor-pointer pr-3" onClick={handleCancelName}>
                  취소
                </span>
                <span className="cursor-pointer" onClick={handleSaveName}>
                  저장
                </span>
              </div>
            ) : (
              <span className="cursor-pointer" onClick={handleChangeName}>
                수정
              </span>
            )}
          </div>
        </div>
        <Input
          placeholder={user.name}
          width={'w-full'}
          value={modifyName}
          subText={{ text: '', type: 'info' }}
          onChange={handleModifyName}
          disabled={!isModifyName}
        />
        <span>비밀번호</span>
        <div className="py-2">
          <Button
            text="비밀번호 변경"
            width="w-32"
            height="h-10"
            backgroundColor="bg-[#F8FAFF]"
            textColor="text-[#5A8AF2]"
            hoverBackgroundColor="hover:bg-[#5A8AF2]"
            hoverTextColor="hover:text-white"
            onClick={() => setShow('password', true)}
          />
        </div>
      </div>
      <div className="w-[30%] flex justify-center">
        <div className="w-[130px] h-[130px] relative flex justify-center items-center">
          <div className="w-full h-full">
            <img
              className="w-full h-full mb-4 rounded-full border object-cover"
              src={user.profileImageUrl || profileImage}
              alt="프로필"
            />
          </div>
          <button
            onClick={() => setShow('profile', true)}
            className="w-8 h-8 absolute bottom-0 right-0 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer"
          >
            <PiNotePencil color="white" size={20} />
          </button>
        </div>
      </div>
      {isShowModal.profile && (
        <ProfileModifyModal profileUrl={user.profileImageUrl} onClose={() => setShow('profile', false)} />
      )}
      {isShowModal.password && <ModifyPasswordModal onClose={() => setShow('password', false)} />}
    </div>
  );
};

export default MyInfo;
