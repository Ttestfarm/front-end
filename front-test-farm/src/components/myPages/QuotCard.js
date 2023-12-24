import React from "react";
import style from "./QuotCard.module.css";
import { Avatar, Rating } from "@mui/material";
import { pink } from "@mui/material/colors";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Form, Navigate, useNavigate, Link } from "react-router-dom";

const QuotCard = ({ quoteItem }) => {
  const navigate = useNavigate();

  const avatarStyle = {
    width: 100,
    height: 100,
    border: "solid",
  };
  console.log("dlr", quoteItem);

  return (
    <>
      <div className={style.container}>
        <section className={style.left}>
          <Avatar
            alt="farmPixurl"
            src={quoteItem.farmPix}
            sx={avatarStyle}
          ></Avatar>
          <Rating name="read-only" value={quoteItem.rating} readOnly />
          {quoteItem.reviewCount}
          <PersonAddAlt1Icon sx={{ color: pink[500], fontSize: 30 }} />
          {quoteItem.followCount}
          {/* <button onClick={handlePayment}>주문하기</button> */}
          <button>
            <Link to={`${quoteItem.quote.quotationCommentId}`}> 주문하기</Link>
          </button>
        </section>
        <section className={style.right}>
          <p>
            <span>From. </span>
            {quoteItem.farmName} ({quoteItem.farmAddress})
          </p>
          <p>견적가 {quoteItem.quote.quotationPrice} 원</p>
          <p>{quoteItem.quote.quotationComment}</p>
          {/* {quoteItem.quote.quotationPicture && 이미지 여러개면 어떻게 와?} */}
        </section>
      </div>
    </>
  );
};

export default QuotCard;
