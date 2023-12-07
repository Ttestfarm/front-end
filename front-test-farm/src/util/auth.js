import { redirect } from 'react-router-dom';
import * as API from '../api/index';
import axios from 'axios';

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();

  const duration = expirationDate.getTime() - now.getTime(); // 토큰 유효시간 남아있어야 양수
  return duration;
}
//토큰 발급 -> 로컬스토리지에 저장
export const getAuthToken = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  //토큰 1시간 만료시간 설정
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return 'EXPIRED';
  }
  return token;
};

// 발급된 토큰 호출 함수
export const tokenLoader = () => {
  return getAuthToken();
};
// 라우트가 주소창 입력으로 접근 시 페이지 접근 못하게 하기 위해 토큰 체커 함수 생성 : 라우트보호
export const checkAuthLoader = () => {
  const token = getAuthToken();
  if (!token) {
    return redirect('/login');
  }
  return null;
};

//로그아웃을 할 때 
export const handleLogout = async () => {
  await axios
    .get(`${API.serverUrl}/logout`, {
      withCredentials: true,
    })
    .then(window.location.replace('/'));
};
