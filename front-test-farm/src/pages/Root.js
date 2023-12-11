import { useEffect, useState } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import MainNavigation from '../components/Layout/MainNavigation';
import { getTokenDuration } from '../util/auth';
import SuccessModal from '../components/UI/SuccessModal';
import ErrorModal from '../components/UI/ErrorModal';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import { isErrorModalAtom, isSuccessModalAtom } from './../recoil/Atoms';

const RootLayout = ({ children }) => {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    console.log('root!');
    if (!token) return;

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }
    const tokenDuration = getTokenDuration();
    console.log(tokenDuration); // 토큰 잔여시간 보여줌

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration); // 백엔드에서 토큰 만료가  1시간 설정되있으니까
  }, [token, submit]);

  //성공/실패 모달 관련 설정
  const [isSuccessModal, setIsSuccessModal] =
    useRecoilState(isSuccessModalAtom);
  const [isErrorModal, setIsErrorModal] = useRecoilState(isErrorModalAtom);

  // const location = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0); // 스크롤 맨 위로 이동
  // }, [location]);

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
