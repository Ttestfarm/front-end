import React from "react";
import { Link } from "react-router-dom";
import style from "./BuyCard.module.css";
import Card from "../UI/Card";
import BuyReviewCard from "./BuyReviewCard";
import dateFormatter from "../../util/date";

const BuyCard = ({ buyItem }) => {
  const reviewHandler = () => {
    //모달 화면 오픈
  };
  console.log("buyItem", buyItem);
  const formattedDate = dateFormatter(buyItem.payInfo.createAt);
  console.log(formattedDate);
  return (
    <div className={style.card}>
      <Card width="90%">
        <div className={style.container}>
          <section className={style.img}>
            <img src={buyItem.orders} alt="farm produce" />
          </section>
          <section className={style.middle}>
            <p>{formattedDate}</p>
            <p>이름</p>
            <p>발송인</p>
            <Link> 주문상세 &gt;</Link>
          </section>
          <section className={style.right}>
            <button
              className={`${style.state} ${style[buyItem.payInfo.state]}`}
            >
              {buyItem.payInfo.state}
            </button>
            {buyItem.review === null ? (
              <button
                className={style.reviewBtn}
                onClick={reviewHandler}
              >
                후기쓰기
              </button>
            ) : (
              ""
            )}
          </section>
        </div>
        <div className={style.reviewContainer}>
          {buyItem.review === null ? (
            "작성된 후기가 없어요😢"
          ) : (
            <BuyReviewCard review={buyItem.review} />
          )}
        </div>
      </Card>
    </div>
  );
};

export default BuyCard;
