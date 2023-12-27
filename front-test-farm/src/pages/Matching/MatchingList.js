import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { AnimatePresence } from 'framer-motion';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import style from './MatchingList.module.css';
import * as API from '../../api/index';
import axios from 'axios';
import MatchingCard from '../../components/matching/MatchingCard';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isErrorModalAtom, tokenAtom } from '../../recoil/Atoms';

const MatchingListPage = () => {
  const token = useRecoilValue(tokenAtom);
  const [, setIsErrorModal] = useRecoilState(isErrorModalAtom);

  const [matchingList, setMatchingList] = useState([]);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({
    average: 0,
    matchingProgress: 0,
    foundMatching: 0,
    pageInfo: {
      allPage: 0,
      curPage: 0,
      startPage: null,
      endPage: null,
    },
  });
  const [ref, inView] = useInView(); // 무한 스크롤
  const [btnView, setBtnView] = useState(false);

  const scrollRef = useRef(0);
  const navigate = useNavigate();

  //무한스크롤시 데이터 요청 고고
  const fetchData = async () => {
    try {
      if (info?.pageInfo?.curPage > info?.pageInfo?.allPage) return;
      const response = await axios.get(
        `${API.serverUrl}/matching?page=${page}`
      );
      const data = response.data;

      console.log('data', data);
      setInfo({
        average: data.average,
        matchingProgress: data.matchingProgress,
        foundMatching: data.foundMatching,
        pageInfo: { ...data.pageInfo },
      });

      setMatchingList([...matchingList, ...data.matchingList]);
      setPage((page) => page + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // fetchData();

  useEffect(() => {
    if (inView && info.pageInfo.curPage <= info.pageInfo.allPage) {
      console.log(inView, '무한스크롤 요청했시유');

      fetchData(page);
    }
  }, [inView]);

  //scroll to top
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

  const joinHandler = () => {
    if (token) {
      navigate('/matching/requestform');
    } else {
      setIsErrorModal({
        state: true,
        message: '먼저 로그인이 필요합니다.',
      });
      navigate('/login');
    }
  };

  return (
    <>
      <section className={style.header}>
        <p>예쁘지는 않지만, 맛과 품질은 보장하는</p>
        <p className={style.context}>못난이 농산물을 구매해 볼까요?</p>
        <p>필요하신 만큼만 주문하세요!</p>
        <p className={style.context}>공동구매처럼 기다릴 필요도 없습니다.</p>
        <p> 프리티 파머스가 여러분의 요청서를 확인 후 배송해 드립니다.</p>
        <button onClick={joinHandler}>매칭 요청서 작성하기</button>
      </section>
      <section className={style.infoBox}>
        <div>
          <p className={style.infoContent}>별점 평균</p>
          <p>{info.average}</p>
        </div>
        <div>
          <p className={style.infoContent}>매칭 중</p>
          <p>{info.matchingProgress}</p>
        </div>
        <div>
          <p className={style.infoContent}>매칭 완료</p>
          <p>{info.foundMatching}</p>
        </div>
      </section>
      <section className={style.ListBox}>
        {matchingList?.length > 0
          ? matchingList.map((item) => (
              <MatchingCard
                key={item.requestId}
                item={item}
              />
            ))
          : '매칭 리스트가 없습니다.'}
      </section>
      <div ref={ref}></div>
      <div className={style.upIcon}>
        <AnimatePresence>
          {btnView ? (
            <ArrowCircleUpIcon
              color="success"
              sx={{ fontSize: { lg: '50px' } }}
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{ opacity: 0, y: 50 }}
              onClick={scrollToTop}
            ></ArrowCircleUpIcon>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
};

export default MatchingListPage;
