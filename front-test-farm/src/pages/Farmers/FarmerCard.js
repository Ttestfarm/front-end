import React from "react";
import styles from "./FarmerCard.module.css"; // CSS 모듈을 변수로 가져오기
import star from "../../assets/star.png";
import heart from "../../assets/heart.png";

const FarmerCard = ({ farmname, farmaddress, category, imageUrl }) => {
    const imageStyle = {
        border: "3px solid #75786c",
        borderRadius: "50%",
        width: "150px",
        height: "150px",
    };

    const starRating = 4.5; // 별점 평균 값 (예시)
    const starCount = 200; // 별점 개수 (예시)
    const heartCount = 100; // 하트 개수 (예시)

    return (
        <div className={styles["farmer-card"]}>
            <div className={styles["card-header"]}>
                <button className={styles.detail}>상세보기</button>
            </div>

            <div className={styles["image-container"]}>
                <img src={imageUrl} alt="Farmer Card" style={imageStyle} />
            </div>
            <div className={styles["info"]}>
                <div className={styles["rating-info"]}>
                    <img src={star} alt="Star" />
                    <span>{starRating}</span> (<span>{starCount}</span>) &nbsp;
                </div>
                <div className={styles["heart-info"]}>
                    <img src={heart} alt="Heart" />
                    <span>{heartCount}</span>
                </div>
            </div>

            <div className={styles["card-details"]}>
                <div className={styles["farmname"]}>{farmname}</div>
                <div className={styles["farmaddress"]}>{farmaddress}</div>
                <div className={styles["category"]}>{category}</div>
            </div>
        </div>
    );
};

export default FarmerCard;
