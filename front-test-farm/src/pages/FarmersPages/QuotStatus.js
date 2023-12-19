import React, { useEffect, useState } from 'react';
import './style/QuotStatus.css';
import { Link, redirect } from 'react-router-dom';
import Pagination from './Pagination';
import axios from 'axios';


const QuotStatus = () => {
  const [quotList, setQuotList] = useState([]);
  const [farmerId, SetFarmerId] = useState(1);
  const [page, setPage] = useState(1);
  // 0 : 견적서 취소, 1 : 대기중, 2 : 기간 만료, 3 : 결제완료
  const [state, SetState] = useState(1);
  const [cancelList, setCancelList] = useState([]); // 견적서 취소 리스트

  const [token, setToken] = useState(null);

  const getToken = () => {
    return localStorage.getItem("token"); // 여기서 'your_token_key'는 실제로 사용하는 토큰의 키여야 합니다.
  };

  useEffect(() => {
    const farmerToken = getToken();
    setToken(farmerToken);
    axios.get(`http://localhost:8090/farmer/quotlist/${state}/${page}`, {
      headers: {
        Authorization: `${farmerToken}`
      },
    })
      .then((res) => {
        console.log(res);
        setQuotList([...res.data.quotList]);
        // setPage([...res.data.pageInfo]);
        console.log(res.data.quotList);
        // setQuotList([...res.data.reqList]);

      }).catch((err) => {
        console.log(err);
      });
  }, []);

  const changeState = (state) => {
    SetState(state);
    axios.get(`http://localhost:8090/farmer/quotlist/${state}/${page}`, {
      headers: {
        Authorization: `${token}`
      },
    })
      .then((res) => {
        setQuotList([...res.data.quotList]);
        // setPage([...res.data.pageInfo]);
        console.log(res.data.quotList);
        // setQuotList([...res.data.reqList]);
        setCancelList([]);
      }).catch((err) => {
        console.log(err);
      });
  };

  const addCancelList = (Id) => {
    const index = cancelList.indexOf(Id);
    if (index !== -1) {
      cancelList.splice(index, 1);
    } else {
      setCancelList([...cancelList, Id]);
    }
  }

  const cancelQuot = () => {
    try {
      const response = axios.post(`http://localhost:8090/farmer/quotdelete`, { "farmerId": farmerId, "ids": cancelList },
        { headers: { "Content-Type": `application/json` } })
      console.log("삭제 성공");
    } catch (err) {
      console.log(err);
      console.log("삭제 실패");
    }
  }

  return (
    <div className="quotation-status">
      <div className="quotation-status-header">
        <button className="quotation-delete-btn" onClick={cancelQuot}>견적서 취소</button>
        <span>
          #무분별한 견적서 취소는 서비스 이용에 패널티가 부여됩니다. 주의하세요!
        </span>
        <div className="dropdown">
          <button className="dropbtn">
            {state}
          </button>
          <div className="dropdown-content">
            <a href="#" key="0" onClick={() => changeState("0")}>견적서 취소</a>
            <a href="#" key="1" onClick={() => changeState("1")}>대기중</a>
            <a href="#" key="2" onClick={() => changeState("2")}>기간 만료</a>
            <a href="#" key="3" onClick={() => changeState("3")}>결제 완료</a>
          </div>
        </div>
      </div>
      <div className="quotation-list">
        <table>
          <tr>
            <th>&nbsp;</th>
            <th>견적서번호</th>
            <th>농산물</th>
            <th>수량</th>
            <th>가격</th>
            <th>주소</th>
            <th>상태</th>
          </tr>
          {quotList.length > 0 &&
            quotList.map(quot => (
              <tr key={quot.quotationId}>
                <td>
                  <input type="checkbox" onClick={() => addCancelList(quot.quotationId)} />
                </td>
                <td>
                  <Link to={`/quotdetail/${quot.quotationId}`}>{quot.quotationId}</Link>
                </td>
                <td>{quot.product}</td>
                <td>{quot.quantity}kg</td>
                <td>{quot.price}</td>
                <td>{quot.address}</td>
                <td>{quot.state}</td>
              </tr>
            )
            )}
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default QuotStatus;
