import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenAtom, userInfoAtom } from "./../../recoil/Atoms";
import { importIamport, userCode } from "../../api/iamport";
import * as API from "../../api/index";
import { useParams, useNavigate } from "react-router-dom";

const QuotePay = ({}) => {
  const token = useRecoilValue(tokenAtom);
  const navigate = useNavigate();

  const quotationId = useParams().quotationId;
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [paymentInfo, setPaymentInfo] = useState(null);

  const [quoteData, setQuoteData] = useState(null);
  useEffect(() => {
    const getQuote = async () => {
      try {
        const response = await API.get(`/user/request/${quotationId}`, token);
        console.log("quotepay", response);
        setQuoteData({ ...response.data });
      } catch (error) {
        console.log(error);
      }
    };

    getQuote();
  }, []);
  useEffect(() => {
    if (quoteData) {
      setPaymentInfo({
        pg: "html5_inicis",
        pay_method: "card",
        name: quoteData.quote.quotation.quotationProduct, //상품명
        merchant_uid: `mid_${new Date().getTime()}`,
        amount: parseInt(quoteData.quote.quotation.quotationPrice),
        buyer_name: quoteData.quote.request.name,
        buyer_tel: quoteData.quote.request.tel,
        buyer_addr: quoteData.quote.request.address1,
      });
    }
  }, [quoteData]);

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

      const rsp = await new Promise((resolve, reject) => {
        IMP.request_pay(paymentInfo, (response) => {
          resolve(response);
        });
      });

      console.log(rsp);

      if (rsp.success) {
        const res = await API.post2(`/payment/validation/${rsp.imp_uid}`);

        if (
          parseInt(quoteData.quote.quotation.quotationPrice) ===
          res.data.response.amount
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
              quotationId: quoteData.quote.quotation.quotationId,
              farmerId: quoteData.quote.quotation.farmerId,
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
    <div>
      <h2>Quote Detail</h2>
      {quoteData && (
        <>
          <p>Product: {quoteData.quote.quotation.quotationProduct}</p>
          <p>Quantity: {quoteData.quote.quotation.quotationQuantity}</p>
          <p>Price: {quoteData.quote.quotation.quotationPrice}</p>
          주소
          {quoteData.quote.request.address1}
          {quoteData.quote.request.address2}
          {quoteData.quote.request.address3}
          {quoteData.quote.request.name}
          {quoteData.quote.request.tel}
          {/* 기타 데이터를 필요한대로 추가적으로 렌더링 */}
        </>
      )}
      <button onClick={requestPay}>결제하기</button>
    </div>
  );
};
export default QuotePay;
