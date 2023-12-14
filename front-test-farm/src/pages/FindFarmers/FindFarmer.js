import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FarmerCard from "../../components/Farmers/FarmerCard";
import style from "./FindFarmer.module.css";
import * as API from "../../api/index";
import { useSetRecoilState } from "recoil";
import { isErrorModalAtom } from "../../recoil/Atoms";

const FindFarmerPage = ({ farmers }) => {
  const [keyword, setKeyword] = useState("all");
  const [sortType, setSortType] = useState("latest");
  const [page, setPage] = useState(1);
  const [farmerList, setFarmerList] = useState([]);

  const setIsErrorModal = useSetRecoilState(isErrorModalAtom);

  //파머 리스트 불러오기
  useEffect(() => {
    paramsChangeHandler(keyword, sortType, page);
  }, []);

  //페이징
  const onChangePage = (_, value) => {
    setPage(value);
  };

  //키워드 검색어 입력
  const keywordChangeHandler = (e) => {
    setKeyword(e.target.value);
  };

  //초기화
  const keywordResetHandler = async () => {
    setKeyword("all");
    try {
      const response = await API.get(
        "/findfarmer?keyword=all&sortType=latest&page=1"
      );
      setFarmerList(response.data.farmerList);
    } catch (error) {
      console.log(error);
    }
  };

  //params 별로 정렬
  const paramsChangeHandler = async (keyword, sortType, page) => {
    try {
      const response = await API.get(
        `/findfarmer?keyword=${keyword}&sortType=${sortType}&page=${page}`
      );

      setSortType(sortType);
      setFarmerList(response.data.farmerList);
    } catch (error) {
      setIsErrorModal({
        state: true,
        message: error.message,
      });
    }
  };

  return (
    <Fragment>
      <section className={style.wrapper}>
        <div className={style["sorts"]}>
          <button onClick={() => paramsChangeHandler(keyword, "latest", page)}>
            최신 순
          </button>
          {" | "}
          <button onClick={() => paramsChangeHandler(keyword, "rating", page)}>
            별점 순
          </button>
          {" | "}
          <button
            onClick={() => paramsChangeHandler(keyword, "followCount", page)}
          >
            찜이 많은 순
          </button>
        </div>
        <div className={style.search}>
          <input
            type="text"
            className={style["input-text"]}
            value={keyword}
            onChange={keywordChangeHandler}
            placeholder="품목명을 입력하세요"
          />

          <button
            className={style["button"]}
            onClick={() => paramsChangeHandler(keyword, sortType, page)}
          >
            검색
          </button>
          <button className={style["button"]} onClick={keywordResetHandler}>
            초기화
          </button>
        </div>

        <div>
          <button>
            <Link to="reg-farmer">파머 등록</Link>
          </button>
        </div>
      </section>
      {/* {groupedCards.map((group, index) => (
        key={index}
        className={style.farmercardgrid}
      > */}
      <div className={style["farmercardlist"]}>
        {farmerList?.length > 0
          ? farmerList.map((farmer) => (
              <FarmerCard key={farmer.farmerId} farmer={farmer} />
            ))
          : "파머 목록이 없습니다."}
      </div>
    </Fragment>
  );
};

export default FindFarmerPage;
