import React from 'react';
import './style/OrderDetail.css';
import { Link } from 'react-router-dom';

const OrderDetail = () => {
  const quot = {
    Quotation_number: 89822,
    product_name: '마늘쫑',
    quantity: 3,
    total_price: 30000,
    request_name: '김덕배',
    request_number: '010-9643-2948',
    request_address: ' 서울 금천구 가산디지털1로 70 ',
    state: '결제완료',
    date: '2023.11.21',
    request_comment: '문앞에놓아주세요',
  };

  return (
    <div className="compleate-detail-form">
      <div className="compleate-detail-form-header">
        <h2>주문번호 {quot.Quotation_number}</h2>
        <span>
          {quot.state} {quot.date}
        </span>
      </div>
      <hr />
      <div className="info">
        <h3>배송정보</h3>
        <p>
          <span>수령인</span>
          <span>{quot.request_name}</span>
        </p>
        <p>
          <span>연락처</span>
          <span>{quot.request_number}</span>
        </p>
        <p>
          <span>배송주소</span>
          <span>{quot.request_address}</span>
        </p>
      </div>
      <hr />
      <div className="info">
        <h3>배송메모</h3>
        <p>
          <span>수령장소</span>
          <span>{quot.request_comment}</span>
        </p>
      </div>
      <hr />
      <div className="info">
        <h3>결제정보</h3>
        <p>
          <span>결제수단</span>
          <span>{}</span>
        </p>
        <p>
          <span>상품금액</span>
          <span>{}</span>
        </p>
        <p>
          <span>배송비</span>
          <span>{}</span>
        </p>
        <p>
          <h3>총 결제금액</h3>
          <span>{}</span>
        </p>
      </div>
      <hr />
      <div className="compleate-detail-form-btns">
        <button className="compleate-detail-form-btn">
          <Link to={'/completepayment'}>목록으로</Link>
        </button>
        <button className="compleate-detail-form-btn">판매 취소</button>
      </div>
      <div className="compleate-detail-form-notice">
        <span>
          # 무분별한 판매 취소는 서비스 이용에 페널티가 부여됩니다. 주의하세요!
        </span>
      </div>
    </div>
  );
};

<<<<<<< HEAD:front-test-farm/src/pages/FarmersPages/OrderDetail.js
export default OrderDetail;
=======
export default CompleatePaymentDetail;
>>>>>>> 75d9dc7054cda0add59e549d3186b07b2046aac4:front-test-farm/src/pages/FarmersPages/CompleatePaymentDetail.js
