import React, { useState } from "react";
import styles from "./FarmerCard.module.css"; // CSS 모듈을 변수로 가져오기
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { pink } from "@mui/material/colors";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

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
          <Rating name="read-only" value={farmer.rating} readOnly />(
          <span>{farmer.reviewCount}명</span>) &nbsp;
        </div>
        <div className={styles["heart-info"]}>
          <PersonAddAlt1Icon sx={{ color: pink[500], fontSize: 30 }} />
          <span>{farmer.followCount}명</span>
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
