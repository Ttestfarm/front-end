import React, { useState } from 'react';
import './style/QuotStatus.css';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const QuotStatus = () => {
  // const [quotList, setQuotList] = useState([]);
  const quotList = [{
    'Quotation_number': 12345,
    'product_name': '마늘쫑',
    'quantity': 3,
    'total_price': 30000,
    'address': ' 서울 가산구 가산동',
    'Quotation_status': '대기중'
  }, {
    'Quotation_number': 12346,
    'product_name': '사과',
    'quantity': 5,
    'total_price': 60000,
    'address': ' 대전 대덕구 대덕로',
    'Quotation_status': '대기중'
  }];

  return (
    <div className='quotation-status'>
      <div className='quotation-status-header'>
        <button className='quotation-delete-btn'>견적서 취소</button>
        <span>#무분별한 견적서 취소는 서비스 이용에 패널티가 부여됩니다. 주의하세요!</span>
      </div>
      <div className='quotation-list'>
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
          {quotList.length != 0 && quotList.map(quto => {
            return (
              <tr key={quto.Quotation_number}>
                <td><input type='checkbox' /></td>
                <td><Link to={'/quotdetail'}>{quto.Quotation_number}</Link></td>
                <td>{quto.product_name}</td>
                <td>{quto.quantity}kg</td>
                <td>{quto.total_price}</td>
                <td>{quto.address}</td>
                <td>{quto.Quotation_status}</td>
              </tr>
            )
          })}
        </table>
      </div>
      <Pagination />
    </div >
  );
};

export default QuotStatus;