import React from 'react';
import style from './PageRootLayout.module.css';
import { Outlet } from 'react-router-dom';
import MyNavigation from './MyNavigation';

const MyPageRootLayout = () => {
  return (
    <div className={style.PageRoot}>
      <div className={style.Navigation}>
        <MyNavigation />
      </div>
      <div className={style.Content}>
        <Outlet />
      </div>
    </div>
  );
};

export default MyPageRootLayout;
