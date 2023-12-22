import React, { useEffect, useState } from 'react';
import './style/DeliveryList.css';
import Pagination from './Pagination';
import { tokenAtom } from '../../recoil/Atoms'; //리코일 
import { useRecoilValue } from 'recoil'; // 리코일
import * as API from '../../api/index';

const DeliveryList = () => {
  const token = useRecoilValue(tokenAtom); //리코일

  const [deliveryList, setDeliveryList] = useState([]);
  const [page, setPage] = useState(0);
  const [state, setState] = useState("SHIPPING"); // 0:오류, 1:배송중, 2:배송완료

  useEffect( async () => {
    try {
      const response = await API.get(`/farmer/deliverylist/${state}/${page}`, token);
      const data = response.data;
      setDeliveryList([...data.deliveryList]);
      setPage(data.pageInfo);
    } catch(error) {
      console.error('Error fetching data:', error);
    }       
  }, []);

  const changeState = async (select) => {
    try {
      setState(select);
      if (state === select) {
        alert("이미 선택 하셨습니다.");
      } else {
        const response = await API.get(`/farmer/deliverylist/${select}/${page.curPage}`, token);
        const data = response.data;
        setDeliveryList([...data.deliveryList]);
        setPage(data.pageInfo);
      } 
    } catch(error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="delivery-list">
      <div className="delivery-list-btns">
        <button className="btn1" onClick={() => changeState("SHIPPING")}>배송중</button>
        <button className="btn2" onClick={() => changeState("COMPLETED")}>배송완료</button>
      </div >
      <div className="quotation-list">
        <table>
          <tr>
            <th>주문번호</th>
            <th>품목</th>
            <th>수량</th>
            <th>가격</th>
            <th>주소</th>
            <th>상태</th>
          </tr>
          {deliveryList.length > 0 ? deliveryList.map(dlist => (
            <tr key={dlist.deliveryId}>
              <td>{dlist.ordersId}</td>
              <td>{dlist.product}</td>
              <td>{dlist.quantity}</td>
              {/* <td>{dlist.tinvoice}</td> */}
              <td>{dlist.price}</td>
              <td>{dlist.address}</td>
              <td>{dlist.deliveryState}</td>
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
