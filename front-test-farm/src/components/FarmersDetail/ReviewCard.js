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
        <div className={style.userName}>
          <span>from. </span>
          {review.userName}님
        </div>
        <Rating
          name="read-only"
          value={review.rating}
          readOnly
        />
        <div className={style.details}>
          <span>{formattedDate}</span>
          <span>{review.farmName}</span>
          <span>{review.productName}</span>
          <span>{review.count}</span>
        </div>
        <div className={style.content}>{review.content}</div>
      </div>
    </div>
  );
};

export default ReviewCard;
