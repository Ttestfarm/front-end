import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home/Home";
import RegistUserPage from "./pages/Registration/RegistUser";
import LoginPage from "./pages/Login/Login";

import RegistFarmerPage from "./pages/Registration/RegistFarmer";
//import { tokenLoader } from './util/auth';
import { action as logoutAction } from "./pages/Logout";

import MatchingListPage from "./pages/Matching/MatchingList";
import FindFarmerRootLayout from "./components/Layout/FindFarmerRootLayout";
import FindFarmerPage from "./pages/FindFarmers/FindFarmer";
import FarmerDetailPage from "./pages/FindFarmers/FarmerDetail";
//import { loader as farmerDetailLoader } from './pages/FindFarmers/FarmerDetail';

import MyPageRootLayout from "./components/Layout/MyPageRootLayout";
import ReqListPage from "./pages/MyPages/ReqList";
import ModifyUserPage from "./pages/MyPages/ModifyUser";
import BuyListPage from "./pages/MyPages/BuyList";
import FollowFarmerPage from "./pages/MyPages/FollowFarmer";
import OrderedProductPage from "./pages/MyPages/OrderedProduct";

import RequestList from "./pages/FarmersPages/RequestList";
import QuotForm from "./pages/FarmersPages/QuotForm";
import QuotStatus from "./pages/FarmersPages/QuotStatus";
import QuotDetail from "./pages/FarmersPages/QuotDetail";
import OrderList from "./pages/FarmersPages/OrderList";
import OrderDetail from "./pages/FarmersPages/OrderDetail";

import FarmerPageRootLayout from "./components/Layout/FarmerPageRootLayout";
import DeliveryList from "./pages/FarmersPages/DeliveryList";
import Invoice from "./pages/FarmersPages/Invoice";
import RequestForm from "./pages/Matching/RequestForm";
import Oauth from "./pages/Login/Oauth";
import FindEmailPage from "./pages/Login/FindEmail";
import FindPwPage from "./pages/Login/FindPw";
import ProductRegForm from "./pages/ProductRegistration/ProductRegForm";
import ProductRegiForm from "./pages/ProductRegistration/ProductRegiForm";
import ProductsForm from "./pages/ProductRegistration/ProductsForm";
import ModifyFarmerPage from "./pages/FarmersPages/ModifyFarmer";
import Pay from "./components/FarmersDetail/Pay";
import QuotePay from "./components/myPages/QuotePay";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    //loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/oauth/redirect/:stoken", element: <Oauth /> },
      { path: "join", element: <RegistUserPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "logout", action: logoutAction },
      { path: "find-email", element: <FindEmailPage /> },
      { path: "find-pw", element: <FindPwPage /> },
      { path: "pay", element: <Pay /> },
      { path: "quotepay", element: <QuotePay /> },
      {
        path: "matching",
        // element: <MatchingPage />,
        children: [
          { index: true, element: <MatchingListPage /> },
          { path: "requestform", element: <RequestForm /> },
        ],
      },
      {
        path: "findfarmer",
        element: <FindFarmerRootLayout />,
        children: [
          { index: true, element: <FindFarmerPage /> },
          { path: ':farmerId', element: <FarmerDetailPage /> },
          { path: ":farmerId", element: <FarmerDetailPage /> },
          {
            path: 'reg-farmer',
            element: <RegistFarmerPage page="reg-farmer" />,
          },
        ],
      },
      {
        path: "mypage",
        element: <MyPageRootLayout />,
        children: [
          { index: true, element: <ReqListPage /> },
          //{ path: ':reqId', element: <QuotDetailPage /> },
          { path: "modify-user", element: <ModifyUserPage /> },
          { path: "followlist", element: <FollowFarmerPage /> },
          {
            path: "buylist",
            element: <BuyListPage />,
            children: [
              {
                path: ":orderId",
                element: <OrderedProductPage />,
              },
            ],
          },
        ],
      },
      {
        path: "farmerpage",
        path: "farmerpage",
        element: <FarmerPageRootLayout />,
        children: [
          {
            index: true,
          },
          {
            path: "modify-farmer",
            element: <ModifyFarmerPage />,
          },
          {
            path: "requestlist",
            element: <RequestList />,
          },
          {
            path: "quotform/:requestId/:requestProduct/:requestQuantity",
            element: <QuotForm />,
          },
          {
            path: "quotstatus",
            element: <QuotStatus />,
          },
          {
            path: "quotdetail/:quotationId",
            element: <QuotDetail />,
          },
          {
            path: "orderlist",
            element: <OrderList />,
          },
          {
            path: "orderlist/orderdetail/:ordersId/:type",
            element: <OrderDetail />,
          },
          {
            path: "deliverylist",
            element: <DeliveryList />,
          },
          {
            path: "invoice",
            element: <Invoice />,
          },
          {
            path: "regproduct",
            element: <ProductsForm />,
          },
          // { // 파머 정보 수정
          //   path: 'modify-farmer',
          //   element: <
          // }
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
