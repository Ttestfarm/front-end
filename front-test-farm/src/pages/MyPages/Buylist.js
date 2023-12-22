import React, { useState, useEffect } from "react";
import style from "./BuyList.module.css";
import BuyCard from "../../components/myPages/BuyCard";
import * as API from "../../api/index";

const BuyListPage = () => {
  const [buyList, setBuyList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await API.get("/user/");
    }
  }, [buyList]);
  return (
    <>
      <nav className={style.nav}>
        <ul className={style.list}>
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
            <BuyCard key={buyItem.orders.ordersId} buyItem={buyItem} />
          ))}
      </section>
    </>
  );
};

export default BuyListPage;
