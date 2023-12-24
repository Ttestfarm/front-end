import React, { useState } from 'react';
import style from './ProductCard.module.css';
import { Link, useNavigate } from 'react-router-dom';
import DeliveryInfo from './DeliveryInfo'; // DeliveryInfo 컴포넌트 import
import Card from '../UI/Card';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 표시 여부 상태
  const [name, setName] = useState(''); // 이름 상태
  const [tel, setTel] = useState(''); // 전화번호 상태
  const [address, setAddress] = useState(''); // 주소 상태
  const [quantity, setQuantity] = useState('');
  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    const deliveryInfo = {
      productName: product.productName,
      productQuantity: product.productQuantity,
      productPrice: product.productPrice,
      productId: product.productId,
      farmerId: product.farmerId,
      stock: product.productStock,
      paymentDelivery: product.shippingCost,
      name,
      tel,
      address,
      quantity, //주문수량
    };
    navigate('/pay', { state: { deliveryInfo } });
    setIsModalOpen(false); // 모달 닫기
    console.log(deliveryInfo);
  };
  const numericPrice = parseInt(product.productPrice);
  const formattedPrice = numericPrice.toLocaleString('ko-KR');

  return (
    <Card width="300px">
      <div className={style.container}>
        <div className={style.imageWrapper}>
          <img
            src={product.thumbNail}
            alt="product thumbnail"
          />
        </div>
        <h3>🌱{product.productName}</h3>
        <div className={style.product}>
          <span>{formattedPrice}원 </span>
          {'  |  '}
          <span>{product.productQuantity}</span>
          {'  |  '}
          <span className={style.stock}>{product.productStock}개 남음</span>
        </div>
        <div className={style.btns}>
          <button className={style.detailBtn}>상세보기</button>
          <button
            className={style.orderBtn}
            onClick={openModal}
          >
            바로 주문
          </button>
        </div>

        <DeliveryInfo
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
          name={name}
          tel={tel}
          address={address}
          quantity={quantity}
          setName={setName}
          setTel={setTel}
          setAddress={setAddress}
          setQuantity={setQuantity}
        />
      </div>
    </Card>
  );
};

export default ProductCard;
