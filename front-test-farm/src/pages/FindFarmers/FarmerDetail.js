import React, { useState, useEffect } from 'react';
import style from './FarmerDetail.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import backBtn from '../../assets/back_btn.png';
import { Rating } from '@mui/material';
import { pink } from '@mui/material/colors';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import ProductsList from '../../components/FarmersDetail/ProductsList';
import ReviewList from '../../components/FarmersDetail/ReviewList';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { tokenAtom, userInfoAtom } from './../../recoil/Atoms';
import axios from 'axios';
import * as API from '../../api/index';

import { isSuccessModalAtom } from './../../recoil/Atoms';
import { phoneFormat } from '../../util/validation';

const FarmerDetailPage = () => {
  const token = useRecoilValue(tokenAtom);
  const [farmerInfo, setFarmerInfo] = useState(null);
  const [farmerfollow, setFarmerfollow] = useState(false);

  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const setIsSuccessModal = useSetRecoilState(isSuccessModalAtom);

  const farmerId = useParams().farmerId;
  const navigate = useNavigate();

  //초기 랜더링 시 파머 정보 불러오기
  useEffect(() => {
    const getFarmerInfo = async () => {
      const response = await API.get(`/findfarmer/${farmerId}`, token);

      console.log(response.data);
      setFarmerInfo({
        ...response.data.farmer,
      });
      setFarmerfollow(response.data.farmerfollow);
    };
    getFarmerInfo();
  }, []);

  const followHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await API.get(`/findfarmer/${farmerId}/follow`, token);

      setFarmerInfo({ ...farmerInfo, followCount: response.data.followCount });
      setFarmerfollow(response.data.isSelect);
    } catch (error) {
      console.log(error);
    }
  };

  console.log('farmerInfo', farmerInfo);
  // const formattedPhone = phoneFormat(farmerInfo.farmTel);
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
          <div className={style.flexbox}>
            <section className={style.leftSection}>
              <div className={style.imageContainer}>
                <img
                  src={farmerInfo}
                  alt="farmer"
                />
              </div>

              <div className={style.info}>
                <Rating
                  name="read-only"
                  value={farmerInfo.rating}
                  readOnly
                />
                (<span>{farmerInfo.reviewCount}명</span>)
              </div>
              <div className={style.info}>
                <PersonAddAlt1Icon
                  sx={{
                    color: farmerfollow ? pink[500] : 'black',
                    fontSize: 30,
                  }}
                  onClick={followHandler}
                  className={style.follow}
                />
                <span> ({farmerInfo.followCount}명이 찜)</span>
              </div>
            </section>

            <div className={style.farmDetails}>
              <div>
                <span className={style.name}>🌾팜 이름</span>
                <span className={style.value}>{farmerInfo.farmName}</span>
              </div>
              <br />
              <div>
                <span className={style.name}>📞연락처</span>
                <span className={style.value}>{farmerInfo.farmTel}</span>
              </div>
              <br />
              <div className={style.farmsAddress}>
                <span className={style.name}>🏡팜 주소</span>
                <span className={style.value}>
                  {farmerInfo.farmAddress + ' ' + farmerInfo.farmAddressDetail}
                </span>
              </div>
              <div></div>
            </div>
          </div>
        </main>
      )}
      <main className={style.main}>
        <header className={style.header}>못난이 마켓에 판매중인 상품</header>
        <ProductsList farmerId={farmerId} />
      </main>
      <main className={style.main}>
        <header className={style.header}>
          {farmerInfo?.farmName}님에게 남겨진 후기
        </header>
        <ReviewList farmerId={farmerId} />
      </main>
    </div>
  );
};

export default FarmerDetailPage;
