import { useState } from 'react';

// // 유효성 검사 로직
// const nameCheck = /^[가-힝a-zA-Z]{2,}$/;
// const emailCheck =
//   /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
// const pwCheck = /[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
// const numCheck = /[0-9]/;
// const spcCheck = /[!@#]/;

// const checkName = (value) => nameCheck.exec(value);

// const checkPassword = (value) =>
//   value.trim().length >= 8 &&
//   pwCheck.exec(value) &&
//   numCheck.exec(value) &&
//   spcCheck.exec(value);

// const checkEmail = (value) => value.toLowerCase().match(emailCheck);

const useUserInput = (validateValueFn) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  //입력값 유효성 검사
  const valueIsValid = validateValueFn(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const inputBlurHandler = (e) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};
export default useUserInput;
