import React, { useState } from 'react';
import Card from '../UI/Card';

const MatchingCard = ({ item }) => {
  const [matchingList, setMatchingList] = useState([]);
  return (
    <>
      <Card
        width="300px"
        height="300px"
      >
        <p>{item.userName}</p>
        <div>
          <div>
            <p>품목</p>
            <p>필요한 양</p>
            <p>견적 기한</p>
          </div>
          <div>
            <p>{item.requestProduct}</p>
            <p>{item.requestQuantity}</p>
            <p> ~ {item.requestDate}</p>
          </div>
        </div>
        <div>
          <button>따라 사기</button>
          <button>견적 보내기</button>
        </div>
      </Card>
    </>
  );
};

export default MatchingCard;
