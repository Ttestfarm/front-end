import React, { useState } from 'react';
import style from './ReviewCard.module.css'; // 리뷰 카드의 스타일 파일 import
import dateFormatter from '../../util/date';
import Rating from '@mui/material/Rating';

const ReviewCard = ({ review }) => {
  const [value] = useState(1);
  const formattedDate = dateFormatter(review.createDate);
  return (
    <div className={style.reviewCard}>
      <div className={style.reviewContents}>
        <div className={style.nickname}>{review.userName}님</div>
        <Rating
          name="read-only"
          value={review.rating}
          readOnly
        />
        <div className={style.details}>
          <span className={style.date}>{formattedDate}</span>
          <span className={style.farmName}>{review.farmName}</span>
          <span className={style.itemName}>{review.productName}</span>
          <span className={style.quantity}>{review.count}</span>
        </div>
        <div className={style.content}>{review.content}</div>
      </div>
    </div>
  );
};

export default ReviewCard;
