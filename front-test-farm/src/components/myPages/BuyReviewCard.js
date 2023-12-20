import React from 'react';
import style from './BuyReviewCard.module.css';

const BuyReviewCard = ({ review }) => {
  return (
    <section>
      <div className={style.leftContainer}>
        <p>{review.rating}</p>
        <p>{review.content}</p>
      </div>

      <div className={style.img}>
        <img
          src={review.rieviewPixUrl}
          alt="review pix"
        />
      </div>
    </section>
  );
};

export default BuyReviewCard;
