import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userInfoAtom } from "./../../recoil/Atoms";
import { importIamport, userCode } from "../../api/iamport";
import * as PortOne from "@portone/browser-sdk/v2";

const Payments = ({ product }) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [paymentInfo, setPaymentInfo] = useState({
    pg: "html5_inicis",
    pay_method: "card",
    name: product.productName, //테스트결제
    merchant_uid: `mid_${new Date().getTime()}`, //ordersId인것 같은데
    amount: parseInt(product.productPrice), //실제 결제되는 가격
    buyer_name: "",
    buyer_tel: "",
    buyer_email: "",
    // buyer_name: userInfo.name, // 구매자 이름
    // buyer_tel: userInfo.phone, // 구매자 전화번호
    // buyer_email: userInfo.email, // 구매자 이메일
    // buyer_addr: userInfo.address, // 구매자 주소

    // 기타 필요한 결제 정보들
  });
  // userid
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
    try {
      const { IMP } = window;
      IMP.init(userCode);

      // Request payment using IMP.request_pay
      IMP.request_pay(paymentInfo, (rsp) => {
        console.log(rsp);
        //rsp 다 보기
        if (rsp.success) {
          // If payment is successful, verify the payment with your backend
          axios
            .post("http://localhost:8090/verifyIamport/" + rsp.imp_uid)
            .then((response) => {
              // Compare paid_amount with verified response amount
              if (rsp.paid_amount === response.data.response.amount) {
                alert("Payment successful");
              } else {
                alert("Payment wasnt successful");
              }
            })
            .catch((error) => {
              console.error("Error while verifying payment:", error);
              alert("Payment failed");
            });
        } else {
          // Handle payment failure
          alert("Payment failed");
        }
      });
    } catch (error) {
      console.error("에러 occurred during payment:", error);
      alert("Error occurred during payment");
    }
  };

  return (
    <div>
      <button onClick={requestPay}>결제하기</button>
    </div>
  );
};

export default Payments;
