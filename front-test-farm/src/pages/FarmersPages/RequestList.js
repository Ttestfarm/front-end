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
  const [pageInfo, setPageInfo] = useState({
    allPage : null,
	  curPage : null,
	  startPage : null,
	  endPage : null
  });

  const [ref, inView] = useInView(); // 무한 스크롤
  const [btnView, setBtnView] = useState(false);

  const scrollRef = useRef(0);

  const effectFunc = async () => {
    try {
      console.log("맨 처음");
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

  useEffect(() => {
    if (inView && pageInfo.curPage <= pageInfo.allPage) {
      console.log(inView, '무한스크롤 요청했시유');

      //if (page > info.pageInfo.allPage) return;
      //패치 요청
      fetchData(selInt ,page);
    }
  }, [inView]);

  const changeInterest = async (interestOne) => {
    try {
      console.log(`관심 품목 변경 : ${interestOne} & ${page}`);
      const response = await API.get(`/farmer/requestlist?farmInterest=${interestOne}`, token);
      const data = response.data;
      setReqList(data.reqList);
      setPageInfo(data.pageInfo);
      setSelInt(interestOne);
      setPage((page) => 1);

      console.log(data.reqList);
      console.log(reqList);
      console.log(data.pageInfo);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const fetchData = async (interestOne, page) => {
    try {
      console.log(`${interestOne} 요청 & ${page}`);
      const response = await API.get(`/farmer/requestlist?farmInterest=${interestOne}&page=${page}`, token);
      const data = response.data;
      setReqList((prevReqList) => {
        return [...prevReqList, ...data.reqList];
    });

      setPageInfo(data.pageInfo);
      setSelInt(interestOne);
      console.log(data.reqList);
      console.log(data.pageInfo);
      console.log('page', page);

      setPage((page) => page + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener('scroll', handleScroll);
    }, 100);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > scrollRef.current) {
      setBtnView(true);
    } else {
      setBtnView(false);
    }
    scrollRef.current = window.scrollY;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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
              interestList !== null && interestList.map((interest) => (
                interest !== null && <a href="#" key={interest} onClick={() => changeInterest(interest)}>{interest}</a>
              ))
            }
          </div >
        </div >
      </div >
      <div>
        {reqList.length > 0
          ? reqList.map((reqItem) => (
            <FarmerReqCard
              key={`${reqItem.requestId}_${selInt}`}
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
      <div ref={ref}></div>
    </div >
  );
};

export default RequestList;