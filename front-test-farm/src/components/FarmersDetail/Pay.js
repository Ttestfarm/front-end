import React, { useState, useEffect } from "react";
import { importIamport, userCode } from "../../api/iamport";
import { useLocation } from "react-router-dom"; // useLocation 불러오기
import axios from "axios";
import * as API from "../../api/index";
import { tokenAtom } from "../../recoil/Atoms"; //리코일
import { useRecoilValue } from "recoil"; // 리코일
import style from "./Pay.module.css";

const Pay = () => {
  const token = useRecoilValue(tokenAtom); //리코일
  const location = useLocation();
  const { state } = location;

  const productPrice = parseInt(state.deliveryInfo.productPrice, 10);
  const quantity = parseInt(state.deliveryInfo.quantity, 10);
  const productQuantity = parseInt(state.deliveryInfo.productQuantity, 10);
  const productStock = state.deliveryInfo.stock;
  const [result, setResult] = useState(0); // result 상태 정의

  useEffect(() => {
    if (!isNaN(productPrice) && !isNaN(quantity)) {
      const calculatedResult = productPrice * quantity;
      setResult(calculatedResult); // result 상태 업데이트
    } else {
      console.log("올바른 숫자 형식이 아닙니다.");
    }
  }, [productPrice, quantity]);
  console.log("result", result);
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
    buyer_addr: state.deliveryInfo.address,
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
  const requestPay = async () => {
    console.log("quantity:", quantity);
    console.log("productStock:", productStock);

    if (quantity > productStock) {
      alert("상품 수량을 확인해주세요.");
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

      console.log(rsp);

      if (rsp.success) {
        const res = await API.post2(`/payment/validation/${rsp.imp_uid}`);

        if (
          parseInt(
            state.deliveryInfo.productPrice * state.deliveryInfo.quantity +
              state.deliveryInfo.paymentDelivery
          ) === res.data.response.amount
        ) {
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
              status: rsp.status,
              paidAt: rsp.paid_at,
              productName: rsp.name,
              productPrice: productPrice,
              count: quantity,
              productId: state.deliveryInfo.productId,
              farmerId: state.deliveryInfo.farmerId,
              paymentDelivery: state.deliveryInfo.paymentDelivery,
            });

            alert(response.data);
          } catch (error) {
            console.error("Error while processing payment:", error);
            alert("Payment processing failed");
          }
        } else {
          alert("Payment failed1");
        }
      } else {
        alert("Payment failed2");
      }
    } catch (error) {
      console.error("Error occurred during payment:", error);
      alert("Error occurred during payment");
    }
  };

  return (
    <>
      <div>checkoutpage</div>
      <div>수령인 이름: {state.deliveryInfo.name}</div>
      <div>수령인 전화번호: {state.deliveryInfo.tel}</div>
      <div>
        수령 주소:{" "}
        {state.deliveryInfo.address1 +
          state.deliveryInfo.address2 +
          state.deliveryInfo.address3}
      </div>
      <div>상품명: {state.deliveryInfo.productName}</div>
      <div>상품가격: {state.deliveryInfo.productPrice}</div>
      <div>수량: {state.deliveryInfo.quantity}</div>
      <div>배송비:{state.deliveryInfo.paymentDelivery} </div>
      <div>
        총 금액:{" "}
        {state.deliveryInfo.productPrice * state.deliveryInfo.quantity +
          state.deliveryInfo.paymentDelivery}{" "}
        원
      </div>
      <button onClick={requestPay}>결제하기</button>
    </>
  );
};
export default Pay;
