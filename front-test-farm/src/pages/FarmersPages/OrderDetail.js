import React, { useEffect, useState } from 'react';
import './style/OrderDeatil.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetail = () => {
  const [ord, setOrd] = useState({});
  const farmerId = 1;
  const { ordersId, type } = useParams();
  const [isModalOpen, setModalOpen] = useState(false); // 판매 취소 Modal
  const [cancelText, setCancelText] = useState();

  useEffect(() => {
    axios.get(`http://localhost:8090/farmer/orderdetail/${farmerId}/${ordersId}/${type}`)
      .then(res => {
        setOrd(res.data);
      }).catch((err) => {
        console.log(err);
      })
  }, []);

  const changeCancelText = () => {
    setCancelText();
  }

  const openModal = () => {
    setModalOpen(true);
    // document.getElementById("myModal").style.display = "block";
  };

  const closeModal = () => {
    setModalOpen(false);
    // document.getElementById("myModal").style.display = "none";
  };

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="compleate-detail-form">
      <div className="compleate-detail-form-header">
        <h2>주문번호 {ord.ordersId}</h2>
        <span>
          {ord.paymentState === "1" ? "결제완료" : "결제취소"} {ord.date}
        </span>
      </div>
      <hr />
      <div className="info">
        <h3>배송정보</h3>
        <p>
          <span>수령인</span>
          <span>{ord.name}</span>
        </p>
        <p>
          <span>연락처</span>
          <span>{ord.tel}</span>
        </p>
        <p>
          <span>배송주소</span>
          <span>{ord.address}</span>
        </p>
        <p>
          <span>품목</span>
          <span>{ord.product}</span>
        </p>
        <p>
          <span>수량</span>
          <span>{ord.quantity}kg</span>
        </p>
      </div>
      <hr />
      <div className="info">
        <h3>배송메모</h3>
        <p>
          <span>수령장소</span>
          <span>{ }</span>
        </p>
      </div>
      <hr />
      <div className="info">
        <h3>결제정보</h3>
        <p>
          <span>결제수단</span>
          <span>{ord.paymentBank}</span>
        </p>
        <p>
          <span>상품금액</span>
          <span>{ord.price}</span>
        </p>
        <p>
          <span>배송비</span>
          <span>{ord.delivery === 0 ? "무료" : ord.delivery}</span>
        </p>
        <p>
          <h3>총 결제금액</h3>
          <span>{ord.paymentPrice}</span>
        </p>
      </div>
      <hr />
      <div className="compleate-detail-form-btns">
        <button className="compleate-detail-form-btn">
          <Link to={'/orderList'}>목록으로</Link>
        </button>
        <button className="compleate-detail-form-btn" id="myBtn" onClick={openModal}>판매 취소</button>

        {isModalOpen && (
          <div id="myModal" className="modal" onClick={handleOutsideClick}>
            {/* 모달 내용 */}
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <h2>판매 취소</h2>
              취소 사유 :
              <input type='text' />
              <div>
                {/* <button onClick={handleOutsideClick}>닫기</button> */}
                <button>확인</button>
              </div>
            </div>
          </div>
        )}

      </div>
      <div className="compleate-detail-form-notice">
        <span>
          # 무분별한 판매 취소는 서비스 이용에 페널티가 부여됩니다. 주의하세요!
        </span>
      </div>
    </div>
  );
};

export default OrderDetail;
