// 유효성 검사 함수
export const isNotEmptyName = (value) =>
  /^[가-힝a-zA-Z]{2,}$/.exec(value) && value.length <= 5;

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
