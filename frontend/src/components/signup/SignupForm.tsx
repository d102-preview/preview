import kakao from '@/assets/images/kakao.png';
import { Link } from 'react-router-dom';
import Button from '../@common/Button/Button';
import Input from '../@common/Input/Input';

const SignupForm = () => {
  return (
    <div className="w-[60%] h-full mx-auto flex justify-center flex-col animate-showUp">
      {/* 상단 텍스트 */}
      <div>
        <div className="text-xl font-semibold">
          가입 후<br />
          <span className="text-MAIN1">프리뷰</span>를 마음껏 사용하세요
        </div>
        <div className="text-md text-[GRAY] pt-1 pb-3">회원가입을 진행해주세요</div>
      </div>
      {/* 폼 */}
      <Input label="이름" placeholder="이름을 입력해주세요" type="text" />
      <div className="relative">
        <div className="grid w-[80%]">
          <Input label="이메일" placeholder="이메일을 입력해주세요" type="email" />
        </div>
        <div className="absolute right-0 bottom-0 top-0 flex justify-center items-center">
          <Button
            text="발송하기"
            width="w-[72px]"
            height="h-9"
            backgroundColor="bg-[#EEF3FF]"
            textColor="text-MAIN1"
            hoverBackgroundColor="hover:bg-[#D8E2FC]"
            hoverTextColor="hover:text-[#3273FF]"
          />
        </div>
      </div>
      <div className="relative">
        <div className="grid w-[80%]">
          <Input label="인증번호" placeholder="인증번호를 입력해주세요" type="number" />
        </div>
        <div className="absolute right-0 bottom-0 top-0 flex justify-center items-center">
          <Button
            text="인증하기"
            width="w-[72px]"
            height="h-9"
            backgroundColor="bg-[#EEF3FF]"
            textColor="text-MAIN1"
            hoverBackgroundColor="hover:bg-[#D8E2FC]"
            hoverTextColor="hover:text-[#3273FF]"
          />
        </div>
      </div>
      <Input label="비밀번호" placeholder="비밀번호를 입력해주세요" type="password" />
      <Input label="비밀번호 확인" placeholder="비밀번호를 재입력해주세요" type="password" />
      <Button
        text="회원가입"
        width="w-full"
        height="h-11"
        backgroundColor="bg-MAIN1"
        textColor="text-[#EEF3FF]"
        hoverBackgroundColor="hover:bg-[#3273FF]"
      />

      <div className="relative">
        <div className="w-full h-8 border-b-[1px] border-[#D4D4D4]"></div>
        <div className="absolute left-0 right-0 text-center top-5">
          <span className="bg-white px-4 text-sm text-gray-500">또는 SNS로 시작하기</span>
        </div>
      </div>
      <br />
      <br />
      <Button
        text=""
        width="w-full"
        height="h-11"
        backgroundColor="bg-[#FFF9DA]"
        textColor="text-[#7E6868]"
        hoverBackgroundColor="hover:bg-[#FFED99]"
      >
        <div className="flex items-center justify-center">
          <img src={kakao} alt="kakao" className="w-7 mr-3" />
          카카오톡으로 회원가입
        </div>
      </Button>

      <div className="text-xs text-center pt-2">
        이미 계정이 있으신가요?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to={'/login'} className="text-[#5A8AF2] font-bold">
          로그인 하러가기
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
