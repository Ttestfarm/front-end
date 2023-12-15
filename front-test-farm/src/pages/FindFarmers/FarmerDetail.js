import React, { Fragment, useState, useEffect } from 'react';
import style from './FarmerDetail.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import backBtn from '../../assets/back_btn.png';
import star from '../../assets/star.png';
import heart from '../../assets/heart.png';

import ProductsList from '../../components/FarmersDetail/ProductsList';
import ReviewList from '../../components/FarmersDetail/ReviewList';

import { useRecoilState } from 'recoil';
import { userInfoAtom } from './../../recoil/Atoms';

import * as API from '../../api/index';

//전화번호 파싱해야합니다!!
//css 수정해야합니다!!

const FarmerDetailPage = () => {
  const [farmerInfo, setFarmerInfo] = useState(null);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  const farmerId = useParams().farmerId;
  const navigate = useNavigate();
  //초기 랜더링 시 파머 정보 불러오기
  useEffect(() => {
    console.log('Aa');
    const getFarmerInfo = async () => {
      const response = await API.get(`/findfarmer/${farmerId}`);
      console.log(response.data);
      setFarmerInfo(response.data);
    };
    getFarmerInfo();
  }, []);

  return (
    <div className={style.container}>
      {farmerInfo != null && (
        <main className={style.farmerInfoCard}>
          <button
            className={style.backBtn}
            onClick={() => navigate(-1)}
          >
            <img
              src={backBtn}
              alt="go to back btn"
            />
          </button>
          <section className={style.leftSection}>
            <div className={style.imageContainer}>
              <img
                src={farmerInfo}
                alt="farmer"
              />
            </div>
            <div className={style.info}>
              <div className={style.ratingInfo}>
                <img
                  src={star}
                  alt="Star"
                />
                <span>{farmerInfo.farmer.rating}</span> (
                <span>{farmerInfo.farmer.reviewCount}</span>)
              </div>
              &nbsp;
              <div className={style.heartinfo}>
                <img
                  src={heart}
                  alt="Heart"
                />
                <span>{farmerInfo.farmer.followCount}</span>
              </div>
            </div>
          </section>

          <div className={style.flexContainer}>
            <div className={style.farmDetails}>
              <div className={style.farmNames}>
                {' '}
                <span className={style.farmName}>농장 이름</span>
                <span className={style.farmNameData}>
                  {farmerInfo.farmer.farmName}
                </span>
              </div>
              <br />
              <div className={style.farmerNames}>
                <span className={style.farmerName}>팜 연락처</span>
                <span className={style.farmerNameData}>
                  {farmerInfo.farmer.farmTel}
                </span>
              </div>
              <br />
              <div className={style.farmsAddress}>
                <span className={style.farmAddress}>농장 주소</span>
                <span className={style.farmAddressData}>
                  {farmerInfo.farmer.farmAddress +
                    ' ' +
                    farmerInfo.farmer.farmAddressDetail}
                </span>
              </div>
            </div>
          </div>
        </main>
      )}
      <main className={style.main}>
        <header className={style.header}>못난이 마켓에 판매중인 상품</header>
        <ProductsList farmerId={farmerId} />
      </main>
      <main className={style.main}>
        <header className={style.header}>후기</header>
        <ReviewList farmerId={farmerId} />
      </main>
    </div>
  );
};

export default FarmerDetailPage;
