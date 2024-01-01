import React, { useState, useEffect } from "react";
import { importIamport, userCode } from "../../api/iamport";
import { useLocation, useNavigate } from "react-router-dom"; // useLocation 불러오기
import axios from "axios";
import * as API from "../../api/index";
import {
  isErrorModalAtom,
  isSuccessModalAtom,
  tokenAtom,
} from "../../recoil/Atoms"; //리코일
import { useRecoilState, useRecoilValue } from "recoil"; // 리코일
import style from "./Pay.module.css";
import { phoneFormat } from "../../util/validation";
import Card from "../UI/Card";

const Pay = () => {
  const token = useRecoilValue(tokenAtom); //리코일
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const productPrice = parseInt(state.deliveryInfo.productPrice, 10);
  const quantity = parseInt(state.deliveryInfo.quantity, 10);
  const productQuantity = parseInt(state.deliveryInfo.productQuantity, 10);
  const productStock = state.deliveryInfo.stock;
  const [result, setResult] = useState(0); // result 상태 정의
  const [, setIsErrorModal] = useRecoilState(isErrorModalAtom);
  const [, setIsSucceessModal] = useRecoilState(isSuccessModalAtom);

  useEffect(() => {
    if (!isNaN(productPrice) && !isNaN(quantity)) {
      const calculatedResult = productPrice * quantity;
      setResult(calculatedResult); // result 상태 업데이트
    } else {
      setIsErrorModal({ state: true, message: "올바른 숫자 형식이 아닙니다." });
    }
  }, [productPrice, quantity]);
  const [paymentInfo, setPaymentInfo] = useState({
    pg: "html5_inicis",
    pay_method: "card",
    name: state.deliveryInfo.productName,
    amount: parseInt(
      state.deliveryInfo.productPrice * state.deliveryInfo.quantity +
        state.deliveryInfo.paymentDelivery
    ),
    merchant_uid: `mid_${new Date().getTime()}`,
    buyer_name: state.deliveryInfo.name,
    buyer_tel: state.deliveryInfo.tel,
    buyer_addr: state.deliveryInfo.address2 + state.deliveryInfo.address3,
  });

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const deliveryFee = state.deliveryInfo.paymentDelivery;
  const totalPrice =
    state.deliveryInfo.productPrice * state.deliveryInfo.quantity +
    state.deliveryInfo.paymentDelivery;
  const info = state.deliveryInfo;
  const formattedPhoneNumber = phoneFormat(info.tel);
  const requestPay = async () => {
    if (quantity > productStock) {
      setIsErrorModal({
        state: true,
        message: "[재고 부족] 상품 수량을 확인해주세요.",
      });
      return;
    }
    try {
      const { IMP } = window;
      IMP.init(userCode);

      const rsp = await new Promise((resolve, reject) => {
        IMP.request_pay(paymentInfo, (response) => {
          resolve(response);
        });
      });

      if (rsp.success) {
        const res = await API.post2(`/payment/validation/${rsp.imp_uid}`);

        if (parseInt(totalPrice) === res.data.response.amount) {
          try {
            const response = await API.post2(`/payment`, token, {
              receiptId: rsp.imp_uid,
              amount: rsp.paid_amount,
              ordersId: rsp.merchant_uid,
              buyerName: rsp.buyer_name,
              buyerTel: rsp.buyer_tel,
              buyerAddress: rsp.buyer_addr,
              paymentMethod: rsp.pay_method,
              pgTid: rsp.pg_tid,
              pgType: rsp.pg_type,
              state: rsp.status.toUpperCase(),
              paidAt: rsp.paid_at,
              productName: rsp.name,
              productPrice: productPrice,
              count: quantity,
              productId: state.deliveryInfo.productId,
              farmerId: state.deliveryInfo.farmerId,
              paymentDelivery: state.deliveryInfo.paymentDelivery,
            });

            setIsSucceessModal({
              state: true,
              message: "감사합니다. 결제 성공 💸",
            });
            navigate("/mypage/buylist");
          } catch (error) {
            console.error("Error while processing payment:", error);
          }
        } else {
          setIsErrorModal({ state: true, message: rsp.error_msg });
        }
      } else {
        setIsErrorModal({ state: true, message: rsp.error_msg });
      }
    } catch (error) {
      console.error("Error occurred during payment:", error);
    }
  };

  return (
    <div className={style.content}>
      <Card width="550px">
        <h2 className={style.header}>😉주문 내용 확인😉</h2>
        <div className={style.container}>
          <p className={style.title}>📝 수령인 정보</p>
          <main>
            <div className={style.name}>
              <p>성함</p>
              <p className={style.p1}>연락처</p>
              <p>주소</p>
              <p>상세주소</p>
            </div>
            <div className={style.value}>
              <p>{info.name}</p>
              <p className={style.p1}>{formattedPhoneNumber}</p>
              <p>{info.address2}</p>
              <p>{info.address3}</p>
            </div>
          </main>
          <p className={style.title}>🌱 상품 정보</p>
          <main>
            <div className={style.name}>
              <p className={style.p1}>못난이 농산물</p>
              <p>구매 가격</p>
              <p>수량</p>
              <p className={style.p1}>배송비</p>
              <p className={style.blueFont}>총 금액</p>
            </div>
            <div className={style.value}>
              <p className={style.p1}>{info.productName}</p>
              <p> {info.productPrice}</p>
              <p>{info.quantity}</p>
              <p className={style.p1}>
                {deliveryFee === null ? "무료" : deliveryFee}
              </p>
              <p className={style.blueFont}>{totalPrice}</p>
            </div>
          </main>
          <div className={style.title}>
            <span>못난이 농산물을 구매해주셔서 대단히 감사합니다.</span>
          </div>

          <div className={style.btns}>
            <button className={style.cancel} onClick={() => navigate(-1)}>
              취소
            </button>
            <button className={style.pay} onClick={requestPay}>
              결제하기
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Pay;
