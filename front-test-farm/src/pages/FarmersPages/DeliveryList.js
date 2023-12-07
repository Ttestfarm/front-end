import React from 'react';
import './DeliveryList.css';
import Pagination from './Pagination';

const DeliveryList = () => {
  // const deliveryList = [];
  const quotList = [
    {
      Quotation_number: 89822,
      product_name: '마늘쫑',
      quantity: 3,
      total_price: 30000,
      name: '김덕배',
      number: '010-9643-2948',
      address: ' 서울 금천구 가산디지털1로 70 ',
      state: '배송중',
    },
    {
      Quotation_number: 99823,
      product_name: '사과',
      quantity: 5,
      total_price: 60000,
      name: '나종로',
      number: '010-1234-2552',
      address: '서울 종로구 종로 1 교보생명빌딩 지하1층',
      state: '배송완료',
    },
  ];
  return (
    <div className="delivery-list">
      <div className="delivery-list-btns">
        <button className="btn1">배송중</button>
        <button className="btn2">배송완료</button>
      </div>
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
          {quotList.length != 0 &&
            quotList.map((quto) => {
              return (
                <tr key={quto.Quotation_number}>
                  <td>{quto.product_name}</td>
                  <td>{quto.quantity}kg</td>
                  <td>{quto.total_price}</td>
                  <td>{quto.name}</td>
                  <td>{quto.number}</td>
                  <td>{quto.state}</td>
                </tr>
              );
            })}
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default DeliveryList;
