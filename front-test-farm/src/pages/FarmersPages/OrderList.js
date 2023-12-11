import React from 'react';
import { Link } from 'react-router-dom';
import './style/QuotStatus.css';
import Pagination from './Pagination';

const OrderList = () => {
  // const [quotList, setQuotList] = useState([]);
  const quotList = [
    {
      Quotation_number: 89822,
      product_name: '마늘쫑',
      quantity: 3,
      total_price: 30000,
      name: '김덕배',
      number: '010-9643-2948',
      address: ' 서울 금천구 가산디지털1로 70 ',
    },
    {
      Quotation_number: 99823,
      product_name: '사과',
      quantity: 5,
      total_price: 60000,
      name: '나종로',
      number: '010-1234-2552',
      address: '서울 종로구 종로 1 교보생명빌딩 지하1층',
    },
  ];
  return (
    <div className="quotation-status">
      <div className="quotation-status-header">
        <button className="quotation-delete-btn">발송 완료</button>
        <span>#배송 완료 된 견적서는 배송 현황에서 볼 수 있습니다!</span>
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
          {quotList.length != 0 &&
            quotList.map((quto) => {
              return (
                <tr key={quto.Quotation_number}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <Link to={'/compleatepaymentdetail'}>
                      {quto.Quotation_number}
                    </Link>
                  </td>
                  <td>{quto.product_name}</td>
                  <td>{quto.quantity}kg</td>
                  <td>{quto.total_price}</td>
                  <td>{quto.name}</td>
                  <td>{quto.number}</td>
                  <td>{quto.address}</td>
                </tr>
              );
            })}
        </table>
      </div>
      <Pagination />
    </div>
  );
};

<<<<<<< HEAD:front-test-farm/src/pages/FarmersPages/OrderList.js
export default OrderList;
=======
export default CompletePayment;
>>>>>>> 75d9dc7054cda0add59e549d3186b07b2046aac4:front-test-farm/src/pages/FarmersPages/CompletePayment.js
