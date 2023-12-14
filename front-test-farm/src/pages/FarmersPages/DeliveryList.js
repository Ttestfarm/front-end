import React, { useEffect, useState } from 'react';
import './style/DeliveryList.css';
import Pagination from './Pagination';
import axios from 'axios';

const DeliveryList = () => {
  const [deliveryList, setDeliveryList] = useState([]);
  const [page, setPage] = useState(1);
  const [state, setState] = useState("1"); // 0:오류, 1:배송중, 2:배송완료

  const getToken = () => {
    return localStorage.getItem("token"); // 여기서 'your_token_key'는 실제로 사용하는 토큰의 키여야 합니다.
  };

  useEffect(() => {
    axios.get(`http://localhost:8090/farmer/deliverylist/${state}/${page}`, {
      headers: {
        Authorization: `${getToken()}`
      },
    })
      .then(res => {
        console.log(res);
        setDeliveryList([...res.data.deliveryList]);
        console.log(res.data.deliveryList);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const changeState = (select) => {
    if (state === select) {
      alert("이미 선택 하셨습니다.");
    } else {
      setState(select);
      // axios.get(`http://localhost:8090/farmer/deliverylist/${state}/${page})
    }
  }

  return (
    <div className="delivery-list">
      <div className="delivery-list-btns">
        <button className="btn1" onClick={() => changeState("1")}>배송중</button>
        <button className="btn2" onClick={() => changeState("2")}>배송완료</button>
      </div >
      <div className="quotation-list">
        <table>
          <tr>
            <th>주문번호</th>
            <th>택배사</th>
            <th>송장번호</th>
            <th>품목</th>
            <th>번호</th>
            <th>상태</th>
          </tr>
          {deliveryList.length > 0 ? deliveryList.map(dlist => (
            <tr>
              <td></td>
            </tr>
          ))
            : "배송 리스트가 없습니다."
          }

        </table>
      </div>
      <Pagination />
    </div >
  );
};

export default DeliveryList;
