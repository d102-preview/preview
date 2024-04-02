import kakao from '@/assets/images/kakao.png';
import Button from '@/components/@common/Button/Button';
import Input from '@/components/@common/Input/Input';
import Toast from '@/components/@common/Toast/Toast';
import { useSignup } from '@/hooks/auth/useSignup';
import userStore from '@/stores/userStore';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface ILoginStatus {
  value: string;
  subText: string;
  status: 'success' | 'info' | 'error';
}

interface ILoginInfo {
  email: ILoginStatus;
  password: ILoginStatus;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const { usePostLogin } = useSignup();
  const { mutate: postLogin } = usePostLogin();
  const { login } = userStore();

  const [isPossibleLogin, setIsPossibleLogin] = useState<boolean>(false);

  const [loginInfo, setLoginInfo] = useState<ILoginInfo>({
    email: {
      value: '',
      subText: '',
      status: 'info',
    },
    password: {
      value: '',
      subText: '',
      status: 'info',
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: keyof ILoginInfo) => {
    checkValidation(field, e.target.value);

    setLoginInfo(prev => {
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

  const setSubTextAndStatus = (type: keyof ILoginInfo, subText: string, status: 'success' | 'error' | 'info') => {
    setLoginInfo(prev => {
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

  const checkValidation = (type: keyof ILoginInfo, value: string) => {
    const emailRegex = /[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,15}$/g;

    switch (type) {
      case 'email': {
        const email = value;

        if (!email.trim().length) {
          setSubTextAndStatus(type, '이메일을 입력하지 않았습니다.', 'error');
          return;
        }

        if (!emailRegex.test(email)) {
          setSubTextAndStatus(type, '올바른 이메일 형식이 아닙니다. 다시 입력해주세요.', 'error');
          return;
        }

        setSubTextAndStatus(type, '', 'success');
        break;
      }
      case 'password': {
        const password = value;

        if (!password.trim().length) {
          setSubTextAndStatus(type, '비밀번호를 입력하지 않았습니다.', 'error');
          return;
        }

        if (!passwordRegex.test(password)) {
          setSubTextAndStatus(type, '비밀번호는 6-15자리이며, 영문, 숫자, 특수문자를 포함해야합니다.', 'error');
          return;
        }

        setSubTextAndStatus(type, '', 'success');
        break;
      }
      default: {
        break;
      }
    }
  };

  const isExistImpossibleValue = () => {
    const values = Object.values(loginInfo);

    for (let val of values) {
      if (val.value.length === 0 || val.status === 'error') {
        return true;
      }
    }

    return false;
  };

  const handleLogin = () => {
    if (isExistImpossibleValue()) {
      Toast.error('입력 형식에 맞지 않은 값이 있습니다.');
      return;
    }

    postLogin(
      {
        email: loginInfo.email.value,
        password: loginInfo.password.value,
      },
      {
        onSuccess: res => {
          Toast.success('로그인에 성공했습니다.');
          login(res.data.user.name, res.data.user.profileImageUrl);
          navigate('/');
        },

        onError: err => {
          if (axios.isAxiosError(err)) {
            const res = err.response;

            if (res && res.status === 400) {
              if (res.data.code === 'INVALID') {
                Toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
                return;
              }
            }

            if (res && res.status === 401) {
              Toast.error('잘못된 이메일 또는 비밀번호입니다. 다시 시도해주세요.');
              return;
            }
          }
          Toast.error('로그인에 실패했습니다.');
        },
      },
    );
  };

  useEffect(() => {
    const values = Object.values(loginInfo);

    for (let val of values) {
      if (val.status !== 'success') {
        setIsPossibleLogin(false);
        return;
      }
    }

    setIsPossibleLogin(true);
  }, [loginInfo]);

  const handleKakao = () => {
    Toast.error('아직 준비중인 서비스입니다.');
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="w-[60%] h-full mx-auto flex justify-center flex-col animate-showUp">
      {/* 상단 텍스트 */}
      <div className="text-xl font-semibold pb-4">
        돌아오신것을
        <br />
        환영해요
      </div>
      {/* 폼 */}
      <form>
        <Input
          label="이메일"
          placeholder="ex) email@preview.com"
          type="email"
          onChange={e => handleChange(e, 'email')}
          subText={{
            text: loginInfo.email.subText,
            type: loginInfo.email.status,
          }}
        />
        <Input
          label="비밀번호"
          placeholder="6~15자리/영문,숫자,특수문자 조합"
          type="password"
          onChange={e => handleChange(e, 'password')}
          onKeyUp={e => handleKey(e)}
          subText={{
            text: loginInfo.password.subText,
            type: loginInfo.password.status,
          }}
        />
      </form>
      <div className="text-xs text-right pb-4">
        <span className="text-gray-400">비밀번호를 잊으셨나요?</span> 비밀번호 찾기
      </div>
      <Button
        text="로그인"
        width="w-full"
        height="h-11"
        backgroundColor={isPossibleLogin ? 'bg-MAIN1' : 'bg-gray-200'}
        textColor={isPossibleLogin ? 'text-[#EEF3FF]' : 'text-gray-400'}
        hoverBackgroundColor={isPossibleLogin ? 'hover:bg-[#3273FF]' : 'bg-gray-200'}
        onClick={handleLogin}
        disabled={!isPossibleLogin}
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
          카카오톡으로 시작하기
        </div>
      </Button>

      <div className="text-xs text-center pt-2" onClick={handleKakao}>
        아직 가입한 적이 없으신가요?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to={'/signup'} className="text-[#5A8AF2] font-bold">
          회원가입 하러가기
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
