import React from 'react';
import style from './FarmerPageRootLayout.module.css';
import { Outlet } from 'react-router-dom';
import FarmerNavigation from './FarmerNavigation';

const FarmerPageRootLayout = () => {
  return (
    <div className={style.fRoot}>
      <div className={style.fNavigation}>
        <FarmerNavigation />
      </div>
      <div className={style.fContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default FarmerPageRootLayout;
