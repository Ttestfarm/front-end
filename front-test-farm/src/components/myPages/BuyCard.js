import React from 'react';
import { Link } from 'react-router-dom';
import style from './BuyCard.module.css';
import Card from '../UI/Card';
import BuyReviewCard from './BuyReviewCard';

const BuyCard = ({ buyItem }) => {
  const reviewHandler = () => {
    //모달 화면 오픈
  };
  console.log('buyItem', buyItem);
  return (
    <Card>
      <div className={style.img}>
        <img
          src={buyItem.orders}
          alt="farm produce"
        />
      </div>
      <div className={style.middle}>
        <p>{buyItem.orders.createDate}</p>
        <p>이름</p>
        <p>발송인</p>
        <Link> 주문상세&gt;</Link>
      </div>
      <div className={style.right}>
        <button>{buyItem.orders.ordersState}</button>
        {buyItem.review === null ? (
          <button onClick={reviewHandler}>후기쓰기</button>
        ) : (
          ''
        )}
      </div>
      <div>
        {buyItem.review === null ? (
          '작성된 후기가 없어요'
        ) : (
          <BuyReviewCard review={buyItem.review} />
        )}
      </div>
    </Card>
  );
};

export default BuyCard;
