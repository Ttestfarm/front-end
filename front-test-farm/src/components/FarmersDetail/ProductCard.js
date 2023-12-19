import React, { useEffect, useState } from "react";
import style from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import Payments from "../../components/FarmersDetail/Payments"; // 파일 경로에 맞게 수정
import DeliveryInfo from "./DeliveryInfo";
import axios from "axios";
import * as PortOne from "@portone/browser-sdk/v2";

const ProductCard = ({ product }) => {
  const [showPayments, setShowPayments] = useState(false);
  const onClickPayment = () => {
    setShowPayments(true);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.imageWrapper}>
          <img src={product.thumbNail} alt="product thumbnail" />
        </div>
        <h3>{product.productName}</h3>
        <span>{product.productPrice}</span>
        {" | "}
        <span>{product.productQuantity}</span>
        {" | "}
        <span className={style.stock}>{product.productStock}개 남음</span>

        <div className={style.button}>
          <button>상세보기</button>
          <button onClick={onClickPayment}>바로주문</button>
          {/* <button><Link to="/DeliveryInfo">배송지 입력</Link></button> */}
        </div>
        {showPayments && <Payments product={product} />}
      </div>
    </>
  );
};

export default ProductCard;
