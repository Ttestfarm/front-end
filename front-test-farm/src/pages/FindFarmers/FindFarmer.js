import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import FarmerCard from "../../components/Farmers/FarmerCard";
import style from "./FindFarmer.module.css";
import * as API from "../../api/index";
//import axios from 'axios';
import { useSetRecoilState } from "recoil";
import { isErrorModalAtom, tokenAtom } from "../../recoil/Atoms";
import { AnimatePresence } from "framer-motion";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

const FindFarmerPage = () => {
  //const token = useRecoilValue(tokenAtom);
  const [keyword, setKeyword] = useState("all");
  const [sortType, setSortType] = useState("latest");
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [farmerList, setFarmerList] = useState([]);
  const [ref, inView] = useInView(); // 무한 스크롤
  const [btnView, setBtnView] = useState(false);

  const scrollRef = useRef(0);

  //키워드 검색어 입력
  const keywordChangeHandler = (e) => {
    setKeyword(e.target.value);
  };

  //초기화
  const handleRefresh = () => {
    window.location.reload();
  };

  //무한스크롤로 리스트 패칭
  const listHandler = async (keyword, psortType, ppage) => {
    if (ppage > pageInfo.allPage) return;

    try {
      const response = await API.get(
        `/findfarmer?keyword=${keyword}&sortType=${psortType}&page=${ppage}`
      );

      console.log("res", response.data);
      setPageInfo(response.data.pageInfo);
      if (ppage === 1) {
        setFarmerList([...response.data.farmerList]);
      } else {
        setFarmerList([...farmerList, ...response.data.farmerList]);
      }

      setSortType(psortType);
      setPage((page) => ppage + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (inView) {
      console.log(inView, "무한스크롤 요청했시유");

      //패치 요청
      listHandler(keyword, sortType, page);
    }
  }, [inView]);

  //scroll to top
  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 100);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
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
      behavior: "smooth",
    });
  };

  return (
    <Fragment>
      <section className={style.wrapper}>
        <div className={style["sorts"]}>
          <button onClick={() => listHandler(keyword, "latest", 1)}>
            최신 순
          </button>
          {" | "}
          <button onClick={() => listHandler(keyword, "rating", 1)}>
            별점 순
          </button>
          {" | "}
          <button onClick={() => listHandler(keyword, "followCount", 1)}>
            찜이 많은 순
          </button>
        </div>
        <div className={style.search}>
          <input
            type="text"
            value={keyword}
            onChange={keywordChangeHandler}
            placeholder="품목명을 입력하세요"
          />
          <button
            className={style["button"]}
            onClick={() => listHandler(keyword, sortType, 1)}
          >
            검색
          </button>
          <button
            className={style["button"]}
            // onClick={() => listHandler('all', 'latest', 1)}
            onClick={handleRefresh}
          >
            초기화
          </button>
        </div>

        <div>
          <button className={style.regBtn}>
            <Link to="reg-farmer">파머 등록</Link>
          </button>
        </div>
      </section>

      <div className={style["farmercardlist"]}>
        {farmerList?.length > 0
          ? farmerList.map((farmer) => (
              <FarmerCard key={farmer.farmerId} farmer={farmer} />
            ))
          : "파머 목록이 없습니다."}
      </div>

      <AnimatePresence>
        {btnView ? (
          <ArrowCircleUpIcon
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
      <div ref={ref}></div>
    </Fragment>
  );
};

export default FindFarmerPage;
