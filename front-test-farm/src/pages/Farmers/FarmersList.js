import FarmerCard from "./FarmerCard";
import React, { useState, useEffect } from "react";
import style from "./FarmersList.module.css"; // 스타일 파일 불러오기
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const FarmersList = () => {
  const [cards, setCards] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [keyword, setKeyword] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const farmerCardsData = [];
  // const filteredItems = getFilteredItems(keyword, FarmersList);
  useEffect(() => {
    reqFarmersList(1);
  }, []);
  const reqFarmersList = (page) => {
    axios
      .get(`https://localhost:8090/findfarmer/${page}`)
      .then((res) => {
        console.log(res);
        let pageInfo = res.data.pageInfo;
        let list = res.data.farmerList;
        setCards([...list]); // 농부 데이터를 cards 상태에 설정
        setPageInfo({ ...pageInfo }); // 페이지 정보 설정
        setIsSearch(false); // 검색 상태 업데이트
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  };
  const searchSubmit = () => {
    reqFarmerSearch(1);
  };
  const reqFarmerSearch = (page) => {
    axios
      .get(`http://localhost8090/findfarmer?prod=${keyword}`)
      .then((res) => {
        console.log(res);
        setCards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const farmerCardsData = [
  //   {
  //     farmname: "명수팜",
  //     farmaddress: "경기 이천시 명수로",
  //     category: "토마토, 무화과, 감자",
  //     imageUrl: "/farmer.png",
  //     starRating: 4.5,
  //     starCount: 200,
  //     heartCount: 100,
  //   },
  //   {
  //     farmname: "명수팜",
  //     farmaddress: "경기 이천시 명수로",
  //     category: "토마토, 무화과, 감자",
  //     imageUrl: "/farmer.png",
  //   },
  //   {
  //     farmname: "명수팜",
  //     farmaddress: "경기 이천시 명수로",
  //     category: "토마토, 무화과, 감자",
  //     imageUrl: "/ha.jpg",
  //   },
  //   {
  //     farmname: "명수팜",
  //     farmaddress: "경기 이천시 명수로",
  //     category: "토마토, 무화과, 감자",
  //     imageUrl: "/dont.png",
  //   },
  //   {
  //     farmname: "명수팜",
  //     farmaddress: "경기 이천시 명수로",
  //     category: "토마토, 무화과, 감자",
  //     imageUrl: "/farmer.png",
  //   },
  //   {
  //     farmname: "명수팜",
  //     farmaddress: "경기 이천시 명수로",
  //     category: "토마토, 무화과, 감자",
  //     imageUrl: "/farmer.png",
  //   },
  //   {
  //     farmname: "명수팜",
  //     farmaddress: "경기 이천시 명수로",
  //     category: "토마토, 무화과, 감자",
  //     imageUrl: "/ha.jpg",
  //   },
  //   {
  //     farmname: "명수팜",
  //     farmaddress: "경기 이천시 명수로",
  //     category: "토마토, 무화과, 감자",
  //     imageUrl: "/dont.png",
  //   },
  //   {
  //     farmname: "명수팜",
  //     farmaddress: "경기 이천시 명수로",
  //     category: "토마토, 무화과, 감자",
  //     imageUrl: "/dont.png",
  //   },
  //   {
  //     farmname: "명수팜",
  //     farmaddress: "경기 이천시 명수로",
  //     category: "토마토, 무화과, 감자",
  //     imageUrl: "/dont.png",
  //   },
  //   {
  //     farmname: "명수팜",
  //     farmaddress: "경기 이천시 명수로",
  //     category: "토마토, 무화과, 감자",
  //     imageUrl: "/dont.png",
  //   },
  //   {
  //     farmname: "명수팜",
  //     farmaddress: "경기 이천시 명수로",
  //     category: "토마토, 무화과, 감자",
  //     imageUrl: "/dont.png",
  //   },
  // ];
  const groupedCards = [];
  for (let i = 0; i < farmerCardsData.length; i += 4) {
    groupedCards.push(farmerCardsData.slice(i, i + 4));
  }

  return (
    <div className={style.all}>
      <div className={style.search}>
        {/* <input type="button" className={style["searchb"]} /> */}
        <label htmlFor="sort"></label>
        <select
          name="sort"
          id="sort"
          className="sortSelection"
          // onClick={sorting}
        >
          <option value="rating">별점순(높은)</option>
          <option value="rating">리뷰수(많은)</option>
        </select>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="품목명을 입력하세요"
          className={style["productsearch"]}
        />
        <button onClick={searchSubmit} className={style["searchb"]}>
          검색
        </button>
      </div>
      {groupedCards.map((group, index) => (
        <div key={index} className={style.farmercardgrid}>
          {group.map((farmerCard, idx) => (
            <FarmerCard
              key={idx}
              farmname={farmerCard.farmname}
              farmaddress={farmerCard.farmaddress}
              category={farmerCard.category}
              imageUrl={farmerCard.imageUrl}
              starRating={farmerCard.starRating}
              starCount={farmerCard.starCount}
              heartCount={farmerCard.heartCount}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default FarmersList;
