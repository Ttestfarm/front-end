import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FarmerCard from './FarmerCard';
import style from './FarmersList.module.css';

const FarmersList = ({ farmers }) => {
  //const [cards, setCards] = useState([]);
  const [keyword, setKeyword] = useState('');

  //const [sortedFarmers, setSortedFarmers] = useState(false);

  const keywordChangeHandler = (e) => {
    const enteredKeyword = e.target.value;
    setKeyword(enteredKeyword);
  };

  const sortTypeChangeHandler = (sortOption) => {
    axios
      .get(`?keyword=${keyword}&sortType=${sortOption}`)
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const searchClickHandler = () => {};

  //   useEffect(() => {
  //       axios
  //           .get("https://your-spring-boot-api-url/cards")
  //           .then((response) => {
  //               setCards(response.data);
  //           })
  //           .catch((error) => {
  //               console.error("Error fetching data:", error);
  //           });
  //   }, []);
  //
  const groupedCards = [];
  for (let i = 0; i < farmers.length; i += 4) {
    groupedCards.push(farmers.slice(i, i + 4));
  }

  return (
    <Fragment>
      <section className={style.wrapper}>
        <div className={style.search}>
          <input
            type="text"
            className={style['input-text']}
            value={keyword}
            onChange={keywordChangeHandler}
            placeholder="품목명을 입력하세요"
          />
          <button
            className={style['button']}
            onClick={searchClickHandler}
          >
            검색
          </button>
        </div>
        <div>
          <button onClick={() => sortTypeChangeHandler('rating')}>
            별점 순
          </button>
          {' | '}
          <button onClick={() => sortTypeChangeHandler('followCount')}>
            찜이 많은 순
          </button>
        </div>

        <div>
          <Link to="reg-farmer">
            <button>파머 등록</button>
          </Link>
        </div>
      </section>
      {groupedCards.map((group, index) => (
        <div
          key={index}
          className={style.farmercardgrid}
        >
          {group.map((farmerCard, idx) => (
            <FarmerCard
              key={idx}
              farmname={farmerCard.farmname}
              farmaddress={farmerCard.farmaddress}
              category={farmerCard.category}
              imageUrl={farmerCard.imageUrl}
            />
          ))}
        </div>
      ))}
    </Fragment>
  );
};

export default FarmersList;
