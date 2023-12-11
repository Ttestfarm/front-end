import React from "react";
import style from "./FarmerCard.module.css"; // CSS 모듈을 변수로 가져오기
import star from "../../assets/star.png";
import heart from "../../assets/heart.png";
import { Link } from "react-router-dom";
const FarmerCard = ({
  farmname,
  farmaddress,
  category,
  imageUrl,
  farmerId,
  starRating,
  starCount,
  heartCount,
}) => {
  const imageStyle = {
    border: "3px solid #75786c",
    borderRadius: "50%",
    width: "150px",
    height: "150px",
  };

  return (
    <div className={style.farmerCard}>
      <div className={style.cardHeader}>
        <Link to={`/findfarmer?farmerId=${farmerId}`}>
          <button className={style.detail}>상세보기</button>
        </Link>
      </div>

      <div className={style.imageContainer}>
        <img src={imageUrl} alt="Farmer Card" style={imageStyle} />
      </div>
      <div className={style.info}>
        <div className={style.ratingInfo}>
          <img src={star} alt="Star" />
          <span>{starRating}</span> (<span>{starCount}</span>) &nbsp;
        </div>
        <div className={style.heartInfo}>
          <img src={heart} alt="Heart" />
          <span>{heartCount}</span>
        </div>
      </div>

      <div className={style.cardDetails}>
        <div className={style.farmName}>{farmname}</div>
        <div className={style.farmAddress}>{farmaddress}</div>
        <div className={style.category}>{category}</div>
      </div>
    </div>
  );
};

export default FarmerCard;
