import { useEffect, useRef } from 'react';
import { Form, Link, useActionData, useNavigation } from 'react-router-dom';

import style from './LoginForm.module.css';
import naver from '../../assets/naver.png';

const LoginForm = () => {
  const data = useActionData(); //Form 전송한 작업 함수가 리턴한 데이터 얻어옴
  const navigation = useNavigation();
  const inputRef = useRef();
  const isSubmitting = navigation.state === 'submittiong';

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={style.wrap}>
      <div className={style['wrap-center']}>
        <div className={style['text-group']}>
          <div>로그인·회원가입</div>
          <div>못생겨서 오히려 좋아.</div>
          <div>못난이 농산물 거래, 언프리티 팜</div>
        </div>

        <Form className={style['kakao-naver']}>
          <Link
            id="kakao-login"
            to="#"
          >
            <img
              src="https://d3cpiew7rze14b.cloudfront.net/assets/app/kakao_icon.svg"
              alt="카카오 로그인"
            />
            <span>카카오로 계속하기</span>
          </Link>
          <Link
            id="naver-login"
            to="#"
          >
            <img
              src={naver}
              alt="naver-logo"
            />
            <span>네이버로 계속하기</span>
          </Link>
        </Form>

        <Form
          method="POST"
          className={style['email-login']}
        >
          {data && data.errors && (
            <ul>
              {/* error 가 객체이기 때문에 내장함수 사용가능 */}
              {Object.values(data.errors).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}
          {data && data.message && <p>{data.message}</p>}
          <div>이메일로 계속하기</div>
          <input
            ref={inputRef}
            type="text"
            id="email"
            name="email"
            placeholder={'이메일을 입력해 주세요.'}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder={'비밀번호를 입력해 주세요.'}
          />
          <div className={style.find}>
            <Link
              id="find-email"
              to="#"
            >
              이메일 찾기
            </Link>
            <Link
              id="find-password"
              to="#"
            >
              비밀번호 찾기
            </Link>
          </div>
          <button
            id="login"
            className={style['login-btn']}
            disabled={isSubmitting}
          >
            {isSubmitting ? '🎉Welcome' : '로그인'}
          </button>
        </Form>

        <div className={style.join}>
          <span>아직 회원이 아니신가요?</span>
          <Link to="/join">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
