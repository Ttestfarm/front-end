import React, { useEffect, useState } from 'react';
import './style/RequestList.css';
import { Link } from 'react-router-dom';
import { tokenAtom } from '../../recoil/Atoms'; //리코일 
import { useRecoilValue } from 'recoil'; // 리코일
import * as API from '../../api/index';

const RequestList = () => {
  const token = useRecoilValue(tokenAtom); //리코일
  const [test, setTest] = useState({});
  // const [intProduct, setIntProduct] = useState(); // farmer InterestProduct1 값이 기본값으로 저장
  const [interestList, setInterestList] = useState([]);
  const [reqList, setReqList] = useState([]);
  const [selInt, setSelInt] = useState();

  useEffect(async () => {
    try {
      const response = await API.get(`/farmer/farmInterest`, token);
      const data = response.data;
      console.log(data);
      setReqList([...data.reqList]);
      setInterestList([...data.interestList]);
      setSelInt(...data.interestList[0]);
    } catch(error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  const changeInterest = async (interestOne) => {
    try {
      const response = await API.get(`/farmer/requestlist?farmInterest=${interestOne}`, token);
      const data = response.data;
      setReqList([...data]);
      setSelInt(interestOne);
    } catch(error) {
      console.error('Error fetching data:', error);
    }
  }
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
          <button className="dropbtn">{selInt}</button>
          <div className="dropdown-content">
            {
              interestList !== null && interestList.map((interest, idx) =>
                <a href="#" key={idx} onClick={() => changeInterest(interest)}>{interest == null ? "없음" : interest}</a>
              )
            }
          </div >
        </div >
      </div >
      {reqList.length !== 0 ? reqList.map((req) =>
        <div className='request-box' key={req.requestId}>
          <div className='request-content'>
            <p>{req.name} <span>님</span></p>
            <p>요청한 품목 : {req.requestProduct}</p>
            <p>요청한 수량 혹은 kg : {req.requestQuantity}kg</p>
            <p>배송지 : {req.address}</p>
          </div>
          <div className='request-btn'>
            <button><Link className='a' to={`/farmerpage/quotform/${req.requestId}/${req.requestProduct}/${req.requestQuantity}`}>견적 보내기</Link></button>
            <p>요청서 번호 : {req.requestId}</p>
          </div>
        </div>
      ) :
        <div>
          <p>{selInt}의 요청서가 없습니다.</p>
        </div>
      }
    </div >
  );
};

export default RequestList;