import React, { useState } from 'react';
import style from './ReviewCard.module.css'; // 리뷰 카드의 스타일 파일 import

import Rating from '@mui/material/Rating';

const ReviewCard = ({ review }) => {
  const [value] = useState(1);
  return (
    <div className={style.reviewCard}>
      <div className={style.reviewContents}>
        <div className={style.nickname}>{review.nickname}님</div>
        <Rating
          name="read-only"
          value={review.rating}
          readOnly
        />
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
