import React from "react";
import style from "./BuyReviewCard.module.css";
import { Rating } from "@mui/material";
import * as API from "../../api/index";

const BuyReviewCard = ({ review }) => {
  return (
    <section className={style.section}>
      <div className={style.left}>
        <Rating name="read-only" value={review.rating} readOnly />
        <p className={style.paragraph}>{review.content}</p>
      </div>

      <div className={style.img}>
        <img src={`${API.imgUrl}/${review?.reviewpixUrl}`} alt="review pix"
          className={style["imgs"]} />
      </div>
    </section>
  );
};

export default BuyReviewCard;
