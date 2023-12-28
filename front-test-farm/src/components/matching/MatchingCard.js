import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../UI/Card';
import style from './MatchingCard.module.css';
import { useRecoilValue } from 'recoil';
import { tokenAtom, userInfoAtom } from '../../recoil/Atoms';

const MatchingCard = ({ item }) => {
  const token = useRecoilValue(tokenAtom);
  const userInfo = useRecoilValue(userInfoAtom);

  return (
    <Card
      width="300px"
      height="250px"
    >
      <p>
        <span className={style.name}>🍊{item.userName}</span> 님의 요청서
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
        <Link
          to={`/matching/buy/${item.requestProduct}/${item.requestQuantity}`}
        >
          <button
            className={style.btn1}
            disabled={!token}
          >
            따라 사기
          </button>
        </Link>

        <Link
          to={`/farmerpage/quotform/${item.requestId}/${item.requestProduct}/${item.requestQuantity}`}
        >
          <button
            className={style.btn2}
            disabled={!userInfo.farmerId}
          >
            견적 보내기
          </button>
        </Link>
      </div>
    </Card>
  );
};

export default MatchingCard;
