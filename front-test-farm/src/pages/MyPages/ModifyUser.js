import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './ModifyUser.module.css';

import Postcode from '../../api/PostCode';
import useUserInput from './../../hooks/use-userInput';
import * as API from '../../api/index';
import * as val from '../../util/validation';
import RegistSection from './../../components/UI/RegistSection';

import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

import {
  tokenAtom,
  isErrorModalAtom,
  isSuccessModalAtom,
  isPostcodeModalAtom,
  postcodeAddressAtom,
  userInfoAtom,
  zonecodeAtom,
} from '../../recoil/Atoms';

const ModifyUserPage = () => {
  const token = useRecoilValue(tokenAtom); //리코일

  //비밀번호 확인 유효성 검사set
  const [, setRepassword] = useState('');
  const [repasswordIsValid, setRepasswordIsValid] = useState(false);
  const [checkPwdMsg, setCheckPwdMsg] = useState('');

  //휴대폰 인증과정
  const [authNum, setAuthNum] = useState('');
  const [checkSMS, setCheckSMS] = useState('');

  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [updateData, setUpdateData] = useState({ ...userInfo });

  const [isPostcodeModal, setIsPostcodeModal] =
    useRecoilState(isPostcodeModalAtom);
  const [address2, setAddress2] = useRecoilState(postcodeAddressAtom);
  const [address1, setAddress1] = useRecoilState(zonecodeAtom);

  const setIsSucessModal = useSetRecoilState(isSuccessModalAtom);
  const setIsErrorModal = useSetRecoilState(isErrorModalAtom);

  const navigate = useNavigate();

  const inputHandle = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (address1 && address2) {
      setUpdateData({ ...updateData, address1, address2 });
    }
  }, [address1, address2]);

  //주소창 닫으면 값 리셋
  useEffect(() => {
    return () => {
      setAddress2('');
    };
  }, [setAddress1, setAddress2]);

  const {
    value: userName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useUserInput(val.isNotEmptyName);

  // // const {
  // //   value: emailValue,
  // //   isValid: emailIsValid,
  // //   hasError: emailHasError,
  // //   valueChangeHandler: emailChangeHandler,
  // //   inputBlurHandler: emailBlurHandler,
  // //   reset: resetEmail,
  // // } = useUserInput(val.isEmail);
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
    isValid: address3,
    hasError: addressHasError,
    valueChangeHandler: addressDetailChangeHandler,
    inputBlurHandler: addressDetailBlurHandler,
    reset: resetAddressDetail,
  } = useUserInput(val.isNotEmptyValue);

  const {
    value: userTel,
    isValid: telIsValid,
    hasError: telHasError,
    valueChangeHandler: telChangeHandler,
    inputBlurHandler: telBlurHandler,
    reset: resetTel,
  } = useUserInput(val.isTel);

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

  //주소찾기 모달 열기
  const onClicktoggleAddressModal = async (e) => {
    e.preventDefault();
    setIsPostcodeModal((prev) => !prev);
  };

  //핸드폰 인증번호 요청
  const sendSMS = async (e) => {
    await API.get(`/modify-user/check-sms/${updateData.userTel}`).then(
      (response) => {
        setIsSucessModal({
          state: true,
          message: '인증번호를 발송했어요!',
        });
        console.log(response.data);
        setAuthNum(response.data);
      }
    );
  };

  //인증번호 확인
  const checkSMSHandler = () => {
    if (authNum.toString() === checkSMS.toString()) {
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

  let formIsValid = false;

  if (passwordIsValid && repasswordIsValid) {
    formIsValid = true;
  }

  const RegistHandler = async () => {
    try {
      const response = await API.put(`/user/modify-user`, token, updateData);
      // resetName();
      // resetPassword();
      // resetRepassword();
      // resetAddressDetail();
      // resetTel();

      console.log(response.data);
      //성공했다고 메시지
      setUserInfo({ ...response.data });
      if (response.status === 200) {
        setIsSucessModal({
          state: true,
          message: '회원정보가 수정되었습니다!',
        });
      }
      navigate('/mypage/modify-user');
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
    <RegistSection
      title={'내 정보 관리'}
      style={{ padding: 0 }}
    >
      <div className={style['form-control']}>
        <label htmlFor="name">이름</label>
        <input
          type="text"
          name="userName"
          value={updateData.userName}
          onChange={inputHandle}
          onBlur={nameBlurHandler}
          placeholder={'이름을 입력하세요.(최대 5글자)'}
        />
        {/* {nameHasError && (
          <p className={style['error-text']}>
            이름은 최소 2글자 이상 입력하세요 (최대 5글자)
          </p>
        )} */}
      </div>

      <div className={style['form-control']}>
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          name="userEmail"
          value={updateData.userEmail}
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
          placeholder={
            '영문, 숫자, 특수기호(! @ #) 를 조합하여 작성 (8글자 이상)'
          }
        />
        {passwordHasError && (
          <p className={style['error-text']}>
            영문, 숫자, 특수기호(! @ #) 를 조합하여 작성 (8글자 이상)
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

      <div className={style['form-control']}>
        <label htmlFor="farmAddress">주소</label>
        <div className={style.certify}>
          <input
            type="text"
            name="address1"
            value={updateData.address1}
            // className={style.zipcode}
            placeholder={'우편번호'}
            disabled
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
          name="address2"
          value={updateData.address2}
          // onChange={farmAddressChangeHandler}
          // onBlur={farmAddressBlurHandler}
          placeholder={'도로명 주소'}
          disabled
        />
        <input
          type="text"
          name="address3"
          value={updateData.address3}
          onChange={inputHandle}
          //onBlur={addressDetailBlurHandler}
          placeholder={'상세 주소를 입력해 주세요.'}
        />
      </div>

      <div className={style['form-control']}>
        <div className={style.certify}>
          <label htmlFor="tel">핸드폰 번호</label>
          <button
            id="tel-certify-req"
            onClick={() => {
              sendSMS();
            }}
            className={style['certify-btn']}
          >
            인증번호 요청
          </button>
        </div>
        <input
          type="text"
          name="userTel"
          value={updateData.userTel}
          onChange={inputHandle}
          onBlur={telBlurHandler}
          placeholder={'숫자만 입력해 주세요.'}
        />

        <div className={style.certify}>
          <input
            type="text"
            name="checkSMS"
            value={checkSMS}
            onChange={(e) => setCheckSMS(e.target.value)}
            placeholder={'인증번호를 입력해 주세요.'}
          />
          <button
            id="tel-certify-req"
            onClick={checkSMSHandler}
            className={style['certify-btn']}
          >
            인증번호 확인
          </button>
        </div>
        {telHasError && (
          <p className={style['error-text']}>인증번호를 입력해 주세요.</p>
        )}
        <button
          id="join"
          className={style['join-btn']}
          disabled={!formIsValid}
          onClick={RegistHandler}
        >
          정보 수정 완료
        </button>
      </div>
      {isPostcodeModal && <Postcode />}
    </RegistSection>
  );
};

export default ModifyUserPage;
