import React, { useEffect, useRef, useState } from "react";

import style from "./FindEmail.module.css";
import * as val from "../../util/validation";
import * as API from "../../api/index";
import useUserInput from "../../hooks/use-userInput";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { isErrorModalAtom, isSuccessModalAtom } from "../../recoil/Atoms";
import RegistSection from "../../components/UI/RegistSection";

const FindEmailPage = () => {
  const inputRef = useRef();

  const [authNum, setAuthNum] = useState("");
  const [checkSMS, setCheckSMS] = useState("");

  const setIsSucessModal = useSetRecoilState(isSuccessModalAtom);
  const setIsErrorModal = useSetRecoilState(isErrorModalAtom);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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

  //핸드폰 인증번호 요청
  const sendSMS = async (e) => {
    console.log(userTel);
    await API.get(`/modify-user/check-sms/${userTel}`)
    .then((response) => {
      setIsSucessModal({
        state: true,
        message: "인증번호를 발송했습니다.",
      });
      console.log(response.data);
      setAuthNum(response.data);
    });
  };

  //인증번호 확인
  const checkSMSHandler = () => {
    if (authNum.toString() === checkSMS.toString()) {
      setIsSucessModal({
        state: true,
        message: "휴대폰 인증이 정상적으로 완료되었습니다.",
      });
    } else {
      setIsErrorModal({
        state: true,
        message: "인증번호가 올바르지 않습니다.",
      });
    }
  };

  let formIsValid = false;

  if (nameIsValid && telIsValid) {
    formIsValid = true;
  }

  const FindHandler = async () => {
    const data = {
      userName: userName,
      userTel: userTel,
    };

    try {
      await axios
        .get(`${API.serverUrl}/find-email/${userName}/${userTel}`, data)
        .then((response) => {
          if (response.status === 200) {
            const userEmail = response.data;
            console.log(userEmail);
            resetName();
            resetTel();

            setIsSucessModal({
              state: true,
              message: (
                <div>
                  입력한 정보로 조회된 이메일은
                  <span className={style.boldText}>{userEmail}</span>
                  입니다.
                </div>
              ),
            });
          }
        });
    } catch (error) {
      setIsErrorModal({
        state: true,
        message: "입력한 정보로 조회된 이메일이 없습니다.",
      });
    }
  };

  const nameStyles = nameHasError
    ? `${style["form-control"]} ${style.invalid}`
    : style["form-control"];

  // const telStyles = telHasError
  //   ? `${style['form-control']} ${style.invalid}`
  //   : style['form-control'];

  return (
    <RegistSection title={"이메일 찾기"}>
      <div className={nameStyles}>
        <label htmlFor="name">이름</label>
        <input
          ref={inputRef}
          type="text"
          id="name"
          value={userName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          placeholder={"이름을 입력해 주세요."}
        />
        {nameHasError && (
          <p className={style["error-text"]}>
            이름은 최소 2글자에서 최대 5글자 입니다.
          </p>
        )}
      </div>

      <div className={style["form-control"]}>
        <div className={style.certify}>
          <label htmlFor="tel">핸드폰 번호</label>
          <button
            id="certify-btn-req"
            onClick={() => {
              sendSMS();
            }}
            className={style["certify-btn"]}
          >
            인증번호요청
          </button>
        </div>
        <input
          type="text"
          id="tel"
          value={userTel}
          onChange={telChangeHandler}
          onBlur={telBlurHandler}
          placeholder={"숫자만 입력해 주세요."}
        />

        <div className={style.certify}>
          <input
            type="text"
            name="checkSMS"
            value={checkSMS}
            onChange={(e) => setCheckSMS(e.target.value)}
            placeholder={"인증번호를 입력해 주세요."}
          />
          <button
            id="tel-certify-req"
            onClick={checkSMSHandler}
            className={style["certify-btn"]}
          >
            인증번호 확인
          </button>
        </div>

        <button
          id="find-email"
          className={style["find-btn"]}
          disabled={!formIsValid}
          onClick={FindHandler}
        >
          이메일 찾기
        </button>
      </div>
    </RegistSection>
  );
};

export default FindEmailPage;
