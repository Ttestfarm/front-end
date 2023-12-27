// 유효성 검사 함수
export const isNotEmptyName = (value) =>
  /^[가-힝a-zA-Z0-9]{2,}$/.exec(value) && value.length <= 5;

export const isEmail = (value) =>
  value
    .toLowerCase()
    .match(
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    );

export const isPassword = (value) =>
  value.trim().length >= 8 &&
  /[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.exec(value) &&
  /[0-9]/.exec(value) &&
  /[!@#]/.exec(value);

export const isNotEmptyfarmName = (value) =>
  /^[가-힝a-zA-Z0-9]{2,}$/.exec(value) && value.length >= 2;

export const isTel = (value) =>
  value.trim().match(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/) ||
  value.trim().match(/^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))(\d{3,4})(\d{4})$/);

export const isNotEmptyValue = (value) => value.trim() !== '';

// ({2,3}) - ({3,4}) - ({4})
export const phoneFormat = (phoneNumber) => {
  const value = phoneNumber.replace(/[^0-9]/g, '');
  // 00 OR 000 지정
  const firstLength = value.length > 9 ? 3 : 2;

  return [
    value.slice(0, firstLength), // 첫번째 구간 (00 or 000)
    value.slice(firstLength, value.length - 4), // 두번째 구간 (000 or 0000)
    value.slice(value.length - 4), // 남은 마지막 모든 숫자
  ].join('-');
};
