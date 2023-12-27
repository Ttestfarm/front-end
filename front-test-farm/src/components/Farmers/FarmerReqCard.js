import React, { useEffect } from 'react';
import Card from '../UI/Card';
import style from './FarmerReqCard.module.css';
import { Link } from 'react-router-dom';

const FarmerReqCard = ({ req }) => {
  return (
    <div className={style.container}>
      <Card width="80%">
        <header className={style.header}>
          <p>{req.name}&nbsp;<span>님의 요청서</span></p>
        </header>
        <div className={style.wrapper}>
          <section className={style.left}>
            <p className={style.name}>
              품목: <span>{req.requestProduct}</span>&nbsp;&nbsp;
              수량: <span>{req.requestQuantity}</span><br />
              배송지: <span>{req.address2}</span>
            </p>
            <p className={style.reqMsg}>
              🥕요청 메세지🥕<br />
              {req.requestMessage}
            </p>
          </section>
          <section className={style.right}>
            <p>
              <span>✉&nbsp;재고확인 후 신중하게 보내주세요!</span>
            </p>
            <button>
              <Link
                className={style.link}
                to={`/farmerpage/quotform/${req.requestId}/${req.requestProduct}/${req.requestQuantity}`}>
                견적서 보내기
              </Link>
            </button>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default FarmerReqCard;