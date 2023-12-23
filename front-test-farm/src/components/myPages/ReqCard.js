import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import style from "./QuotCard.module.css";
import * as API from "../../api/index";
import QuotCard from "../../components/myPages/QuotCard";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../recoil/Atoms";

const ReqCard = ({ req }) => {
  const token = useRecoilValue(tokenAtom);
  //견적서 카드
  const [quotList, setQuotList] = useState([]);

  //견적서 리스트 요청
  const reqQuoteHandler = async () => {
    try {
      console.log("요청아이디:", req.request.requestId);
      const response = await API.get(`/user/${req.request.requestId}`, token);

      console.log(response.data);

      setQuotList([...response.data.quotesWithFarmer]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <header className={style.header}>
        {req.request.requestDate} 에 작성한 요청서
      </header>
      <section className={style.left}>
        <p>
          {req.request.requestProduct} {req.request.requestQuantity}
        </p>
        <p>요청 사항 : {req.request.requestMessage}</p>
      </section>
      <section className={style.right}>
        <p>수락을 기다리는 {req.quotationCount}개의 견적서가 있습니다.</p>
        <button onClick={reqQuoteHandler} disabled={req.quotationCount === 0}>
          견적서 보기
        </button>
      </section>

      {quotList.length > 0
        ? quotList.map((quoteItem) => (
            <QuotCard key={quoteItem.quote.quotationId} quoteItem={quoteItem} />
          ))
        : ""}
    </Card>
  );
};

export default ReqCard;
