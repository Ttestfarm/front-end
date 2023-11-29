// 상태관리 & 수정필요사항
// - 소셜로그인 로고 img 삽입 방식 통일?

import React from 'react';
import { json, redirect } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;

/* **********
 *로컬 로그인
 ************/
//가입양식이 제출되면 제출한 데이터를 얻어와야지
export async function action({ request }) {
  //레알 데이터 얻어옴
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };
  console.log(authData);
  const response = await fetch('http://localhost:8090/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok)
    throw json({ message: '로그인 인증에 실패했어요.' }, { status: 500 });

  const resData = await response.json();
  const token = resData.token;

  //토큰 로컬스토리지에 저장
  localStorage.setItem('token', token);

  //토큰 유효시간 설정
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());
  return redirect('/');
}
