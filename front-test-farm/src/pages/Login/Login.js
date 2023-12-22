import React, { useEffect, useState, useRef } from 'react';
import { Form, Link, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';

import style from './Login.module.css';
import naver from '../../assets/naver.png';
import * as API from '../../api';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { tokenAtom, isErrorModalAtom, userInfoAtom } from '../../recoil/Atoms';
import { setTokenDuration } from './../../util/auth';

const LoginPage = () => {
  const [, setEmail] = useState('');
  const [, setPassword] = useState('');

  const setToken = useSetRecoilState(tokenAtom);
  const setIsErrorModal = useSetRecoilState(isErrorModalAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  const navigation = useNavigation();
  const navigate = useNavigate();
  const inputRef = useRef();

  const isSubmitting = navigation.state === 'submitting';

  // useEffect(() => {
  //   if (userInfo) {
  //     console.log(userInfo);
  //     console.log(tokenAtom);
  //   }
  // }, [userInfo]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData(e.target);
      const loginData = {
        //백엔드로 보낼 데이터
        userEmail: data.get('email'),
        userPassword: data.get('password'),
      };

      const response = await axios.post(`${API.serverUrl}/login`, loginData);

      console.log('reponse', response);

      const token = response.headers['authorization'];
      console.log(token);

      setTokenDuration();
      setToken(token);
      navigate('/');
    } catch (error) {
      setIsErrorModal({
        state: true,
        message: error.response.data,
      });
    }
  };

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
            to="http://localhost:8090/oauth2/authorization/kakao"
          >
            <img
              src="https://d3cpiew7rze14b.cloudfront.net/assets/app/kakao_icon.svg"
              alt="카카오 로그인"
            />
            <span>카카오로 계속하기</span>
          </Link>
          <Link
            id="naver-login"
            to="http://localhost:8090/oauth2/authorization/naver"
          >
            <img
              src={naver}
              alt="naver-logo"
            />
            <span>네이버로 계속하기</span>
          </Link>
        </Form>

        <Form
          onSubmit={submitHandler}
          className={style['email-login']}
        >
          <div>이메일로 계속하기</div>
          <input
            ref={inputRef}
            type="text"
            id="email"
            name="email"
            onChange={onChangeInput}
            placeholder={'이메일을 입력해 주세요.'}
          />
          <input
            type="password"
            id="password"
            name="password"
            onChange={onChangeInput}
            placeholder={'비밀번호를 입력해 주세요.'}
          />
          <div className={style.find}>
            <Link
              id="find-email"
              to="/find-email"
            >
              이메일 찾기
            </Link>
            <Link
              id="find-password"
              to="/find-pw"
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

export default LoginPage;
