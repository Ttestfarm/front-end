import React from 'react';
import style from './MyPageRootLayout.module.css';
import { Outlet } from 'react-router-dom';
import MyNavigation from './MyNavigation';

const MyPageRootLayout = () => {
  return (
    <>
      <div className={style.myPageRoot}>
        <div className={style.myNavigation}>
          <MyNavigation />
        </div>
        <div className={style.myContent}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MyPageRootLayout;
