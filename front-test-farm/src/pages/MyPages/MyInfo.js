import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './RegistUser.module.css';

import useUserInput from './../../hooks/use-userInput';
import * as API from '../../api/index';
import * as val from '../../util/validation';
import RegistSection from './../../components/UI/RegistSection';

import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  isErrorModalAtom,
  isSuccessModalAtom,
  isPostcodeModalAtom,
  postcodeAddressAtom,
  userInfoAtom,
} from '../../recoil/Atoms';

const RegistUserPage = () => {
  //비밀번호 확인 유효성 검사set
  const [, setRepassword] = useState('');
  const [repasswordIsValid, setRepasswordIsValid] = useState(false);
  const [checkPwdMsg, setCheckPwdMsg] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [authNum, setAuthNum] = useState('');
  const [checkSMS, setCheckSMS] = useState('');
  const [updateData, setUpdateData] = useState({});

  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const setIsSucessModal = useSetRecoilState(isSuccessModalAtom);
  const setIsErrorModal = useSetRecoilState(isErrorModalAtom);
  const [isPostcodeModal, setIsPostcodeModal] =
    useRecoilState(isPostcodeModalAtom);
  const [postcodeAddress, setPostcodeAddress] =
    useRecoilState(postcodeAddressAtom);

  const navigate = useNavigate();

  // //기존에 등록된 정보 가져오기
  // useEffect(() => {
  //   if (userInfo) {
  //     setUpdateData({...userInfo});
  //       // userId: userInfo?.user?.userId,
  //       // password: '',
  //       // passwordConfirm: '',
  //       // name: userInfo?.user?.name,
  //       // nickname: userInfo?.user?.nickname,
  //       // phone: userInfo?.user?.phone,
  //       // addressDetail: userInfo?.user?.addressDetail,
  //     });
  //   }
  // }, [userInfo]);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useUserInput(val.isNotEmpty);

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

  const {
    value: addressDetailValue,
    isValid: addressDetailIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressDetailChangeHandler,
    inputBlurHandler: addressDetailBlurHandler,
    reset: resetAddressDetail,
  } = useUserInput(val.isNotEmpty);

  const {
    value: telValue,
    isValid: telIsValid,
    hasError: telHasError,
    valueChangeHandler: telChangeHandler,
    inputBlurHandler: telBlurHandler,
    reset: resetTel,
  } = useUserInput(val.isPhone);

  const pwCheckHandler = (e) => {
    const inputPassword = e.target.value;
    setRepassword(inputPassword);
    if (passwordValue !== inputPassword) {
      setCheckPwdMsg('비밀번호가 똑같지 않아요!');
      setRepasswordIsValid(false);
    } else {
      setCheckPwdMsg('똑같은 비밀번호를 입력했습니다.');
      setRepasswordIsValid(true);
    }
  };

  //주소찾기 모달 열기
  const onClicktoggleAddressModal = async (e) => {
    e.preventDefault();
    setIsPostcodeModal((prev) => !prev);
  };

  //핸드폰 인증번호 요청
  const sendSMS = async (e) => {
    e.preventDefault();
    await API.get(`/modify-user/sendSMS?tel=${telValue}`).then((response) => {
      console.log(response.data);
      setAuthNum(response.data);
    });
  };

  //인증번호 확인
  const checkSMSHandler = () => {
    if (authNum === checkSMS) {
      setIsSucessModal({
        state: true,
        message: '휴대폰 인증이 정상적으로 완료되었습니다.',
      });
    } else {
      setIsErrorModal({
        state: true,
        message: '인증번호가 올바르지 않습니다.',
      });
    }
  };

  //주소창 닫으면 값 리셋
  useEffect(() => {
    return () => {
      setPostcodeAddress('');
    };
  }, [setPostcodeAddress]);

  let formIsValid = false;

  if (
    nameIsValid &&
    passwordIsValid &&
    repasswordIsValid &&
    addressDetailIsValid &&
    telIsValid
  ) {
    formIsValid = true;
  }
  const RegistHandler = async () => {
    const data = {
      // userEmail: emailValue,
      userName: nameValue,
      userPassword: passwordValue,
      userAddress: postcodeAddress,
      address1: zipcode,
      address2: postcodeAddress,
      address3: addressDetailValue,
      userTel: telValue,
    };

    try {
      await axios.post(`${API.serverUrl}/join`, data);
      resetName();

      resetPassword();
      resetRepassword();
      resetAddressDetail();
      resetTel();

      setIsSucessModal({
        state: true,
        message: '언프리티팜의 회원 가입을 환영합니다!',
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

  const passwordStyles = passwordHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  const addressStyles = addressHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  const telStyles = telHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  return (
    <RegistSection title={'내 정보 관리'}>
      <div className={nameStyles}>
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          placeholder={'이름을 입력하세요.(최대 5글자)'}
        />
        {nameHasError && (
          <p className={style['error-text']}>
            이름은 최소 2글자 이상 입력하세요 (최대 5글자)
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          // value={emailValue}
          disabled
        />
      </div>

      <div className={passwordStyles}>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={passwordValue}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          placeholder={'문자+숫자+(! @ #)중 하나를 포함 (8글자 이상)'}
        />
        {passwordHasError && (
          <p className={style['error-text']}>
            문자+숫자+(! @ #)중 하나를 포함 (8글자 이상)
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

      <div className={addressStyles}>
        <div className={style.certify}>
          <label htmlFor="farmAddress">주소</label>
          <input
            type="text"
            disabled
            value={zipcode}
            className={style.zipcode}
            placeholder={'우편번호'}
          />
          <button
            className={style['certify-btn']}
            onClick={onClicktoggleAddressModal}
          >
            주소 찾기
          </button>
        </div>

        <input
          type="text"
          name="farmAddress"
          value={postcodeAddress}
          // onChange={farmAddressChangeHandler}
          // onBlur={farmAddressBlurHandler}
          placeholder={'도로명 주소'}
          disabled
        />
        <input
          type="text"
          name="farmAddressDetail"
          value={addressDetailValue}
          onChange={addressDetailChangeHandler}
          onBlur={addressDetailBlurHandler}
          placeholder={'상세 주소를 입력해 주세요.'}
        />
      </div>

      <div className={telStyles}>
        <div className={style.certify}>
          <label htmlFor="tel">핸드폰 번호</label>
          <button
            id="tel-certify-req"
            onClick={() => {
              sendSMS();
              setIsSucessModal({
                state: true,
                message: '인증번호를 발송했어요!',
              });
            }}
            className={style['certify-btn']}
          >
            인증번호 요청
          </button>
          {telHasError && (
            <p className={style['error-text']}>phone 인증번호를 입력하세요.</p>
          )}
        </div>
        <input
          type="text"
          name="tel"
          value={telValue}
          onChange={telChangeHandler}
          onBlur={telBlurHandler}
          placeholder={'01056781234 (숫자만 입력하셔도 됩니다.)'}
        />

        <div className={style.certify}>
          <button
            id="tel-certify-req"
            onClick={checkSMSHandler}
            className={style['certify-btn']}
          >
            인증번호 확인
          </button>
          <input
            type="text"
            name="checkSMS"
            value={checkSMS}
            onChange={(e) => setCheckSMS(e.target.value)}
            placeholder={'인증번호를 입력해 주세요.'}
          />
        </div>
        <button
          id="join"
          className={style['join-btn']}
          disabled={!formIsValid}
          onClick={RegistHandler}
        >
          회원가입 완료
        </button>
      </div>
    </RegistSection>
  );
};

export default RegistUserPage;
