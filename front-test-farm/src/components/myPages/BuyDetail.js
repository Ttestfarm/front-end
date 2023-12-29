import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import style from "./BuyDetail.module.css";
import Card from "../UI/Card";
import { dateFormatter } from "./../../util/date";

const BuyDetailPage = () => {
  // const token = useRecoilValue(tokenAtom);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const ord = state?.ord;

  const formattedDate = dateFormatter(ord.createAt);
  console.log(ord.createAt);
  console.log(formattedDate);
  return (
    <div className={style.content}>
      <Card width="650px">
        <div className={style.header}>
          <h2>주문번호 {ord.receiptId}</h2>
          <span>
            {ord.state === "PAID"
              ? "결제완료"
              : ord.state === "CANCEL"
              ? "결제취소"
              : ord.state === "SHIPPING"
              ? "배송중"
              : "배송완료"}{" "}
            {formattedDate}
          </span>
        </div>
        <div className={style.container}>
          <p className={style.title}>📬 배송 정보</p>
          <main>
            <div className={style.name}>
              <p>수령인</p>
              <p>연락처</p>
              <p>배송주소</p>
            </div>
            <div className={style.value}>
              <p>{ord.buyerName}</p>
              <p>{ord.buyerTel}</p>
              <p>{ord.buyerAddress}</p>
            </div>
          </main>
          <p className={style.title}>🎁 상품 정보</p>
          <main>
            <div className={style.name}>
              <p>품목</p>
              <p>수량</p>
            </div>
            <div className={style.value}>
              <p>{ord.productName}</p>
              <p>{ord.count}</p>
              <p>{ord.quotationQuantity}</p>
            </div>
          </main>
          <p className={style.title}>🧾결제 정보</p>
          <main>
            <div className={style.name}>
              <p>결제수단</p>
              <p>상품금액</p>
              <p className={style.p1}>배송비</p>
              <p>총 결제금액</p>
            </div>
            <div className={style.value}>
              <p> {ord.paymentMethod}</p>
              <p>{ord.productPrice}</p>
              <p className={style.p1}>
                {ord.paymentDelivery === 0 ? "무료" : ord.paymentDelivery}
              </p>
              <p>{ord.amount}</p>
            </div>
          </main>
          <div className={style.btns}>
            <button className={style.cancel} onClick={() => navigate(-1)}>
              목록으로
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BuyDetailPage;
