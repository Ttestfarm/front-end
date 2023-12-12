import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FarmerCard from '../../components/Farmers/FarmerCard';
import style from './FarmersList.module.css';
import * as API from '../../api/index';
import { useSetRecoilState } from 'recoil';
import { isErrorModalAtom } from '../../recoil/Atoms';

import axios from 'axios';

const FindFarmerPage = ({ farmers, location }) => {
  const [keyword, setKeyword] = useState('all');
  const [sortType, setSortType] = useState('latest');
  const [page, setPage] = useState(1);
  const [farmerList, setFarmerList] = useState([]);

  const setIsErrorModal = useSetRecoilState(isErrorModalAtom);

  //파머 리스트 불러오기
  useEffect(() => {
    const getFarmerList = async () => {
      const response = await API.get(
        `/findfarmer?keyword=${keyword}&sortType=${sortType}&page=${page}`
      );

      console.log('123', response?.data?.farmerList);
      //setFarmerList([...farmerList, ...response.data.farmerList]);
      setFarmerList(response.data.farmerList);
    };

    getFarmerList();
  }, []);

  //페이징
  const onChangePage = (_, value) => {
    setPage(value);
  };

  //키워드 검색어 입력
  const keywordChangeHandler = (e) => {
    setKeyword(e.target.value);
  };

  //키워드 초기화
  const keywordResetHandler = (e) => {
    setKeyword('all');
  };

  //키워드 입력 시 검색
  const onClickKeywordHandler = async (keyword) => {
    try {
      const response = await API.get(
        //`findfarmer?keyword=${keyword}&sortType=${sortType}&page=${page}`
        'findfarmer',
        { keyword, sortType, page }
      );
      setFarmerList(response?.data?.farmerList);
      if (response.data.farmerList.length === 0) {
        setIsErrorModal({
          state: true,
          message: '검색된 항목이 없습니다.',
        });
      }
    } catch (error) {
      setIsErrorModal({
        state: true,
        message: error.message,
      });
    }
  };

  const paramsChangeHandler = async (keyword, sortType, page) => {
    try {
      const response = await API.get(
        `/findfarmer?keyword=${keyword}&sortType=${sortType}&page=${page}`
      );
      setFarmerList(response.data.farmerList);
    } catch (error) {
      setIsErrorModal({
        state: true,
        message: error.message,
      });
    }
  };
  //sorting 변경
  const onClickRating = async () => {
    setSortType('rating');
    paramsChangeHandler();
  };
  const onClickfollowCount = async () => {
    setSortType('followCount');
    paramsChangeHandler();
  };
  //최신 순 클릭 시
  const onClickFarmerReload = async () => {
    try {
      setSortType('latest');

      const response = await API.get(
        `findfarmer?keyword=${keyword}&sortType=${sortType}&page=${page}`
      );
      setFarmerList(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // let groupedCards = farmerCardsData;
  // for (let i = 0; i < farmerList.length; i += 4) {
  //   groupedCards.push(farmerList.slice(i, i + 4));
  // }

  return (
    <Fragment>
      <section className={style.wrapper}>
        <div className={style.search}>
          <input
            type="text"
            className={style['input-text']}
            value={keyword}
            onChange={keywordChangeHandler}
            placeholder="품목명을 입력하세요"
          />
          <button
            className={style['button']}
            onClick={paramsChangeHandler}
          >
            검색
          </button>
          <button
            className={style['button']}
            onClick={keywordResetHandler}
          >
            초기화
          </button>
        </div>
        <div>
          <button onClick={() => onClickFarmerReload()}>최신 순</button>
          {' | '}
          <button onClick={onClickRating}>별점 순</button>
          {' | '}
          <button onClick={onClickfollowCount}>찜이 많은 순</button>
        </div>

        <div>
          <Link to="reg-farmer">
            <button>파머 등록</button>
          </Link>
        </div>
      </section>
      {/* {groupedCards.map((group, index) => (
        key={index}
        className={style.farmercardgrid}
      > */}
      <div>
        {farmerList?.length > 0
          ? farmerList.map((farmer) => (
              <FarmerCard
                key={farmer.farmerId}
                farmer={farmer}
              />
            ))
          : '등록된 파머가 없습니다.'}
      </div>
    </Fragment>
  );
};

export default FindFarmerPage;
