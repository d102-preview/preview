import profileImage from '@/assets/images/profile.png';
import Button from '@/components/@common/Button/Button';
import Input from '@/components/@common/Input/Input';
import { ChangeEvent, useState } from 'react';
import { PiNotePencil } from 'react-icons/pi';
import ModifyPasswordModal from '../Modal/ModifyPasswordModal/ModifyPasswordModal';
import ProfileModifyModal from '../Modal/ProfileModifyModal/ProfileModifyModal';

interface IMyInfo {
  email: string;
  name: string;
  profileUrl: string;
  password: string;
}

interface IModalType {
  profile: boolean;
  password: boolean;
}

const MyInfo = () => {
  const [isModifyName, setIsModifyName] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<IModalType>({
    profile: false,
    password: false,
  });

  const myInfo: IMyInfo = {
    email: 'tnghk9611@naver.com',
    name: '이수화',
    profileUrl:
      'https://i.namu.wiki/i/kwzpyLbWWq104Sny-FNaj0cGadskPMEf6KHqrSD1YQ_IHDjjC61DgFftSytELDwSwtuUgQG3e0Feb4F01ZrnZHYFyt2VkesGyU207md8_nfGVAbYoZ8h1eEt-AF0NlO3PwahAYB3oanCtu_Q8tJBBw.webp',
    password: 'sdf3234@#',
  };

  const [modifyInfo, setModifyInfo] = useState<IMyInfo>({
    email: myInfo.email,
    name: myInfo.name,
    profileUrl: myInfo.password,
    password: myInfo.password,
  });

  const handleModifyInfo = (e: ChangeEvent<HTMLInputElement>, key: keyof IMyInfo) => {
    setModifyInfo(prev => {
      return {
        ...prev,
        [key]: e.target.value,
      };
    });
  };

  const setShow = (key: keyof IModalType, flag: boolean) => {
    setIsShowModal(prev => {
      return {
        ...prev,
        [key]: flag,
      };
    });
  };

  return (
    <div className="flex pb-4">
      <div className="w-[70%]">
        <span>이메일</span>
        <div className="pt-2 pb-6 text-gray-500">{myInfo.email}</div>
        <div className="flex w-[90%]">
          <span>이름</span>
          <div className="flex-1 text-right text-gray-500 text-sm">
            {isModifyName ? (
              <div>
                <span className="cursor-pointer pr-3" onClick={() => setIsModifyName(false)}>
                  취소
                </span>
                <span className="cursor-pointer" onClick={() => setIsModifyName(false)}>
                  저장
                </span>
              </div>
            ) : (
              <span className="cursor-pointer" onClick={() => setIsModifyName(prev => !prev)}>
                수정
              </span>
            )}
          </div>
        </div>
        <Input
          placeholder={myInfo.name}
          width={'w-[90%]'}
          value={modifyInfo.name}
          subText={{ text: '', type: 'info' }}
          onChange={e => handleModifyInfo(e, 'name')}
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
      <div className="w-[30%]">
        <div className="relative">
          <img className="w-full mb-4 rounded-full border" src={myInfo.profileUrl || profileImage} alt="프로필" />
          <button
            onClick={() => setShow('profile', true)}
            className="w-8 h-8 absolute bottom-1 right-1 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer"
          >
            <PiNotePencil color="white" size={20} />
          </button>
        </div>
      </div>
      {isShowModal.profile && (
        <ProfileModifyModal profileUrl={myInfo.profileUrl} onClose={() => setShow('profile', false)} />
      )}
      {isShowModal.password && <ModifyPasswordModal onClose={() => setShow('password', false)} />}
    </div>
  );
};

export default MyInfo;
