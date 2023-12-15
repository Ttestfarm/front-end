import React from 'react';

import { Outlet } from 'react-router-dom';
import FarmerNavigation from './FarmerNavigation';

const FarmerPageRootLayout = () => {
  return (
    <>
      <FarmerNavigation />
      <Outlet />
    </>
  );
};

export default FarmerPageRootLayout;
