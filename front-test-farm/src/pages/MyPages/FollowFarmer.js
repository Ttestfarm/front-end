import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import FarmerCard from '../../components/Farmers/FarmerCard';
import style from './FollowFarmer.module.css';
import * as API from '../../api/index';
import { AnimatePresence } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from '../../recoil/Atoms';

const FollowFarmerPage = () => {
  const [farmerList, setFarmerList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});

  const [ref, inView] = useInView(); // 무한 스크롤
  const [btnView, setBtnView] = useState(false);

  const scrollRef = useRef(0);
  //const setIsErrorModal = useSetRecoilState(isErrorModalAtom);

  const getFollowList = async (ppage) => {
    if (ppage > pageInfo.allPage) return;

    try {
      const response = await API.get(`/user/followlist/${ppage}`);

      setPageInfo(response.data.pageInfo);
      setFarmerList([...farmerList, ...response.data.farmerList]);

      setPage((page) => ppage + 1);

      console.log('요청!', response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (inView) {
      console.log(inView, '무한스크롤 요청했시유');

      getFollowList(page);
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
  //scroll to top 끝

  return (
    <>
      <div className={style['farmercardlist']}>
        {farmerList?.length > 0
          ? farmerList.map((farmer) => (
              <FarmerCard
                key={farmer.farmerId}
                farmer={farmer}
              />
            ))
          : '파머 목록이 없습니다.'}
      </div>

      <AnimatePresence>
        {btnView ? (
          <button
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{ opacity: 0, y: 50 }}
            onClick={scrollToTop}
          >
            꼭대기로올라가기버튼
          </button>
        ) : null}
      </AnimatePresence>
      <div ref={ref}></div>
    </>
  );
};

export default FollowFarmerPage;
