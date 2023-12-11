import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home/Home';
import RegistUserPage from './pages/Registration/RegistUser';
import LoginPage from './pages/Login/Login';

import FindEmailPage from './pages/FindEmail';
import FindPwPage from './pages/FindPw';
import ModifyUserPage from './pages/ModifyUser';
import RegFarmerPage from './pages/RegFarmer';
import RegistFarmerPage from './pages/Registration/RegistFarmer';
import ModifyFarmPage from './pages/ModifyFarm';
import { tokenLoader } from './util/auth';
import { action as logoutAction } from './pages/Logout';
import RequestList from './pages/FarmersPages/RequestList';
import QuotForm from './pages/FarmersPages/QuotForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'join',
        element: <RegistUserPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: '/find-email',
        element: <FindEmailPage />,
      },
      {
        path: '/find-pw',
        element: <FindPwPage />,
      },
      {
        path: '/modify-user',
        element: <ModifyUserPage />,
      },
      {
        path: '/reg-farmer',
        element: <RegistFarmerPage page="reg-farmer" />,
      },
      {
        path: '/modify-farm',
        element: <RegistFarmerPage page="modify-farm" />,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
      {
        path: '/requestlist',
        element: <RequestList />,
      },
      {
        path: '/quotform/:requestId/:requestProduct',
        element: <QuotForm />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
