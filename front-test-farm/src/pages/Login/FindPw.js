import React, { Fragment, useEffect, useRef, useState } from "react";

import style from './FindPw.module.css';
import * as val from '../../util/validation';
import * as API from '../../api/index';
import useUserInput from "../../hooks/use-userInput";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { isErrorModalAtom, isSuccessModalAtom } from "../../recoil/Atoms";

const FindPwPage = () => {
  const inputRef = useRef();

  const setIsSucessModal = useSetRecoilState(isSuccessModalAtom);
  const setIsErrorModal = useSetRecoilState(isErrorModalAtom);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const FindHandler = async () => {
    const data = {
      userEmail: userEmail,
      userName: userName,
    };
    
    try {
      await axios.get(`${API.serverUrl}/find-pw/${userName}/${userEmail}`, data)
      .then((response) => {
        if (response.status === 200) {
          const userPassword = response.data;
          console.log(userPassword);
          
          setIsSucessModal({
            state: true,
            message: (
              <div>
                <span className={style.boldText}>{userEmail}</span>
                이메일로 임시 비밀번호를 전송했습니다.<br />
                해당 임시 비밀번호로 로그인 후 비밀번호를 변경해주세요. 
              </div>
            )
          });
        }
      })
    } catch (error) {
      setIsErrorModal({
        state: true,
        message: '입력한 정보로 조회된 계정이 없습니다.',
      })
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
    value: userEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useUserInput(val.isEmail);

  const nameStyles = nameHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  const emailStyles = emailHasError
    ? `${style['form-control']} ${style.invalid}`
    : style['form-control'];

  return (
    <Fragment>
      <div className={style.wrap}>
        <div className={style["wrap-center"]}>

          <div className={style.title}>
            <div>비밀번호 찾기</div>
          </div>

          <div className={style.input}>
            <label for="email">이메일</label> 
            <input
              ref={inputRef}
              type="text"
              id="email"
              value={userEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              placeholder={"이메일을 입력해 주세요."}
            />
            <label for="name">이름</label> 
            <input
              type="text"
              id="name"
              value={userName}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              placeholder={"이름을 입력해 주세요."}
            />
          </div>

          <button
            id="find-password"
            className={style["find-btn"]}
            // disabled={!formIsValid}
            onClick={FindHandler}
          >
            비밀번호 찾기
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default FindPwPage;
