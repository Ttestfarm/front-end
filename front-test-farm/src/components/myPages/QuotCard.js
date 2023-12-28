import React from "react";
import style from "./QuotCard.module.css";
import { Avatar, Rating } from "@mui/material";
import { pink } from "@mui/material/colors";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Form, Navigate, useNavigate, Link } from "react-router-dom";
import * as API from "../../api/index";

const QuotCard = ({ quoteItem }) => {
  const navigate = useNavigate();

  const avatarStyle = {
    width: 100,
    height: 100,
    border: "solid",
  };
  const numericPrice = parseInt(quoteItem.quote.quotationPrice);
  const formattedPrice = numericPrice.toLocaleString("ko-KR");

  console.log(quoteItem);
  console.log("아이디", quoteItem.quote.quotationId);
  return (
    <>
      <div className={style.container}>
        <section className={style.left}>
          <Avatar
            alt="farmPixurl"
            src={`${API.imgUrl}/${quoteItem.farmPix}`}
            sx={avatarStyle}
          ></Avatar>
          <div className={style.rating}>
            <Rating
              name="read-only"
              value={quoteItem.rating}
              readOnly
              size="small"
            />
            <span className={style.span}> ({quoteItem.reviewCount}명)</span>
          </div>
          <div className={style.follow}>
            <PersonAddAlt1Icon sx={{ color: pink[500], fontSize: 20 }} />
            <span className={style.span}>({quoteItem.followCount}명)</span>
          </div>
          <Link to={`/mypage/quotepay/${quoteItem.quote.quotationId}`}>
            <button>주문하기</button>
          </Link>
        </section>
        <section className={style.right}>
          <p className={style.farmName}>
            <span className={style.italic}>From. </span>
            {quoteItem.farmName} ({quoteItem.farmAddress})
          </p>
          <p>
            <span>견적가 {formattedPrice} 원</span>
          </p>
          <p>
            <span>배송비{quoteItem.quote.quotationDelivery} 원</span>
          </p>
          <p>{quoteItem.quote.quotationComment}</p>
          {/* {quoteItem.quote.quotationPicture && 이미지 여러개면 어떻게 와?} */}
        </section>
      </div>
    </>
  );
};

export default QuotCard;
