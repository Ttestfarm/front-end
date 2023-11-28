import { redirect } from 'react-router-dom';

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();

  const duration = expirationDate.getTime() - now.getTime(); // 토큰 유효시간 남아있어야 양수
  return duration;
}
export const getAuthToken = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }
  
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return 'EXPIRED';
  }
  return token;
};

export function tokenLoader() {
  return getAuthToken();
}
// 라우트가 주소창 입력으로 접근 시 페이지 접근 못하게 하기 위해 토큰 체커 함수 생성 : 라우트보호
export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect('/auth');
  }
  return null;
}
