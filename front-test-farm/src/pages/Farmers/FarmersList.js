import FarmerCard from './FarmerCard';
import React, { useState, useEffect } from 'react';
import style from './FarmersList.module.css'; // 스타일 파일 불러오기

const FarmersList = () => {
  const [cards, setCards] = useState([]);
  //   useEffect(() => {
  //       axios
  //           .get("https://your-spring-boot-api-url/cards")
  //           .then((response) => {
  //               setCards(response.data);
  //           })
  //           .catch((error) => {
  //               console.error("Error fetching data:", error);
  //           });
  //   }, []);
  const farmerCardsData = [
    {
      farmname: '명수팜',
      farmaddress: '경기 이천시 명수로',
      category: '토마토, 무화과, 감자',
      imageUrl: '/farmer.png',
    },
    {
      farmname: '명수팜',
      farmaddress: '경기 이천시 명수로',
      category: '토마토, 무화과, 감자',
      imageUrl: '/farmer.png',
    },
    {
      farmname: '명수팜',
      farmaddress: '경기 이천시 명수로',
      category: '토마토, 무화과, 감자',
      imageUrl: '/ha.jpg',
    },
    {
      farmname: '명수팜',
      farmaddress: '경기 이천시 명수로',
      category: '토마토, 무화과, 감자',
      imageUrl: '/dont.png',
    },
    {
      farmname: '명수팜',
      farmaddress: '경기 이천시 명수로',
      category: '토마토, 무화과, 감자',
      imageUrl: '/farmer.png',
    },
    {
      farmname: '명수팜',
      farmaddress: '경기 이천시 명수로',
      category: '토마토, 무화과, 감자',
      imageUrl: '/farmer.png',
    },
    {
      farmname: '명수팜',
      farmaddress: '경기 이천시 명수로',
      category: '토마토, 무화과, 감자',
      imageUrl: '/ha.jpg',
    },
    {
      farmname: '명수팜',
      farmaddress: '경기 이천시 명수로',
      category: '토마토, 무화과, 감자',
      imageUrl: '/dont.png',
    },
  ];
  const groupedCards = [];
  for (let i = 0; i < farmerCardsData.length; i += 4) {
    groupedCards.push(farmerCardsData.slice(i, i + 4));
  }

  return (
    <div className={style.all}>
      <div className={style.search}>
        <input type="button" />

        <input
          type="text"
          placeholder="품목명을 입력하세요"
        />
      </div>
      {groupedCards.map((group, index) => (
        <div
          key={index}
          className={style.farmercardgrid}
        >
          {group.map((farmerCard, idx) => (
            <FarmerCard
              key={idx}
              farmname={farmerCard.farmname}
              farmaddress={farmerCard.farmaddress}
              category={farmerCard.category}
              imageUrl={farmerCard.imageUrl}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default FarmersList;
