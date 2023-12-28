import React, { useState } from "react";
import style from "./ReviewCard.module.css"; // 리뷰 카드의 스타일 파일 import
import { dateFormatter } from "../../util/date";
import Rating from "@mui/material/Rating";
import * as API from "../../api/index";

const ReviewCard = ({ review }) => {
  const [value] = useState(1);
  const formattedDate = dateFormatter(review.createDate);

  console.log(review);
  return (
    <div className={style.reviewCard}>
      <div className={style.reviewContents}>
        <div className={style.userName}>
          <span>from. </span>
          {review.userName}님
        </div>

        <div className={style.details}>
          <Rating name="read-only" value={review.rating} readOnly />
          <span className={style.span}>{formattedDate}</span>
          <span className={style.span}>{review.productName}</span>
          <span className={style.span}>{review.count}</span>
        </div>
        <div className={style.reviewAndImg}>
          <div className={style.imgContainer}>
            <img
              src={`${API.imgUrl}/${review?.reviewpixUrl}`}
              alt="Review pix"
              className={style.img}
            />
          </div>
          <div className={style.content}>{review.content}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
