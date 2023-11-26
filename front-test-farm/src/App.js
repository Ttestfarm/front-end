import { Fragment } from 'react';
import './App.css';
import Header from './components/Layout/Header';
import Login from './components/Layout/Login';
import FindPw from './components/Layout/FindPw';
import FindEmail from './components/Layout/FindEmail';
import Join from './components/Layout/Join';

function App() {
  return (
    <Fragment>
      <Header />
      {/* <Login /> */}
      <Join />
      {/* <FindPw /> */}
      {/* <FindEmail /> */}
    </Fragment>
  );
}

export default App;
