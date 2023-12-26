import React, { useEffect, useRef, useState } from 'react';
import './style/RequestList.css';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { tokenAtom } from '../../recoil/Atoms'; //리코일 
import { useRecoilValue } from 'recoil'; // 리코일
import * as API from '../../api/index';
import FarmerReqCard from '../../components/Farmers/FarmerReqCard';
import axios from 'axios';

const RequestList = () => {
  const token = useRecoilValue(tokenAtom); //리코일

  const [interestList, setInterestList] = useState([]);
  const [reqList, setReqList] = useState([]);
  const [selInt, setSelInt] = useState();
  const [page, setPage] = useState(1);

  const [ref, inView] = useInView(); // 무한 스크롤
  const [btnView, setBtnView] = useState(false);

  const effectFunc = async () => {
    try {
      const response = await API.get(`/farmer/farmInterest`, token);
      const data = response.data;
      // console.log(data.reqList.length);
      setInterestList([...data.interestList]);
      setSelInt(data.interestList[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    effectFunc();
  }, []);

  const changeInterest = async (interestOne) => {
    try {
      const response = await API.get(`/farmer/requestlist?farmInterest=${interestOne}`, token);
      const data = response.data;
      setReqList([...data.reqList]);
      setPage(data.pageInfo);
      setSelInt(interestOne);
    } catch (error) {
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
          <button className="dropbtn">관심 품목 : <span>{selInt}</span></button>
          <div className="dropdown-content">
            {
              interestList !== null && interestList.map((interest, idx) => (
                interest !== null && <a href="#" key={idx} onClick={() => changeInterest(interest)}>{interest}</a>
              ))
            }
          </div >
        </div >
      </div >
      <div>
        {reqList.length > 0
          ? reqList.map((reqItem) => (
            < FarmerReqCard
              key={reqItem.requestId}
              req={reqItem}
            />
          )) :
          <div>
            <p
              className='noneList'
            >
              {selInt}의 요청서가 없습니다.
            </p>
          </div>
        }
      </div>
    </div >
  );
};

export default RequestList;