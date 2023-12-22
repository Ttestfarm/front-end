import { useEffect, useState } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import MainNavigation from '../components/Layout/MainNavigation';
import { getTokenDuration } from '../util/auth';
import SuccessModal from '../components/UI/SuccessModal';
import ErrorModal from '../components/UI/ErrorModal';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import {
  isErrorModalAtom,
  isSuccessModalAtom,
  userInfoAtom,
} from './../recoil/Atoms';
import { tokenAtom } from './../recoil/Atoms';

const RootLayout = ({ children }) => {
  const [token, setToken] = useRecoilState(tokenAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  //const token = useLoaderData();
  const submit = useSubmit();

  // useEffect(() => {
  //   console.log('root!');
  //   if (!token) return;

  // const tokenDuration = getTokenDuration();
  // if (token && tokenDuration < 0) {
  //   submit(null, { action: '/logout', method: 'post' });
  //   setUserInfo(null);
  //   setToken('');
  //   setIsErrorModal({
  //     state: true,
  //     message: '[인증시간 만료] 로그인을 다시 해주세요.',
  //   });
  //   return;
  // }
  // console.log(tokenDuration); // 토큰 잔여시간 보여줌

  // if (token === 'EXPIRED') {
  //   submit(null, { action: '/logout', method: 'post' });
  //   return;
  // }

  //   setTimeout(() => {
  //     submit(null, { action: '/logout', method: 'post' });
  //     setUserInfo(null);
  //     setToken('');
  //   }, tokenDuration);
  // }, [token, submit]);

  //성공/실패 모달 관련 설정
  const [isSuccessModal, setIsSuccessModal] =
    useRecoilState(isSuccessModalAtom);
  const [isErrorModal, setIsErrorModal] = useRecoilState(isErrorModalAtom);

  const onClose = () => {
    setIsSuccessModal({ state: false, message: '' });
    setIsErrorModal({ state: false, message: '' });
  };
  //끝

  return (
    <>
      <MainNavigation />
      {children}
      {isSuccessModal.state && (
        <SuccessModal
          onClose={onClose}
          message={isSuccessModal.message}
        />
      )}
      {isErrorModal.state && (
        <ErrorModal
          onClose={onClose}
          message={isErrorModal.message}
        />
      )}
      <main style={{ marginTop: '80px' }}>
        <Outlet />
      </main>
    </>
  );
};
export default RootLayout;
