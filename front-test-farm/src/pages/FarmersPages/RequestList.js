import React, { useEffect, useState } from 'react';
import './style/RequestList.css';
import { Link } from 'react-router-dom';
import axios from "axios";

const RequestList = () => {
  const [reqList, setReqList] = useState([]);
  const [test, setTest] = useState({});
  // const [intProduct, setIntProduct] = useState(); // farmer InterestProduct1 값이 기본값으로 저장
  const intProduct = '당근';

  useEffect(() => {
    axios
      .get(`http://localhost:8090/farmer/requestlist`, { params: { farmerId: 1, farmInterest: '당근'} })
      .then((res) => {
        console.log(res.data);
        setReqList([...res.data]);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='container'>
      <div className="content-header">
        <div className='warning-text'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
            <ellipse cx="10.2691" cy="10.5273" rx="9.72222" ry="10" fill="#49680D" />
            <text x="50%" y="50%" textAnchor='middle' dy=".3em" fill="#fff" fontSize="12">
              !
            </text>
          </svg>
          <span>
            &nbsp;파머님이 판매가능한 품목 중 매칭을 기다리는 요청이 있어요!
          </span>
        </div>
        <div className="dropdown">
          <button className="dropbtn">관심 품목</button>
          <div className="dropdown-content">
            <a href="#">관심품목1</a>
            <a href="#">관심품목2</a>
            <a href="#">관심품목3</a>
            <a href="#">관심품목4</a>
            <a href="#">관심품목5</a>
          </div>
        </div>
      </div>
      {reqList !== null ? reqList.map((req) =>
        <div className='request-box' key={req.requestId}>
          <div className='request-content'>
            <p>{req.name} <span>님</span></p>
            <p>요청한 품목 : {req.requestProduct}</p>
            <p>요청한 수량 혹은 kg : {req.requestQuantity}kg</p>
            <p>배송지 : {req.address}</p>
          </div>
          <div className='request-btn'>
            <button><Link className='a' to={`/quotform/${req.requestId}`}>견적 보내기</Link></button>
            <p>요청서 번호 : {req.requestId}</p>
          </div>
        </div>
      ) :
        <div className='request-box'>
          <span>none list</span>
        </div>

      }

    </div >
  );
};

export default RequestList;