import axios from 'axios';

//사업자 등록번호 확인 API
const HandleRegistrationNumCheck = async (req) => {
  const url = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.REACT_APP_BUSINESS_API_KEY}`;
  const { data } = await axios.post(url, {
    b_no: [req],
  });
  // 📌 01 값이 반환되면 계속사업자 02 값은 휴업자 03 값은 폐업자로 확인이 가능합니다.
  return data.data[0].b_stt_cd;
};

export default HandleRegistrationNumCheck;
