import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Home.module.css';
import mainLogo from '../../assets/home_logo.png';
import thirdImg from '../../assets/third_img.png';
import thirdFarmer from '../../assets/third_img_farmer.png';
import Carousel from '../../components/Layout/Carousel';
import Footer from './Footer';
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <section>
        <div className={style['main-top-wrapper']}>
          <div className={style['main-left']}>
            <div className={style['img-box']}>
              <img
                className={style.logo}
                src={mainLogo}
                alt="UNPRETTY FARM main logo"
              />
            </div>
          </div>
          <div className={style['main-right']}>
            <div className={style['text-box']}>
              <p>UNPRETTY FARM 은 농산물의 외모에 구애받지 않는</p>
              <p style={{ 'marginBottom': '1.3rem' }}>
                새로운 식문화를 제안합니다.
              </p>

              <p>우리는 외모가 완벽하지 않은 농산물도,</p>
              <p style={{ 'marginBottom': '1.3rem' }}>
                저마다 풍부한 맛과 영양을 지니고 있다는 것을 알고 있습니다.
              </p>
              <p>그래서 UNPRETTY FARM은</p>
              <p>저평가되고 버려지는 농산물을 구하고,</p>
              <p>농가에게는 폐기에 대한 부담을 줄이며,</p>
              <p style={{ 'marginBottom': '1.3rem' }}>
                소비자에게는 합리적인 가격으로 신선한 농산물을 제공합니다
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={style['seasonal-product-wrapper']}>
        <h1>지금이 가장 맛있는 우리 농산물</h1>
        <Carousel />
      </section>
      <section className={style['main-second']}>
        <p>판매될 기회조차 얻지 못하는 '못난이 농산물' 이지만</p>
        <p>
          맛과 품질은 동일한 농산물을 구매해 주시는 현명한 소비자를 위해
          탄생하였습니다.
        </p>
      </section>

      <section className={style['main-third']}>
        <div className={style['third-img']}>
          <img
            src={thirdImg}
            alt="farm-produce"
          />
        </div>
        <div className={style['third-text']}>
          <p>구매를 희망하는 우리의 못난이 농산물을 요청해보세요! </p>
          <p>판매가 가능하신</p>
          <p style={{ 'marginBottom': '1.3erm' }}>
            파머님께서 직접 견적서를 보내드립니다
          </p>
          <p>간편하게 결제하시면, </p>
          <p style={{ 'marginBottom': '1.3rem' }}>
            문 앞으로 배송된 농산물을 받아보실 수 있을거예요!
          </p>
        </div>
      </section>

      <section className={style['main-fourth']}>
        <div className={style['fourth-text']}>
          <p>구매 후기가 좋았던 파머나 </p>
          <p style={{ 'marginBottom': '1.3rem' }}>
            구매를 원하는 못난이 농산물이 있으시다면
          </p>
          <p>파머가 판매하는 </p>
          <p>못난이 농산물을 구매할 수도 있어요!</p>
          <p>많은 양이 재고에 없을지도 모르지만</p>
          <p>합리적인 가격에 풍부한 식탁을 만들 수 있어요.</p>
        </div>
        <div className={style['fourth-img']}>
          <img
            src={thirdFarmer}
            alt="farmer"
          />
        </div>
      </section>

      <section className={style['farmer-join']}>
        <div className={style['farmer-join-text']}>
          <p>출하하지 못한 농산물이 있으시다면</p>
          <p>파머로 등록하실 수 있습니다.</p>
        </div>
        <div className={style['farmer-join-btn']}>
          <button
            className={style['join-btn']}
            onClick={() => {
              navigate('/findfarmer/reg-farmer');
            }}
          >
            파머 신청하기
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
