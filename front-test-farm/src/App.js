import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home/Home';
import RegistUserPage from './pages/Registration/RegistUser';
import LoginPage from './pages/Login/Login';

import RegistFarmerPage from './pages/Registration/RegistFarmer';
import { tokenLoader } from './util/auth';
import { action as logoutAction } from './pages/Logout';

import FindFarmerRootLayout from './components/Layout/FindFarmerRootLayout';
import FindFarmerPage from './pages/FindFarmers/FindFarmer';
import FarmerDetailPage from './pages/FindFarmers/FarmerDetail';
//import { loader as farmerDetailLoader } from './pages/FindFarmers/FarmerDetail';

import MyPageRootLayout from './components/Layout/MyPageRootLayout';
import QuotListPage from './pages/MyPages/QuotList';
import ModifyUserPage from './pages/MyPages/ModifyUser';
import FollowFarmerPage from './pages/MyPages/FollowFarmer';
import BuylistPage from './pages/MyPages/Buylist';
import OrderedProductPage from './pages/MyPages/OrderedProduct';

import FarmerPageRootLayout from './components/Layout/FarmerPageRootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'join', element: <RegistUserPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'logout', action: logoutAction },
      {
        path: 'findfarmer',
        element: <FindFarmerRootLayout />,
        children: [
          {
            index: true,
            element: <FindFarmerPage />,
          },
          {
            path: ':farmerId',
            element: <FarmerDetailPage />,
            // id: 'farmer-detail',
            // loader: farmerDetailLoader,
            // children: [{ index: true, element: <FarmerDetailPage /> }],
          },
          {
            path: 'reg-farmer',
            element: <RegistFarmerPage page="reg-farmer" />,
          },
        ],
      },
      {
        path: 'mypage',
        element: <MyPageRootLayout />,
        children: [
          { index: true, element: <QuotListPage /> },
          //{ path: ':reqId', element: <QuotDetailPage /> },
          { path: 'modify-user', element: <ModifyUserPage /> },
          { path: 'followlist', element: <FollowFarmerPage /> },
          {
            path: 'buylist',
            element: <BuylistPage />,
            children: [
              {
                path: ':orderId',
                element: <OrderedProductPage />,
              },
            ],
          },
        ],
      },
      {
        path: 'farmerpage',
        element: <FarmerPageRootLayout />,
        children: [
          {
            index: true,
            element: <FindFarmerPage />,
          },
        ],
      },
      // {
      //   path: '/find-email',
      //   element: <FindEmailPage />,
      // },
      // {
      //   path: '/find-pw',
      //   element: <FindPwPage />,
      // },
      // {
      //   path: '/modify-user',
      //   element: <ModifyUserPage />,
      // },
      {
        path: '/modify-farm',
        element: <RegistFarmerPage page="modify-farm" />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
