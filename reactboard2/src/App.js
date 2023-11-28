import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Routes, Route} from 'react-router-dom';
import Main from './component/Main';
import BoardList from './component/BoardList';
import WriteForm from './component/WriteForm';
import DetailForm from './component/DetailForm';
import ModifyForm from './component/ModifyForm';
import Login from './component/Login';
import Join from './component/Join';

function App() {
  return (
    <div>
        <Main/>
        <Routes>
          <Route exect path="/" element={<Login/>}/>
          <Route exect path="/join" element={<Join/>}/>
          <Route exect path="/list" element={<BoardList/>}/>
          <Route exect path="/writeform" element={<WriteForm/>}/>
          <Route exect path="/detailform/:num" element={<DetailForm/>}/>
          <Route exect path="/modifyform/:num" element={<ModifyForm/>}/>
        </Routes>
    </div>
  );
}

export default App;
