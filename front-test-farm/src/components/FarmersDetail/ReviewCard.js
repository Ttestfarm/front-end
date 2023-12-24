import React, { useState } from "react";
import style from "./ReviewCard.module.css"; // 리뷰 카드의 스타일 파일 import

import Rating from "@mui/material/Rating";

const ReviewCard = ({ review }) => {
  const [value] = useState(1);
  const createDate = review.createDate;
  const date = new Date(createDate); //date형식으로 변환
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1, 두 자리로 표기
  const day = String(date.getDate()).padStart(2, "0"); // 날짜를 두 자리로 표기

  const formattedDate = `${year}-${month}-${day}`; // yyyy-mm-dd 형식으로 조합
  console.log(date.getMonth() + 1);
  console.log(date.getDate());
  console.log(date.getFullYear());
  return (
    <div className={style.reviewCard}>
      <div className={style.reviewContents}>
        <div className={style.nickname}>{review.userName}님</div>
        <Rating name="read-only" value={value} readOnly />
        <div className={style.details}>
          <span className={style.date}>{formattedDate}</span>
          <span className={style.farmName}>{review.farmName}</span>
          <span className={style.itemName}>{review.itemName}</span>
          <span className={style.quantity}>{review.quantity}</span>
        </div>
        <div className={style.content}>{review.content}</div>
      </div>
    </div>
  );
};

export default ReviewCard;
