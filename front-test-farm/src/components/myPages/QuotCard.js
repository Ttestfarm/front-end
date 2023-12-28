import React, { useState } from 'react';
import style from './QuotCard.module.css';
import { Avatar, Rating } from '@mui/material';
import { pink } from '@mui/material/colors';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Form, Navigate, useNavigate, Link } from 'react-router-dom';
import * as API from '../../api/index';

const QuotCard = ({ quoteItem }) => {
  const navigate = useNavigate();

  const avatarStyle = {
    width: 100,
    height: 100,
    border: 'solid',
  };
  const numericPrice = parseInt(quoteItem.quote.quotationPrice);
  const formattedPrice = numericPrice.toLocaleString('ko-KR');

  console.log(quoteItem);
  console.log('아이디', quoteItem.quote.quotationId);

  // //이미지처리
  let fileurl = quoteItem.quote.quotationImages;
  console.log('fileurl', fileurl);
  let filenums;

  if (fileurl !== null) {
    filenums = fileurl.split(',');
  } else {
    filenums = [];
  }

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
            {quoteItem.farmName}{' '}
          </p>
          <span className={style.addr}>({quoteItem.farmAddress})</span>
          <p className={style.p}>
            <span>견적가 {formattedPrice} 원</span>
            {' / '}
            <span className={style.span}>
              배송비&nbsp;
              {quoteItem.quote.quotationDelivery === 0
                ? '0'
                : quoteItem.quote.quotationDelivery}
              원
            </span>
          </p>

          <p className={style.p}></p>

          <p className={style.paragraph}>{quoteItem.quote.quotationComment}</p>
          <p className={style.img}>
            {filenums.length !== 0 &&
              filenums.map((num) => (
                <img
                  key={num}
                  src={`${API.imgUrl}/${num}`}
                  className={style.innerImg}
                  width="100px"
                  height="100px"
                  alt="quotepix"
                />
              ))}
          </p>
        </section>
      </div>
    </>
  );
};

export default QuotCard;
