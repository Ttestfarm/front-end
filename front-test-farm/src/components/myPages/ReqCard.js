import React, { useState } from 'react';
import Card from '../UI/Card';
import style from './ReqCard.module.css';
import * as API from '../../api/index';
import QuotCard from '../../components/myPages/QuotCard';
import { useRecoilValue } from 'recoil';
import { tokenAtom } from '../../recoil/Atoms';

const ReqCard = ({ req }) => {
  const token = useRecoilValue(tokenAtom);
  //견적서 카드
  const [quotList, setQuotList] = useState([]);
  const [showList, setShowList] = useState(false);
  //견적서 리스트 요청
  const reqQuoteHandler = async () => {
    try {
      console.log('요청아이디:', req.request.requestId);
      console.log('token?', token);
      const response = await API.get(`/user/${req.request.requestId}`, token);

      console.log(response);

      console.log('show', showList);
      setQuotList([...response.data.quotesWithFarmer]);
      setShowList(!showList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.container}>
      <Card width="80%">
        <header className={style.header}>
          <span>{req.request.requestDate}</span> 에 작성한 요청서
        </header>
        <div className={style.wrapper}>
          <section className={style.left}>
            <p className={style.name}>
              <span>
                {req.request.requestProduct} {req.request.requestQuantity}
              </span>
            </p>
            <p className={style.reqMsg}>&lt;🥕요청 메세지 &gt;</p>
            <p className={style.paragraph}>{req.request.requestMessage}</p>
          </section>
          <section className={style.right}>
            <p>
              📨<span> {req.quotationCount}</span>개의 견적서 도착
            </p>
            <button
              onClick={reqQuoteHandler}
              disabled={req.quotationCount === 0}
            >
              견적서 보기
            </button>
          </section>
        </div>

        {showList && quotList.length > 0
          ? quotList.map((quoteItem) => (
              <QuotCard
                key={quoteItem.quote.quotationId}
                quoteItem={quoteItem}
              />
            ))
          : ''}
      </Card>
    </div>
  );
};

export default ReqCard;
