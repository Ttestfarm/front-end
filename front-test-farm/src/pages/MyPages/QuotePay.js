import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import style from "./QuotePay.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { isErrorModalAtom, tokenAtom, userInfoAtom } from "../../recoil/Atoms";
import { importIamport, userCode } from "../../api/iamport";
import * as API from "../../api/index";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/UI/Card";

const QuotePayPage = () => {
  const token = useRecoilValue(tokenAtom);
  const [, setIsErrorModal] = useRecoilState(isErrorModalAtom);
  const navigate = useNavigate();

  const quotationId = useParams().quotationId;
  //const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
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
        amount: parseInt(
          quoteData.quote.quotation.quotationPrice +
            quoteData.quote.quotation.quotationDelivery
        ),
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
        const res = await axios.post(
          `${API.serverUrl}/payment/validation/${rsp.imp_uid}`
        );

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
              productPrice: quoteData.quote.quotation.quotationPrice, //상품 가격?
              paymentDelivery: quoteData.quote.quotation.quotationDelivery,
              count: quoteData.quote.quotation.quotationQuantity,
            });

            alert(response.data);
          } catch (error) {
            console.error("Error while processing payment:", error);
            setIsErrorModal({
              state: true,
              message: "[뜨핫] 결제가 중지되었습니다.",
            });
          }
        } else {
          setIsErrorModal({
            state: true,
            message: "[앗!에러?] 결제가 중지되었습니다.",
          });
        }
      } else {
        setIsErrorModal({
          state: true,
          message: "결제를 취소합니다.",
        });
      }
    } catch (error) {
      console.error("Error occurred during payment:", error);
    }
  };

  return (
    <div className={style.content}>
      <Card width="550px">
        <h2 className={style.header}>마지막으로 주문 내용 확인😉</h2>
        {quoteData && (
          <div className={style.container}>
            <p className={style.title}>📝 주문 상품 정보</p>
            <main>
              <div className={style.name}>
                <p>농산물</p>
                <p className={style.p1}>주문 양</p>
                <p>가격</p>
                <p className={style.p1}>배송비</p>
                <p className={style.blueFont}>총 결제 금액</p>
              </div>
              <div className={style.value}>
                <p>{quoteData.quote.quotation.quotationProduct}</p>
                <p className={style.p1}>
                  {quoteData.quote.quotation.quotationQuantity}
                </p>
                <p className={style.p1}>
                  {quoteData.quote.quotation.quotationPrice}
                </p>
                <p className={style.p1}>
                  +{quoteData.quote.quotation.quotationDelivery}
                </p>
                <p className={style.blueFont}>
                  총계
                  {quoteData.quote.quotation.quotationPrice +
                    quoteData.quote.quotation.quotationDelivery}
                </p>
              </div>
            </main>
            <p className={style.title}>📬 배송 정보</p>
            <main>
              <div className={style.name}>
                <p>우편번호</p>
                <p>배송지</p>
                <p>상세주소</p>
                <p className={style.p1}>받으실 분</p>
                <p>연락처</p>
              </div>
              <div className={style.value}>
                <p> {quoteData.quote.request.address1}</p>
                <p>{quoteData.quote.request.address2}</p>
                <p> {quoteData.quote.request.address3}</p>
                <p className={style.p1}>{quoteData.quote.request.name}</p>
                <p>{quoteData.quote.request.tel}</p>
              </div>
            </main>
            <div className={style.title}>
              <span>못난이 농산물을 아껴주셔서 대단히 감사합니다.</span>
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
        )}
      </Card>
    </div>
  );
};
export default QuotePayPage;
