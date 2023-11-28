import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Fragment } from 'react';
import './App.css';
import Header from './components/Layout/Header';
import Uglyrequestlist from './pages/FarmersPages/UglyRequestList';
import QutoForm from './pages/FarmersPages/QutoForm';
import QuotStatus from './pages/FarmersPages/QuotStatus';
import QuotDetail from './pages/FarmersPages/QuotDetail';
import CompletePayment from './pages/FarmersPages/CompletePayment';
import CompleatePaymentDetail from './pages/FarmersPages/CompleatePaymentDetail';
import DeliveryList from './pages/FarmersPages/DeliveryList';
import Calculate from './pages/FarmersPages/Calculate';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import Login from './components/Layout/Login';
import FindPw from './components/Layout/FindPw';
import FindEmail from './components/Layout/FindEmail';
import Join from './components/Layout/Join';
import { tokenLoader } from './util/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> }
    ]
  }
])
function App() {
  return (
    // <BrowserRouter>
    //   <Fragment>
    //     <Header />
    //     <Routes>
    //       <Route path='/' element={<CompletePayment />} />
    //       <Route path='/uglyrequestlist' element={<Uglyrequestlist />} />
    //       <Route path='/qutoform' element={<QutoForm />} />
    //       <Route path='/quotstatus' element={<QuotStatus />} />
    //       <Route path='/quotdetail' element={<QuotDetail />} />
    //       <Route path='/completepayment' element={<CompletePayment />} />
    //       <Route path='/compleatepaymentdetail' element={<CompleatePaymentDetail />} />
    //       <Route path='/deliverylist' element={<DeliveryList />} />
    //       <Route path='/calculate' element={<Calculate />} />
    //     </Routes>
    //   </Fragment>
    // </BrowserRouter>
    <RouterProvider router={router} />
  );
}

export default App;
