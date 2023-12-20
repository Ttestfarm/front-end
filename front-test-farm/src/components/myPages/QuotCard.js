import React from 'react';
import style from './QuotCard.module.css';
import { Avatar, Rating } from '@mui/material';
import { pink } from '@mui/material/colors';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const QuotCard = ({ quoteItem }) => {
  //
  const avatarStyle = {
    width: 24,
    height: 24,
    border: 'solid',
  };

  return (
    <>
      <div className={style.container}>
        <section className={style.left}>
          <Avatar
            alt="farmPixurl"
            src={quoteItem.farmPix}
            sx={avatarStyle}
          ></Avatar>
          <Rating
            name="read-only"
            value={quoteItem.rating}
            readOnly
          />{' '}
          {quoteItem.reviewCount}
          <PersonAddAlt1Icon sx={{ color: pink[500], fontSize: 30 }} />
          {quoteItem.followCount}
          <button>주문하기</button>
        </section>
        <section className={style.right}>
          <p>
            <span>From. </span>
            {quoteItem.farmName} ({quoteItem.farmAddress})
          </p>
          <p>견적가 {quoteItem.quote.quotaionPrice}</p>
          <p>{quoteItem.quote.quotationComment}</p>
          {/* {quoteItem.quote.quotationPicture && 이미지 여러개면 어떻게 와?} */}
        </section>
      </div>
    </>
  );
};

export default QuotCard;
