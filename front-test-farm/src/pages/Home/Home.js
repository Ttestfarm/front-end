import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./Home.module.css";
import serviceOneImg from '../../assets/main-service-one.png';
import serviceTwoImg from '../../assets/main-service-two.png';
import circleOne from '../../assets/circle-one.png';
import circleTwo from '../../assets/circle-two.png';
import Carousel from "../../components/Layout/Carousel";
import Footer from "./Footer";
import { useRecoilValue, useRecoilState } from "recoil";
import { isErrorModalAtom, tokenAtom } from "../../recoil/Atoms";
const HomePage = () => {
  const token = useRecoilValue(tokenAtom);
  const [isErrorModal, setIsErrorModal] = useRecoilState(isErrorModalAtom);
  const navigate = useNavigate();

  const joinHandler = () => {
    if (token) {
      navigate("/findfarmer/reg-farmer");
    } else {
      setIsErrorModal({
        state: true,
        message: "먼저 로그인이 필요합니다.",
      });
      navigate("/login");
    }
  };

  return (
    <>
      <section>
        <div className={style["main-first"]}>
          <div className={style["text-box"]}>
            <p>UNPRETTY FARM은</p>
            <p>농산물의 외모에 구애받지 않는 새로운 식문화를 제안합니다</p>
          </div>
        </div>
      </section>

      <section className={style["main-second"]}>
        <p>우리는 외모가 완벽하지 않은 농산물도</p>
        <p>풍부한 맛과 영양을 지니고 있다는 것을 알고 있습니다</p>
      </section>

      <section>
        <div className={style["main-third"]}>
          <div className={style["text-box"]}>
            <p>그래서 우리는</p>
            <p>저평가되고 버려지는 농산물을 구함으로써</p>
            <p>농가에게는 폐기에 대한 부담을 줄이고</p>
            <p>소비자에게는 합리적인 가격으로 신선한 농산물을 제공합니다</p>
          </div>
        </div>
      </section>

      <section className={style["main-fourth"]}>
        <div className={style["text-box"]}>
          <p>판매될 기회조차 얻지 못하는 못난이 농산물이지만</p>
          <p>맛과 품질은 훌륭한 농산물을 구매하는 현명한 소비자를 위해 탄생했습니다</p>
        </div>

        <div className={style["service-one"]}>
          <div className={style["service-one-text"]}>
            <img src={circleOne} alt="circle-one" />
            <p>필요한 농산물을 매칭 요청해보세요!</p>
            <p>판매가 가능한 파머님이 직접 견적서를 보내드립니다</p>
            <p>간편하게 결제 후</p>
            <p>문 앞으로 배송된 농산물을 받아보실 수 있습니다</p>
          </div>
          <div className={style["service-one-img"]}>
            <img src={serviceOneImg} alt="service-one" />
          </div>
        </div>

        <div className={style["service-two"]}>
          <div className={style["service-two-img"]}>
            <img src={serviceTwoImg} alt="service-two" />
          </div>
          <div className={style["service-two-text"]}>
            <img src={circleTwo} alt="circle-two" />
            <p>원하는 파머의 농산물을 직접 구매해보세요!</p>
            <p>구매후기나 평점이 좋은 파머님 혹은</p>
            <p>원하는 농산물을 판매하는 파머님을 직접 찾아서</p>
            <p>바로 구매하실 수 있습니다</p>
          </div>
        </div>
      </section>

      <section className={style["farmer-join"]}>
        <div className={style["farmer-join-text"]}>
          <p>출하하지 못한 농산물이 있는 파머님!</p>
          <p>UNPRETTY FARM 파머 신청하셔서 못난이 농산물을 구해주세요</p>
        </div>
        <div className={style["farmer-join-btn"]}>
          <button
            className={style["join-btn"]}
            onClick={joinHandler}
            // onClick={() => {
            //   navigate('/findfarmer/reg-farmer');
            // }}
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
