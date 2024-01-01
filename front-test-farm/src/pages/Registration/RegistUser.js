import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './RegistUser.module.css';
import useUserInput from './../../hooks/use-userInput';
import * as API from '../../api/index';
import * as val from '../../util/validation';
import axios from 'axios';
import RegistSection from './../../components/UI/RegistSection';
import { useSetRecoilState } from 'recoil';
import { isErrorModalAtom, isSuccessModalAtom } from '../../recoil/Atoms';

const RegistUserPage = () => {
  //비밀번호 확인 유효성 검사set
  const [, setRepassword] = useState('');
  const [repasswordIsValid, setRepasswordIsValid] = useState(false);
  const [checkPwdMsg, setCheckPwdMsg] = useState('');

  //이메일 중복체크
  const [emailChecked, setEmailChecked] = useState(false);

  const setIsSucessModal = useSetRecoilState(isSuccessModalAtom);
  const setIsErrorModal = useSetRecoilState(isErrorModalAtom);

  const navigate = useNavigate();
  const inputRef = useRef();
  //렌더링시 이메일에 인풋포커싱
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useUserInput(val.isNotEmptyName);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useUserInput(val.isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useUserInput(val.isPassword);

  const {
    value: repasswordValue,
    valueChangeHandler: repasswordChangeHandler,
    inputBlurHandler: repasswordBlurHandler,
    reset: resetRepassword,
  } = useUserInput(val.isPassword);

  const emailDuplicateCheackHandler = async () => {
    if (emailIsValid) {

      await axios
        .post(`${API.serverUrl}/join/check-email`, {
          userEmail: emailValue,
        })
        .then((response) => {
          if (response.status === 409) {
            //이미 가입된 이메일인 경우
            setIsErrorModal({ state: true, message: response.data });
          } else if (response.status === 200) {
            //회원가입 성공
            setEmailChecked(true);
            setIsSucessModal({
              state: true,
              message: response.data,
            });
          }
        })
        .catch((e) => {// 이 부분 수정 지워야함 
          setIsErrorModal({ state: true, message: e.response.data });
        });
    }
  };

  const pwCheckHandler = (e) => {
    const inputPassword = e.target.value;
    setRepassword(inputPassword);
    if (passwordValue !== inputPassword) {
      setCheckPwdMsg('비밀번호가 일치하지 않습니다.');
      setRepasswordIsValid(false);
    } else {
      setCheckPwdMsg('비밀번호가 일치합니다.');
      setRepasswordIsValid(true);
    }
  };

  let formIsValid = false;

  if (nameIsValid && emailIsValid && passwordIsValid && repasswordIsValid) {
    formIsValid = true;
  }
  const RegistHandler = async () => {
    if (!emailChecked) {
      setIsErrorModal({ state: true, message: '이메일 중복검사를 해주세요!' });
      return;
    }
    const data = {
      userEmail: emailValue,
      userName: nameValue,
      userPassword: passwordValue,
    };
    try {
      await axios.post(`${API.serverUrl}/join`, data);
      resetName();
      resetEmail();
      resetPassword();
      resetRepassword();

      setIsSucessModal({
        state: true,
        message: '언프리티팜 회원 가입을 환영합니다!',
      });

      navigate('/login');
    } catch (error) {
      setIsErrorModal({
        state: true,
        message: error.message,
      });
    }
  };
  const nameStyles = nameHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  const emailStyles = emailHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  const passwordStyles = passwordHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  return (
    <RegistSection title={'회원가입'}>
      <div className={nameStyles}>
        <label htmlFor="name">이름</label>
        <input
          ref={inputRef}
          type="text"
          id="name"
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          placeholder={'이름을 입력하세요.(2~5자)'}
        />
        {nameHasError && (
          <p className={style['error-text']}>
            이름을 입력하세요.(2~5자)
          </p>
        )}
      </div>

      <div className={emailStyles}>
        <div className={style.certify}>
          <label htmlFor="email">이메일</label>
          <button
            id="email-certify-req"
            className={style['certify-btn']}
            onClick={emailDuplicateCheackHandler}
          >
            중복확인
          </button>
        </div>
        <input
          type="text"
          id="email"
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          placeholder={'unpretty@farm.com'}
        />
        {emailHasError && (
          <p className={style['error-text']}>
            이메일 형식이 정확하지 않습니다.
          </p>
        )}
      </div>

      <div className={passwordStyles}>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={passwordValue}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          placeholder={'영문, 숫자, 특수기호(! @ #) 를 조합하여 작성 (8글자 이상)'}
        />
        {passwordHasError && (
          <p className={style['error-text']}>
            영문, 숫자, 특수기호(! @ #) 를 조합하여 작성 (8자 이상)
          </p>
        )}
        <input
          type="password"
          id="repassword"
          name="repassword"
          value={repasswordValue}
          onChange={(e) => {
            repasswordChangeHandler(e);
            pwCheckHandler(e);
          }}
          onBlur={repasswordBlurHandler}
          placeholder={'비밀번호를 한 번 더 입력해 주세요.'}
        />
        <p className={style['error-text']}>{checkPwdMsg}</p>
      </div>
      <button
        id="join"
        className={style['join-btn']}
        disabled={!formIsValid}
        onClick={RegistHandler}
      >
        회원가입 완료
      </button>
    </RegistSection>
  );
};

export default RegistUserPage;
