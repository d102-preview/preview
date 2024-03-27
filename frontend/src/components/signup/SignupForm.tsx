import kakao from '@/assets/images/kakao.png';
import Button from '@/components/@common/Button/Button';
import Input from '@/components/@common/Input/Input';
import Toast from '@/components/@common/Toast/Toast';
import Timer from '@/components/signup/Timer/Timer';
import { useSignup } from '@/hooks/auth/useSignup';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { useGetIsDuplicateEmail, usePostEmailCertification, usePostEmailVerify, usePostSignup } = useSignup();
  const { mutate: checkDuplicateEmail } = useGetIsDuplicateEmail();
  const { mutate: postEmailCertification } = usePostEmailCertification();
  const { mutate: postEmailVerify } = usePostEmailVerify();
  const { mutate: postSignup } = usePostSignup();

  const [isShowTimer, setIsShowTimer] = useState<boolean>(false);
  const [isVerify, setIsVerify] = useState<boolean>(false);
  const [isPossibleSignup, setIsPossibleSignup] = useState<boolean>(false);

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
    // if (isVerify) {
    //   if (field === 'email' || field === 'certifNum') {
    //     return;
    //   }
    // }

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
    const nameRegex = /[a-zA-Z가-힣]/;
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,15}$/g;

    switch (type) {
      case 'name': {
        const name = signupInfo.name.value;

        if (!name.trim().length) {
          setSubTextAndStatus(type, '이름을 입력하지 않았습니다.', 'error');
          return;
        }

        if (name.length < 2 || name.length > 4 || !nameRegex.test(name)) {
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

        setSubTextAndStatus(type, '비밀번호가 일치합니다.', 'success');
        break;
      }
      default: {
        break;
      }
    }
  };

  // 인증번호 발송 버튼 클릭 이벤트
  const handleSendCertifNum = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (signupInfo.email.status !== 'success') {
      Toast.error('올바른 이메일을 입력해주세요.');
      return;
    }

    if (isVerify) {
      Toast.error('이미 인증된 이메일입니다.');
      return;
    }

    checkDuplicateEmail(signupInfo.email.value, {
      onSuccess: () => {
        postEmailCertification(signupInfo.email.value, {
          onSuccess: () => {
            Toast.success('인증번호를 전송했습니다. 입력한 이메일을 확인해보세요.');
            setIsShowTimer(true);
          },
          onError: error => {
            if (axios.isAxiosError(error)) {
              console.log('에러 객체', error.response);
              Toast.error('인증번호를 전송하지 못했습니다. 다시 시도해주세요.');
            }
          },
        });
      },
      onError: (error, variables) => {
        console.log('실패', error, variables);

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 409) {
            setSubTextAndStatus('email', '중복된 이메일입니다.', 'error');
          }
        }
      },
    });
  };

  // 인증번호 확인 클릭 이벤트
  const handleCheckCertifNum = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (signupInfo.certifNum.status !== 'success') {
      Toast.error('올바른 인증번호를 입력해주세요.');
      return;
    }

    postEmailVerify(
      {
        email: signupInfo.email.value,
        authorizationCode: Number(signupInfo.certifNum.value),
      },
      {
        onSuccess: res => {
          console.log('인증번호 확인 성공', res);
          if (res.data.verify) {
            Toast.success('인증되었습니다.');
            setIsVerify(true);
          } else {
          }
        },
        onError: err => {
          console.log('인증번호 확인 실패', err);
        },
      },
    );
  };

  const isExistImpossibleValue = () => {
    const values = Object.values(signupInfo);

    for (let val of values) {
      if (val.value.length === 0 || val.status === 'error') {
        return true;
      }
    }

    return false;
  };

  const handleSignup = () => {
    if (!isVerify) {
      Toast.error('인증이 완료되지 않았습니다. 인증 후 회원가입을 진행해주세요.');
      return;
    }

    if (isExistImpossibleValue()) {
      Toast.error('입력 형식에 맞지 않은 값이 있습니다.');
      return;
    }

    postSignup(
      {
        email: signupInfo.email.value,
        password: signupInfo.password.value,
        name: signupInfo.name.value,
      },
      {
        onSuccess: () => {
          Toast.success('회원가입에 성공했습니다.');
          navigate('/login');
        },
        onError: () => {
          Toast.error('회원가입에 실패했습니다.');
        },
      },
    );
  };

  useEffect(() => {
    const values = Object.values(signupInfo);

    for (let val of values) {
      if (val.status !== 'success') {
        setIsPossibleSignup(false);
        return;
      }
    }

    if (!isVerify) {
      setIsPossibleSignup(false);
      return;
    }

    setIsPossibleSignup(true);
  }, [signupInfo, isVerify]);

  console.log(isPossibleSignup);

  return (
    <div className="w-[60%] h-full mx-auto flex justify-center flex-col animate-showUp">
      {/* 상단 텍스트 */}
      <div>
        <div className="text-xl font-semibold pb-2">
          가입 후<br />
          <span className="text-MAIN1">프리뷰</span>를 마음껏 사용하세요
        </div>
      </div>
      {/* 폼 */}
      <form>
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
              disabled={isVerify}
            />
          </div>
          <div className="absolute right-0 bottom-0 top-0 flex justify-center items-center">
            {!isVerify && isShowTimer ? (
              <Timer
                minute={3}
                timeoutFunc={() => {
                  setIsShowTimer(false);
                  Toast.error('인증 시간이 만료되었습니다. 다시 시도해주세요.');
                }}
              />
            ) : (
              <Button
                text="발송하기"
                width="w-[72px]"
                height="h-9"
                backgroundColor={isVerify ? 'bg-gray-200' : 'bg-[#EEF3FF]'}
                textColor={isVerify ? 'text-gray-400' : 'text-MAIN1'}
                hoverBackgroundColor={isVerify ? 'bg-gray-200' : 'hover:bg-[#D8E2FC]'}
                hoverTextColor={isVerify ? 'text-gray-400' : 'hover:text-[#3273FF]'}
                onClick={handleSendCertifNum}
                disabled={isVerify ? true : false}
              />
            )}
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
              disabled={isVerify}
            />
          </div>
          <div className="absolute right-0 bottom-0 top-0 flex justify-center items-center">
            <Button
              text="인증하기"
              width="w-[72px]"
              height="h-9"
              backgroundColor={isVerify ? 'bg-gray-200' : 'bg-[#EEF3FF]'}
              textColor={isVerify ? 'text-gray-400' : 'text-MAIN1'}
              hoverBackgroundColor={isVerify ? 'bg-gray-200' : 'hover:bg-[#D8E2FC]'}
              hoverTextColor={isVerify ? 'text-gray-400' : 'hover:text-[#3273FF]'}
              onClick={handleCheckCertifNum}
              disabled={isVerify ? true : false}
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
      </form>
      <Button
        text="회원가입"
        width="w-full"
        height="h-11"
        backgroundColor={isPossibleSignup ? 'bg-MAIN1' : 'bg-gray-200'}
        textColor={isPossibleSignup ? 'text-[#EEF3FF]' : 'text-gray-400'}
        hoverBackgroundColor={isPossibleSignup ? 'hover:bg-[#3273FF]' : 'bg-gray-200'}
        onClick={handleSignup}
        disabled={!isPossibleSignup}
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
