import React from 'react';
import style from './ProductCard.module.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <>
      <div className={style.container}>
        <div className={style.imageWrapper}>
          <img
            src={product.thumbNail}
            alt="product thumbnail"
          />
        </div>
        <h3>{product.productName}</h3>
        <span>{product.productPrice}</span>
        {' | '}
        <span>{product.productQuantity}</span>
        {' | '}
        <span className={style.stock}>{product.productStock}개 남음</span>

        <div className={style.button}>
          <button>상세보기</button>
          <button>
            <Link to={`/`}>바로 주문</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
