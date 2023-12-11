import React from 'react';
import style from './ReviewCard.module.css'; // 리뷰 카드의 스타일 파일 import
import star from '../../assets/star.png';
import heart from '../../assets/heart.png';

const ReviewCard = ({
  nickname,
  starRating,
  date,
  farmName,
  itemName,
  quantity,
  content,
}) => {
  // 별점에 따라 별
  const renderStars = (starRating) => {
    const stars = [];
    // 별 이미지 경로 width 30px height 30px

    for (let i = 1; i <= starRating; i++) {
      stars.push(
        <img
          key={i}
          className="star"
          src={star}
          alt="star"
        />
      );
    }
    return stars;
  };

  return (
    <div className={style.reviewCard}>
      <div className={style.reviewContents}>
        <div className={style.nickname}>{nickname}님</div>
        <div className={style.rating}>{renderStars(starRating)}</div>
        <div className={style.details}>
          <span className={style.date}>{date}</span>
          <span className={style.farmName}>{farmName}</span>
          <span className={style.itemName}>{itemName}</span>
          <span className={style.quantity}>{quantity}</span>
        </div>
        <div className={style.content}>{content}</div>
      </div>
    </div>
  );
};

export default ReviewCard;
