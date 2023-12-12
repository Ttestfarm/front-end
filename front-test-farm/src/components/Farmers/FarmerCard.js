import React from 'react';
import styles from './FarmerCard.module.css'; // CSS 모듈을 변수로 가져오기
import star from '../../assets/star.png';
import heart from '../../assets/heart.png';

const FarmerCard = ({ farmer }) => {
  const imageStyle = {
    border: '3px solid #75786c',
    borderRadius: '50%',
    width: '150px',
    height: '150px',
  };

  return (
    <div className={styles['farmer-card']}>
      <div className={styles['card-header']}>
        <button className={styles.detail}>상세보기</button>
      </div>

      <div className={styles['image-container']}>
        <img
          src={farmer?.farmPixurl}
          alt="Farmer Card"
          style={imageStyle}
        />
      </div>
      <div className={styles['info']}>
        <div className={styles['rating-info']}>
          <img
            src={star}
            alt="Star"
          />
          <span>{farmer.rating}</span> (<span>{farmer.reviewCount}</span>)
          &nbsp;
        </div>
        <div className={styles['heart-info']}>
          <img
            src={heart}
            alt="Heart"
          />
          <span>{farmer.followCount}</span>
        </div>
      </div>

      <div className={styles['card-details']}>
        <div className={styles['farmname']}>{farmer?.farmName}</div>
        <div className={styles['farmaddress']}>{farmer?.farmAddress}</div>
        <div className={styles['category']}>{farmer?.farmInterest}</div>
      </div>
    </div>
  );
};

export default FarmerCard;
