import React, { useState } from 'react';
import style from './FarmerCard.module.css'; // CSS 모듈을 변수로 가져오기
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import { pink } from '@mui/material/colors';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const FarmerCard = ({ farmer }) => {
  return (
    <div className={style['farmer-card']}>
      <div className={style['card-header']}>
        <Link
          to={`/findfarmer/${farmer.farmerId}`}
          className={style['details']}
        >
          <button className={style.detail}>상세보기</button>
        </Link>
      </div>

      <div className={style['image-container']}>
        <img
          src={farmer?.farmPixurl}
          alt="Farmer Card"
          className={style['image']}
        />
      </div>
      <div className={style['info']}>
        <div className={style['info-c']}>
          <PersonAddAlt1Icon sx={{ color: pink[500], fontSize: 25 }} />
          <span>({farmer.followCount}명)</span>
        </div>
        <div className={style['info-c']}>
          <Rating
            name="read-only"
            value={farmer.rating}
            readOnly
          />
          (<span>{farmer.reviewCount}명</span>) &nbsp;
        </div>
      </div>

      <div className={style['card-details']}>
        <div className={style['farmname']}>{farmer?.farmName}</div>
        <div className={style['farmaddress']}>{farmer?.farmAddress}</div>
        <div className={style['category']}>
          <p><span>🥦</span>관심 농산물<span>🥦</span></p>
          {farmer?.farmInterest}
        </div>
      </div>
    </div>
  );
};

export default FarmerCard;
