import React from 'react';
import star from '../../assets/star.png';
import heart from '../../assets/heart.png';
import ReviewList from './ReviewList';
import style from './FarmerDetailCard.module.css';
const FarmerDetailCard = ({}) => {
  // farmname, farmaddress, farmername, imageUrl
  const exampleData = {
    farmname: '명수팜',
    farmaddress: '경기 이천시 명수로 112',
    farmername: '박명수',
    imageUrl: 'farmer.png', // 이미지 URL을 적절한 것으로 대체해주세요
    starRating: 4.5,
    starCount: 200,
    heartCount: 100,
  };

  const image = {
    border: '3px solid #75786c',
    borderRadius: '50%',
    width: '200px',
    height: '200px',
  };

  const {
    farmname,
    farmaddress,
    farmername,
    imageUrl,
    starRating,
    starCount,
    heartCount,
  } = exampleData;

  return (
    <div className={style.farmerdetailcard}>
      <button className={style.farmEdit}>팜 정보 수정</button>

      <div className={style.imagewithrating}>
        <div className={style.imageContainer}>
          <img
            src="farmer.png"
            alt="Farmer Card"
            style={image}
          />
        </div>
        <div className={style.info}>
          <div className={style.ratingInfo}>
            <img
              src={star}
              alt="Star"
            />
            <span>{starRating}</span> (<span>{starCount}</span>)
          </div>
          &nbsp;
          <div className={style.heartinfo}>
            <img
              src={heart}
              alt="Heart"
            />
            <span>{heartCount}</span>
          </div>
        </div>
      </div>
      <div className={style.flexContainer}>
        <div className={style.farmDetails}>
          <div className={style.farmNames}>
            {' '}
            <span className={style.farmName}>농장 이름</span>
            <span className={style.farmNameData}>{farmname}</span>
          </div>
          <br />
          <div className={style.farmerNames}>
            <span className={style.farmerName}>농부 이름</span>
            <span className={style.farmerNameData}>{farmername}</span>
          </div>
          <br />
          <div className={style.farmsAddress}>
            <span className={style.farmAddress}>농장 주소</span>
            <span className={style.farmAddressData}>{farmaddress}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FarmerDetailCard;
