import kakao from '@/assets/images/kakao.png';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../@common/Button/Button';
import Input from '../@common/Input/Input';

interface signupInfo {
  value: string;
  subText: string;
  status: 'success' | 'info' | 'error';
}

interface ISignupInfo {
  name: signupInfo;
  email: signupInfo;
  certifNum: signupInfo;
  password: signupInfo;
  passwordCheck: signupInfo;
}

const SignupForm = () => {
  const [signupInfo, setSignupInfo] = useState<ISignupInfo>({
    name: {
      value: '',
      subText: '',
      status: 'info',
    },
    email: {
      value: '',
      subText: '',
      status: 'info',
    },
    certifNum: {
      value: '',
      subText: '',
      status: 'info',
    },
    password: {
      value: '',
      subText: '',
      status: 'info',
    },
    passwordCheck: {
      value: '',
      subText: '',
      status: 'info',
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: keyof ISignupInfo) => {
    setSignupInfo(prev => {
      return {
        ...prev,
        [field]: {
          value: e.target.value,
          subText: prev[field].subText,
          status: prev[field].status,
        },
      };
    });
  };

  const setSubTextAndStatus = (type: keyof ISignupInfo, subText: string, status: 'success' | 'error' | 'info') => {
    setSignupInfo(prev => {
      return {
        ...prev,
        [type]: {
          value: prev[type].value,
          subText: subText,
          status: status,
        },
      };
    });
  };

  const checkValidation = (type: keyof ISignupInfo) => {
    const nameRegex = /[^a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣 ]/; // 대소문자 문자만 있어야 함
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/; // 이메일 정규식
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,15}$/; // 비밀번호 정규식

    switch (type) {
      case 'name': {
        const name = signupInfo.name.value;

        if (!name.trim().length) {
          setSubTextAndStatus(type, '이름을 입력하지 않았습니다.', 'error');
          return;
        }

        if (name.length < 2 || name.length > 4 || nameRegex.test(name)) {
          setSubTextAndStatus(type, '입력 형식이 틀립니다. 다시 입력해주세요.', 'error');
          return;
        }

        setSubTextAndStatus(type, '사용 가능한 이름입니다.', 'success');
        break;
      }
      case 'email': {
        const email = signupInfo.email.value;

        if (!email.trim().length) {
          setSubTextAndStatus(type, '이메일을 입력하지 않았습니다.', 'error');
          return;
        }

        if (!emailRegex.test(email)) {
          setSubTextAndStatus(type, '입력 형식이 틀립니다. 다시 입력해주세요.', 'error');
          return;
        }

        setSubTextAndStatus(type, '사용 가능한 이메일입니다.', 'success');
        break;
      }
      case 'certifNum': {
        const certifNum = signupInfo.certifNum.value;

        if (!certifNum.trim().length) {
          setSubTextAndStatus(type, '인증번호를 입력하지 않았습니다.', 'error');
          return;
        }

        if (certifNum.length !== 6) {
          setSubTextAndStatus(type, '6자리로 입력해주세요.', 'error');
          return;
        }

        // @TODO: 인증 전/후로 나누기
        setSubTextAndStatus(type, '사용 가능한 인증번호입니다.', 'success');
        break;
      }

      case 'password': {
        const password = signupInfo.password.value;

        if (!password.trim().length) {
          setSubTextAndStatus(type, '비밀번호를 입력하지 않았습니다.', 'error');
          return;
        }

        if (!passwordRegex.test(password)) {
          setSubTextAndStatus(type, '입력 형식이 틀립니다. 다시 입력해주세요.', 'error');
          return;
        }

        // @TODO: 인증 전/후로 나누기
        setSubTextAndStatus(type, '사용 가능한 비밀번호입니다.', 'success');
        break;
      }

      case 'passwordCheck': {
        const passwordCheck = signupInfo.passwordCheck.value;

        if (!passwordCheck.trim().length) {
          setSubTextAndStatus(type, '비밀번호를 입력하지 않았습니다.', 'error');
          return;
        }

        if (signupInfo.password.value !== passwordCheck) {
          setSubTextAndStatus(type, '비밀번호가 일치하지 않습니다.', 'error');
          return;
        }

        // @TODO: 인증 전/후로 나누기
        setSubTextAndStatus(type, '비밀번호가 일치합니다.', 'success');
        break;
      }
      default: {
        break;
      }
    }
  };

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
      <Input
        label="이름"
        placeholder="2~4자리/특수문자,숫자 제외"
        type="text"
        onChange={e => handleChange(e, 'name')}
        onBlur={() => checkValidation('name')}
        subText={{
          text: signupInfo.name.subText,
          type: signupInfo.name.status,
        }}
      />
      <div className="relative">
        <div className="grid w-[80%]">
          <Input
            label="이메일"
            placeholder="ex) email@preview.com"
            type="email"
            onChange={e => handleChange(e, 'email')}
            onBlur={() => checkValidation('email')}
            subText={{
              text: signupInfo.email.subText,
              type: signupInfo.email.status,
            }}
          />
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
          <Input
            label="인증번호"
            placeholder="6자리/숫자"
            type="number"
            onChange={e => handleChange(e, 'certifNum')}
            onBlur={() => checkValidation('certifNum')}
            subText={{
              text: signupInfo.certifNum.subText,
              type: signupInfo.certifNum.status,
            }}
          />
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
      <Input
        label="비밀번호"
        placeholder="6~15자리/영문,숫자,특수문자 조합"
        type="password"
        onChange={e => handleChange(e, 'password')}
        onBlur={() => checkValidation('password')}
        subText={{
          text: signupInfo.password.subText,
          type: signupInfo.password.status,
        }}
      />
      <Input
        label="비밀번호 확인"
        placeholder="비밀번호 재입력"
        type="password"
        onChange={e => handleChange(e, 'passwordCheck')}
        onBlur={() => checkValidation('passwordCheck')}
        subText={{
          text: signupInfo.passwordCheck.subText,
          type: signupInfo.passwordCheck.status,
        }}
      />
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
