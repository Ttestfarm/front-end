import React, { useState, useEffect } from 'react';
import BuyCard from '../../components/myPages/BuyCard';

const BuylistPage = () => {
  const [buyList, setBuyList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // const response = await API.get('/user')
    }
  }, [buyList]);
  return (
    <>
      <nav>
        <ul>
          <li>
            <button>전체</button>
          </li>
          <li>
            <button>결제완료</button>
          </li>
          <li>
            <button>결제취소</button>
          </li>
          <li>
            <button>배송중</button>
          </li>
          <li>
            <button>배송완료</button>
          </li>
        </ul>
      </nav>

      <section>
        {buyList.length > 0 &&
          buyList.map((buyItem) => (
            <BuyCard
              key={buyItem.orders.ordersId}
              buyItem={buyItem}
            />
          ))}
      </section>
    </>
  );
};

export default BuylistPage;
