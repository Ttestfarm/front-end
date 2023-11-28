import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import JoinPage from './pages/Join';
import FindEmailPage from './pages/FindEmail';
import FindPwPage from './pages/FindPw';
import ModifyUserPage from './pages/ModifyUser';
import RegFarmerPage from './pages/RegFarmer';
import ModifyFarmPage from './pages/ModifyFarm';
import { tokenLoader } from './util/auth';

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
        path: '/login',
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/join',
        element: <JoinPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/find-email',
        element: <FindEmailPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/find-pw',
        element: <FindPwPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/modify-user',
        element: <ModifyUserPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/reg-farmer',
        element: <RegFarmerPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/modify-farm',
        element: <ModifyFarmPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
