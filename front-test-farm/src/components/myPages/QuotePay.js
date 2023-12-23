import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userInfoAtom } from "./../../recoil/Atoms";
import { importIamport, userCode } from "../../api/iamport";

const QuotePay = ({ quoteItem }) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [paymentInfo, setPaymentInfo] = useState({
    pg: "html5_inicis",
    pay_method: "card",
    name: quoteItem.productName,
    merchant_uid: `mid_${new Date().getTime()}`, //orderId인것 같은데
    amount: parseInt(quoteItem.quote.quotationPrice), //실제 결제되는 가격
    buyer_name: userInfo.name, // 구매자 이름
    buyer_tel: userInfo.phone, // 구매자 전화번호
    buyer_email: userInfo.email, // 구매자 이메일
    buyer_addr: userInfo.address, // 구매자 주소

    // 기타 필요한 결제 정보들
  });
};
export default QuotePay;
