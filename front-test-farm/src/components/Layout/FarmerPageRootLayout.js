import React from 'react';
import style from './PageRootLayout.module.css';
import { Outlet } from 'react-router-dom';
import FarmerNavigation from './FarmerNavigation';

const FarmerPageRootLayout = () => {
  return (
    <div className={style.PageRoot}>
      <div className={style.Navigation}>
        <FarmerNavigation />
      </div>
      <div className={style.Content}>
        <Outlet />
      </div>
    </div>
  );
};

export default FarmerPageRootLayout;
