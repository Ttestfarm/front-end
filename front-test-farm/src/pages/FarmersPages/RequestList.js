import React, { useState } from 'react';
import './style/RequestList.css';
import { Link } from 'react-router-dom';

const RequestList = () => {
  // const [ReqList, setReqList] = useState({});
  const ReqList = [
    {
      reqNum: '23332',
      name: '명수사랑',
      product: '마늘쫑',
      amount: 3,
      address: '서울 가산구 가산동',
    },
    {
      reqNum: '23333',
      name: '사랑명수',
      product: '사과',
      amount: 5,
      address: '서울 은평구 띵땡동',
    },
  ];

  const SendQ = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="container">
      <div className="warning-text">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
        >
          <ellipse
            cx="10.2691"
            cy="10.5273"
            rx="9.72222"
            ry="10"
            fill="#49680D"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            fill="#fff"
            fontSize="12"
          >
            !
          </text>
        </svg>
        <span>
          &nbsp;파머님이 판매가능한 품목 중 매칭을 기다리는 요청이 있어요!
        </span>
      </div>
      {ReqList !== null ? (
        ReqList.map((req) => (
          <div
            className="request-box"
            key={req.reqNum}
          >
            <div className="request-content">
              <p>
                {req.name} <span>님</span>
              </p>
              <p>요청한 품목 : {req.product}</p>
              <p>요청한 수량 혹은 kg : {req.amount}kg</p>
              <p>배송지 : {req.address}</p>
            </div>
            <div className="request-btn">
              <button>
                <Link
                  className="a"
                  to={'/qutoform'}
                >
                  견적 보내기
                </Link>
              </button>
              <p>요청서 번호 : {req.reqNum}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="request-box">
          <span>none list</span>
        </div>
      )}
    </div>
  );
};

export default RequestList;
