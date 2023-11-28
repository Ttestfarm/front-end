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

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Header />
        <Routes>
          <Route path='/' element={<CompletePayment />} />
          <Route path='/uglyrequestlist' element={<Uglyrequestlist />} />
          <Route path='/qutoform' element={<QutoForm />} />
          <Route path='/quotstatus' element={<QuotStatus />} />
          <Route path='/quotdetail' element={<QuotDetail />} />
          <Route path='/completepayment' element={<CompletePayment />} />
          <Route path='/compleatepaymentdetail' element={<CompleatePaymentDetail />} />
          <Route path='/deliverylist' element={<DeliveryList />} />
          <Route path='/calculate' element={<Calculate />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
