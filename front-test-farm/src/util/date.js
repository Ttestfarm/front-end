import dayjs from 'dayjs';

export const dateFormatter = (dateValue) => {
  const createDate = dateValue;
  const date = new Date(createDate); //date형식으로 변환
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1, 두 자리로 표기
  const day = String(date.getDate()).padStart(2, '0'); // 날짜를 두 자리로 표기

  const formattedDate = `${year}-${month}-${day}`; // yyyy-mm-dd 형식으로 조합

  return formattedDate;
};

//오늘 날짜 찾기
export const isToday = (date) => {
  const today = dayjs().format('YYYY-MM-DD');
  const requestDate = dayjs(date).format('YYYY-MM-DD');
  return today === requestDate;
};
