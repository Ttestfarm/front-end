import { redirect } from 'react-router-dom';
import * as API from '../api/index';
import axios from 'axios';

//토큰 발급 시 유효시간 1시간 설정
export const setTokenDuration = () => {
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);

  localStorage.setItem('expiration', expiration.toISOString());
  return expiration.toISOString();
};

//토큰 남은시간 계산
export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();

  const duration = expirationDate.getTime() - now.getTime(); // 토큰 유효시간 남아있어야 양수
  return duration;
}

// // 라우트가 주소창 입력으로 접근 시 페이지 접근 못하게 하기 위해 토큰 체커 함수 생성 : 라우트보호
// export const checkAuthLoader = () => {
//   const token = getAuthToken();
//   if (!token) {
//     return redirect('/login');
//   }
//   return null;
// };

//로그아웃을 할 때
export const handleLogout = async () => {
  await axios
    .get(`${API.serverUrl}/logout`, {
      withCredentials: true,
    })
    .then(window.location.replace('/'));
};
