import React, { useState } from "react";
import ReviewCard from "./ReviewCard"; // ReviewCard 컴포넌트 import
import style from "./ReviewList.module.css"; // 리뷰 리스트의 스타일 파일 import
import Pagination from "./Pagination";

const ReviewList = () => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지를 관리하는 상태 추가
  const [cards, setCards] = useState([]);
  const itemsPerPage = 3; // 한 페이지에 표시될 리뷰 아이템 수
  // 예시 데이터
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const reviewCardsData = [
    {
      nickname: "명수사랑",
      starRating: 1,
      date: "23.11.22",
      farmName: "명수팜",
      itemName: "토마토",
      quantity: "5kg",
      content:
        "명수팜 못난이 토마토 존맛! 못생겼지만 신선하고 맛있어요! 명수팜 못난이 토마토 존맛! 못생겼지만 신선하고 맛있어요!",
    },
    {
      nickname: "명수사랑",
      starRating: 5,
      date: "23.11.22",
      farmName: "명수팜",
      itemName: "토마토",
      quantity: "5kg",
      content: "명수팜 못난이 토마토 존맛! 못생겼지만 신선하고 맛있어요! ",
    },
    {
      nickname: "명수사랑",
      starRating: 5,
      date: "23.11.22",
      farmName: "명수팜",
      itemName: "토마토",
      quantity: "5kg",
      content: "명수팜 못난이 토마토 존맛! 못생겼지만 신선하고 맛있어요! ",
    },
    {
      nickname: "명수사랑",
      starRating: 5,
      date: "23.11.22",
      farmName: "명수팜",
      itemName: "토마토",
      quantity: "5kg",
      content: "명수팜 못난이 토마토 존맛! 못생겼지만 신선하고 맛있어요! ",
    },
    {
      nickname: "명수사랑",
      starRating: 5,
      date: "23.11.22",
      farmName: "명수팜",
      itemName: "토마토",
      quantity: "5kg",
      content: "명수팜 못난이 토마토 존맛! 못생겼지만 신선하고 맛있어요! ",
    },
    {
      nickname: "명수사랑",
      starRating: 5,
      date: "23.11.22",
      farmName: "명수팜",
      itemName: "토마토",
      quantity: "5kg",
      content: "명수팜 못난이 토마토 존맛! 못생겼지만 신선하고 맛있어요! ",
    },
  ];
  const groupedCards = (reviewCardsData) => {
    const grouped = [];
    for (let i = 0; i < reviewCardsData.length; i += 3) {
      grouped.push(reviewCardsData.slice(i, i + 3));
    }
    return grouped;
  };

  const grouped = groupedCards(reviewCardsData); // groupedCards 함수 호출

  return (
    <div className={style.reviewList}>
      <h2 className={style.reviewTitle}>후기</h2>
      {grouped.map((group, index) => (
        <div key={index} className={style.all}>
          {group.map((review, idx) => (
            <ReviewCard
              key={idx}
              nickname={review.nickname}
              starRating={review.starRating}
              date={review.date}
              farmName={review.farmName}
              itemName={review.itemName}
              quantity={review.quantity}
              content={review.content}
            />
          ))}
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(reviewCardsData.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ReviewList;
