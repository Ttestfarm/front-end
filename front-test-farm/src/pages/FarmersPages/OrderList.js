import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style/QuotStatus.css';
import Pagination from './Pagination';
import axios from 'axios';

const OrderList = () => {
  const [ordList, setOrdList] = useState([]); 
  const farmerId = 1;
  const [type, setType] = useState("1"); // 1: 매칭, 2: 주문
  const page = 1;
  const [isOpen, setIsOpen] = useState(false);
  


  const onClickButton = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    axios.get(`http://localhost:8090/farmer/orderlist/${farmerId}/${type}/${page}`)
    .then(res => {
      setOrdList([...res.data.ordersList]);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  const changeType = (idx) => {
    if(idx === type) {
      alert("이미 선택");
    } else {
      console.log("here");
      setType(idx);
      let type = idx;
      let page = 1;
      axios.get(`http://localhost:8090/farmer/orderlist/${farmerId}/${type}/${page}`)
    .then(res => {
      setOrdList([...res.data.ordersList]);
    }).catch(err => {
      console.log(err);
    })
    }
  };

  return (
    <div className="quotation-status">
      <div className="quotation-status-header">
        <span>#배송 완료 된 견적서는 배송 현황에서 볼 수 있습니다!</span>
        <div className="dropdown">
          <button className="dropbtn">
          {type}
            </button>
          <div className="dropdown-content">
            <a href="#" key="1" onClick={() => changeType("1")}>매칭</a>
            <a href="#" key="2" onClick={() => changeType("2")}>주문</a>
          </div>
        </div>
      </div>
      <div className="quotation-list">
        <table>
          <tr>
            <th>&nbsp;</th>
            <th>주문번호</th>
            <th>농산물</th>
            <th>수량</th>
            <th>가격</th>
            <th>받는이</th>
            <th>연락처</th>
            <th>주소</th>
          </tr>
          {ordList.length > 0 &&
            ordList.map((ord) => {
              return (
                <tr key={ord.ordersId}>
                  <td>
                    <button className="quotation-delete-btn" onClick={onClickButton}>발송</button>
                    {isOpen && (

                      alert("hello")
                    )}
                  </td>
                  <td>
                    <Link to={`/orderdetail/${ord.ordersId}/${type}`}>
                      {ord.ordersId}
                    </Link>
                  </td>
                  <td>{ord.product}</td>
                  <td>{ord.quantity}kg</td>
                  <td>{ord.price}</td>
                  <td>{ord.name}</td>
                  <td>{ord.tel}</td>
                  <td>{ord.address}</td>
                </tr>
              );
            })}
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default OrderList;
