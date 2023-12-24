import React, { useEffect } from 'react';
import Card from '../UI/Card';
import style from './FarmerReqCard.module.css';
import { Link } from 'react-router-dom';

const FarmerReqCard = ({ req }) => {
  useEffect(() => {
    console.log("here");
    console.log(req);
  }, []);

  return (
    <div className={style.container}>
      <Card width="80%">
        <header className={style.header}>
          <p>{req.name} <span>님의 요청서</span></p>
        </header>
        <div className={style.wrapper}>
          <section className={style.left}>
            <p className={style.name}>
              <span>
                {req.requestProduct} {req.requestQuantity}
              </span>
            </p>
            <p className={style.reqMsg}>&lt;🥕요청 메세지 &gt;</p>
            <p className={style.paragraph}>{req.requestMessage}</p>
          </section>
          <section className={style.right}>
            <p>
              📨<span> {req.quotationCount}</span>개의 견적서 보내기
            </p>
            <Link
              className='link-to'
              to={`/farmerpage/quotform/${req.requestId}/${req.requestProduct}/${req.requestQuantity}`}>
              견적 보내기
            </Link>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default FarmerReqCard;