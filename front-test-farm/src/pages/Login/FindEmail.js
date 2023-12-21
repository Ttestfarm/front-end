import React, { Fragment, useEffect, useRef, useState } from "react";

import style from './FindEmail.module.css';
import * as val from '../../util/validation';
import * as API from '../../api/index';
import useUserInput from "../../hooks/use-userInput";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { isErrorModalAtom, isSuccessModalAtom } from "../../recoil/Atoms";

const FindEmailPage = () => {
  const inputRef = useRef();

  const [authNum, setAuthNum] = useState('');
  const [checkSMS, setCheckSMS] = useState('');
  
  const setIsSucessModal = useSetRecoilState(isSuccessModalAtom);
  const setIsErrorModal = useSetRecoilState(isErrorModalAtom);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const FindHandler = async () => {
    const data = {
      userName: userName,
      userTel: userTel,
    };

    try {
      await axios.get(`${API.serverUrl}/find-email/${userName}/${userTel}`, data)
      .then((response) => {
        if (response.status === 200) {
          const userEmail = response.data;
          console.log(userEmail);

          setIsSucessModal({
            state: true,
            message: (
              <div>
                입력한 정보로 조회된 이메일은
                <span className={style.boldText}>{userEmail}</span>
                입니다.
              </div>
            )
          });
        }
      })
    } catch (error) {
      setIsErrorModal({
        state: true,
        message: '입력한 정보로 조회된 이메일이 없습니다.',
      });
    }
  };

  const {
    value: userName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useUserInput(val.isNotEmptyName);

  const {
    value: userTel,
    isValid: telIsValid,
    hasError: telHasError,
    valueChangeHandler: telChangeHandler,
    inputBlurHandler: telBlurHandler,
    reset: resetTel,
  } = useUserInput(val.isTel);

  const nameStyles = nameHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  const telStyles = telHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  return (
    <Fragment>
      <div className={style.wrap}>
        <div className={style["wrap-center"]}>

          <div className={style.title}>
            <div>이메일 찾기</div>
          </div>

          <div className={style.input}>
            <label for="name">이름</label> 
            <input
              ref={inputRef}
              type="text"
              id="name"
              value={userName}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              placeholder={"이름을 입력해 주세요."}
            />
            <div className={style.certify}>
              <label for="tel">핸드폰 번호</label> 
              <button id="certify-btn-req" className={style["certify-btn"]}>인증번호요청</button>
            </div>
            <input
              type="text"
              id="tel"
              value={userTel}
              onChange={telChangeHandler}
              onBlur={telBlurHandler}
              placeholder={"숫자만 입력해 주세요."}
            />
            <input type="text" id="tel-cert-num" placeholder={"인증번호를 입력해 주세요."} disabled />
          </div>

          <button
            id="find-email"
            className={style["find-btn"]}
            // disabled={!formIsValid}
            onClick={FindHandler}
          >
            이메일 찾기
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default FindEmailPage;
