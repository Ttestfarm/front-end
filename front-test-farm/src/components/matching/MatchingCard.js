import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../UI/Card';
import style from './MatchingCard.module.css';

const MatchingCard = ({ item, userId }) => {
  return (
    <>
      <Card
        width="300px"
        height="300px"
      >
        <p>
          <span className={style.name}>{item.userName}</span> 님의 요청서
        </p>
        <div className={style.container}>
          <div className={style.left}>
            <p>요청 품목</p>
            <p>필요한 양</p>
            <p>견적 기한</p>
          </div>
          <div className={style.right}>
            <p>{item.requestProduct}</p>
            <p>{item.requestQuantity}</p>
            <p> ~ {item.requestDate}</p>
          </div>
        </div>
        <div className={style.btns}>
          <button>
            <Link to={`/matching?reqformId=${item.requestId}`}>따라 사기</Link>
          </button>
          <button>견적 보내기</button>
        </div>
      </Card>
    </>
  );
};

export default MatchingCard;
