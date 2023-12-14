import React from "react";
import styles from "./FarmerCard.module.css"; // CSS 모듈을 변수로 가져오기
import star from "../../assets/star.png";
import heart from "../../assets/heart.png";
import { Link } from "react-router-dom";

const FarmerCard = ({ farmer }) => {
  return (
    <div className={styles["farmer-card"]}>
      <div className={styles["card-header"]}>
        <button className={styles.detail}>
          <Link to={`${farmer.farmerId}`} className={styles["details"]}>
            상세보기
          </Link>
        </button>
      </div>

      <div className={styles["image-container"]}>
        <img
          src={farmer?.farmPixurl}
          alt="Farmer Card"
          className={styles["image"]}
        />
      </div>
      <div className={styles["info"]}>
        <div className={styles["rating-info"]}>
          <img src={star} alt="Star" />
          <span>{farmer.rating}</span> (<span>{farmer.reviewCount}</span>)
          &nbsp;
        </div>
        <div className={styles["heart-info"]}>
          <img src={heart} alt="Heart" />
          <span>{farmer.followCount}</span>
        </div>
      </div>

      <div className={styles["card-details"]}>
        <div className={styles["farmname"]}>{farmer?.farmName}</div>
        <div className={styles["farmaddress"]}>{farmer?.farmAddress}</div>
        <div className={styles["category"]}>{farmer?.farmInterest}</div>
      </div>
    </div>
  );
};

export default FarmerCard;
