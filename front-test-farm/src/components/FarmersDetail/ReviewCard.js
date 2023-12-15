import React, { useState } from "react";
import style from "./ReviewCard.module.css"; // 리뷰 카드의 스타일 파일 import

import Rating from "@mui/material/Rating";
//import Typography from '@mui/material/Typography';

const ReviewCard = ({ review }) => {
  const [value] = useState(0);
  return (
    <div className={style.reviewCard}>
      <div className={style.reviewContents}>
        <div className={style.nickname}>{review.userId}님</div>
        {/* <div className={style.rating}>{renderStars(starRating)}</div> */}
        {/* <Typography component="legend">Read only</Typography> */}
        <Rating name="read-only" value={value} readOnly />
        <div className={style.details}>
          <span className={style.date}>{review.date}</span>
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
