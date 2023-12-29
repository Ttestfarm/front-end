import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './BuyCard.module.css';
import Card from '../UI/Card';
import BuyReviewCard from './BuyReviewCard';
import { dateFormatter } from '../../util/date';
import ReviewModal from '../UI/ReviewModal';
import * as API from '../../api/index';
const BuyCard = ({ buyItem, fetchData }) => {
  const [modalOpen, setModalOpen] = useState(false); //리뷰 모달
  const [orderInfo, setOrderInfo] = useState({
    date: buyItem.payInfo.createAt,
    productName: buyItem.payInfo.productName,
    productPrice: buyItem.payInfo.amount,
    receiptId: buyItem.payInfo.receiptId,
    farmerId: buyItem.payInfo.farmerId,
  });

  const navigate = useNavigate();
  //모달 화면 오픈
  const openReviewModal = () => {
    setModalOpen(true);
  };
  //모달 닫기
  const closeReviewModal = () => {
    setModalOpen(false);
    fetchData();
  };
  //날짜 변환
  const formattedDate = dateFormatter(buyItem.payInfo.createAt);
  const item = buyItem.payInfo;

  return (
    <div className={style.card}>
      <Card width="90%">
        <div className={style.container}>
          <section className={style.img}>
            <img
              src={`${API.imgUrl}/${buyItem?.payInfo?.thumbNail}`}
              alt="farm produce"
            />
          </section>
          <section className={style.middle}>
            <p className={style.date}>{formattedDate}</p>
            <p>구매 농산물 : {buyItem.payInfo.productName}</p>
            <p>발송인 :{buyItem.payInfo.farmName}</p>

            <Link
              to={`/mypage/buylist/${buyItem.payInfo.receiptId}`}
              state={{ ord: { ...buyItem.payInfo } }}
            >
              주문상세 &gt;
            </Link>
          </section>
          <section className={style.right}>
            <button
              className={`${style.state} ${style[buyItem.payInfo.state]}`}
            >
              {item.state === 'PAID'
                ? '결제완료'
                : item.state === 'CANCEL'
                ? '결제취소'
                : item.state === 'SHIPPING'
                ? '배송중'
                : '배송완료'}
            </button>
            {item.state === 'SHIPPING' && buyItem.review === null && (
              <button
                className={style.reviewBtn}
                onClick={openReviewModal}
              >
                후기쓰기
              </button>
            )}
          </section>
        </div>

        <ReviewModal
          isOpen={modalOpen}
          onClose={closeReviewModal}
          orderInfo={orderInfo}
        />
        <div className={style.reviewContainer}>
          {buyItem.review === null ? (
            '작성된 후기가 없어요😢'
          ) : (
            <BuyReviewCard review={buyItem.review} />
          )}
        </div>
      </Card>
    </div>
  );
};

export default BuyCard;
