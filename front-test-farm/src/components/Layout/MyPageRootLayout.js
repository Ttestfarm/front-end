import React from 'react';

import { Outlet } from 'react-router-dom';
import MyNavigation from './MyNavigation';

const MyPageRootLayout = () => {
  return (
    <>
      <MyNavigation />
      <Outlet />
    </>
  );
};

export default MyPageRootLayout;
