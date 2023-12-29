import { useRef, useEffect, useState } from 'react';
import style from './JoinForm.module.css';
import useInput from '../../hooks/use-userInput';

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) =>
  value
    .toLowerCase()
    .match(
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    );
const isNotLong = (value) => value.length <= 7;
const isPhone = (value) =>
  value.trim().match(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/);

const JoinForm = () => {
  const inputRef = useRef();

  //화면 렌더링시 포커싱
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //초기값 셋팅
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  //유효성 검사
  const [isCheckedPassword, setIsCheckedPassword] = useState('');

  //오류메세지 상태저장
  const [emailMsg, setEmailMsg] = useState('');
  //const [pwdMsg, setPwdMsg] = useState('');
  const [checkPwdMsg, setCheckPwdMsg] = useState('');
  const [nicknameMsg, setNicknameMsg] = useState('');
  const [telMsg, setTelMsg] = useState('');

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);

  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(isNotEmpty);

  const {
    value: nicknameValue,
    isValid: nicknameIsValid,
    hasError: nicknameHasError,
    valueChangeHandler: nicknameChangeHandler,
    inputBlurHandler: nicknameBlurHandler,
    reset: resetNickname,
  } = useInput(isNotLong);

  const {
    value: telValue,
    isValid: telIsValid,
    hasError: telHasError,
    valueChangeHandler: telChangeHandler,
    inputBlurHandler: telBlurHandler,
    reset: resetTel,
  } = useInput(isPhone);

  const passwordCheckHandler = (e) => {
    const inputPassword = e.target.value;
    setCheckPassword(inputPassword);
    if (passwordValue !== inputPassword) {
      setCheckPwdMsg('비밀번호가 똑같지 않아요!');
      setIsCheckedPassword(false);
    } else {
      setCheckPwdMsg('똑같은 비밀번호를 입력했습니다.');
      setIsCheckedPassword(true);
    }
  };

  let formIsValid = false;

  if (
    (nameIsValid, emailIsValid)
  ) {
    formIsValid = true;
  }

  const reqAuthNumberHandler = (e) => {
    e.preventDefault();
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) return;

    resetName();
    resetEmail();
    resetPassword();
    resetAddress();
    resetNickname();
    resetTel();
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

  const addrStyles = addressHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  const nicknameStyles = nicknameHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  const telStyles = telHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  return (
    <form
      className={style['wrap-center']}
      onSubmit={submitHandler}
    >
      <div className={style.title}>회원가입</div>

      <div className={nameStyles}>
        <label htmlFor="name">이름</label>
        <input
          ref={inputRef}
          type="text"
          id="name"
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          placeholder={'이름을 입력해 주세요.'}
        />
        {nameHasError && (
          <p className={style['error-text']}>정확한 이름을 입력해 주세요.</p>
        )}
      </div>

      <div className={emailStyles}>
        <div className={style.certify}>
          <label htmlFor="email">이메일</label>
          <button
            id="email-certify-req"
            className={style['certify-btn']}
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
          placeholder={'비밀번호를 입력해 주세요.(8자 이상)'}
        />
        <input
          type="password"
          id="passwordCheck"
          name="passwordCheck"
          value={checkPassword}
          onChange={passwordCheckHandler}
          placeholder={'비밀번호를 한 번 더 입력해 주세요.'}
        />
        <p className={style['error-text']}>{checkPwdMsg}</p>
      </div>

      <div className={addrStyles}>
        <label htmlFor="address">주소</label>
        <div className={style['address-code']}>
          <input
            type="text"
            id="address-code"
            disabled
            placeholder={'우편번호'}
          />
          <button
            id="find-address-code"
            className={style['certify-btn']}
          >
            우편번호 찾기
          </button>
        </div>
        <input
          type="text"
          id="address-road"
          placeholder={'도로명 주소'}
        />
        <input
          type="text"
          id="address-detail"
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
          placeholder={'상세 주소를 입력해 주세요.'}
        />
        {addressHasError && (
          <p className={style['error-text']}>주소를 모두 입력하세요.</p>
        )}
        <div className={style['address-default']}>
          <input
            type="checkbox"
            id="address-default"
            name="dafault-"
          />
          <p>기본 배송지로 설정하기</p>
        </div>
      </div>

      <div className={nicknameStyles}>
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          id="nickname"
          value={nicknameValue}
          onChange={nicknameChangeHandler}
          onBlur={nicknameBlurHandler}
          placeholder={'닉네임을 입력해 주세요.(영어,한글,숫자 쌉가능)'}
        />
        {nicknameHasError && (
          <p className={style['error-text']}>닉네임을 정확히 입력하세요.</p>
        )}
      </div>

      <div className={telStyles}>
        <div className={style.certify}>
          <label htmlFor="tel">핸드폰 번호</label>
          <button
            id="tel-certify-req"
            onClick={reqAuthNumberHandler}
            className={style['certify-btn']}
          >
            인증번호 요청
          </button>
        </div>
        <input
          type="text"
          id="tel"
          value={telValue}
          onChange={telChangeHandler}
          onBlur={telBlurHandler}
          placeholder={'01056781234 (숫자만 입력하셔도 됩니다.)'}
        />
        <input
          type="text"
          id="tel-cert-num"
          placeholder={'인증번호를 입력해 주세요.'}
          disabled
        />
        {telHasError && (
          <p className={style['error-text']}>phone 인증번호를 입력하세요.</p>
        )}
      </div>

      <button
        id="join"
        className={style['join-btn']}
        disabled={!formIsValid}
      >
        회원가입 완료
      </button>
    </form>
  );
};
export default JoinForm;
