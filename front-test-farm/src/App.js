import { Fragment } from 'react';
import './App.css';
import Header from './components/Layout/Header';
import Login from './components/Layout/Login';
import FindPw from './components/Layout/FindPw';
import FindEmail from './components/Layout/FindEmail';
import Join from './components/Layout/Join';
import ModifyUser from './components/Layout/ModifyUser';
import RegFarmer from './components/Layout/RegFarmer';
import ModifyFarm from './components/Layout/ModifyFarm';

function App() {
  return (
    <Fragment>
      <Header />
      <Login />
      <Join />
      <ModifyUser />
      <FindEmail />
      <FindPw />
      <RegFarmer />
      <ModifyFarm />
    </Fragment>
  );
}

export default App;
