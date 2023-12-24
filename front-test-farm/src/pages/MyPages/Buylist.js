import React, { useState, useEffect, useRef } from 'react';
import style from './BuyList.module.css';
import BuyCard from '../../components/myPages/BuyCard';
import * as API from '../../api/index';
import { useInView } from 'react-intersection-observer';
import { AnimatePresence } from 'framer-motion';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import { useRecoilValue } from 'recoil';
import { tokenAtom } from '../../recoil/Atoms';

const BuyListPage = () => {
  const token = useRecoilValue(tokenAtom);
  const [buyList, setBuyList] = useState([]);
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

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await API.get('/user/buylist', token);
  //     console.log(response);
  //   }
  //   fetchData();
  // }, [buyList]);

  //무한스크롤시 데이터 요청 고고
  const fetchData = async () => {
    try {
      console.log('page', page);

      const response = await API.get('/user/buylist', token);
      const data = response.data;

      console.log('data', data);
      setInfo({
        average: data.average,
        matchingProgress: data.matchingProgress,
        foundMatching: data.foundMatching,
        pageInfo: { ...data.pageInfo },
      });

      console.log('1', response.data);
      setBuyList([...buyList, ...data.buyList]);
      setPage((page) => page + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (inView) {
      console.log(inView, '무한스크롤 요청했시유');

      //if (page > info.pageInfo.allPage) return;
      //패치 요청
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
  return (
    <>
      <nav className={style.nav}>
        <ul className={style.list}>
          <li>
            <button className={style.allBtn}>전체</button>
          </li>
          <li>
            <button className={style.yellowBtn}>결제완료</button>
          </li>
          <li>
            <button className={style.yellowBtn}>결제취소</button>
          </li>
          <li>
            <button className={style.yellowBtn}>배송중</button>
          </li>
          <li>
            <button className={style.endBtn}>배송완료</button>
          </li>
        </ul>
      </nav>

      <section>
        {buyList.length > 0
          ? buyList.map((buyItem) => (
            <BuyCard
              key={buyItem.orders.ordersId}
              buyItem={buyItem}
            />
          ))
          : ` 아직은 구매내역이 없습니다. 
          요청서를 작성하거나 못난이 농산물을 구매할 수 있어요! `}
      </section>
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
      <div ref={ref}></div>
    </>
  );
};

export default BuyListPage;
