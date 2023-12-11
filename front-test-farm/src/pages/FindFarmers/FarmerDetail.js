import React, { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { tokenAtom, isErrorModalAtom, userInfoAtom } from '../../recoil/Atoms';

import * as API from '../../api/index';

import FarmerDetailCard from './../../components/FarmersDetail/FarmerDetailCard';
import ProductDetailCard from './../../components/FarmersDetail/ProductDetailCard';
import ReviewList from '../../components/FarmersDetail/ReviewList';

import { useErrorModal } from './../../hooks/useModal';

const FarmerDetailPage = () => {
  const { farmerInfo, products, reviews } = useRouteLoaderData('farmer-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>로딩중...</p>}>
        <Await resolve={farmerInfo}>
          {(loadedFarmerInfo) => <FarmerDetailCard event={loadedFarmerInfo} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>로딩중...</p>}>
        <Await resolve={products}>
          {(loadedProducts) => <ProductDetailCard events={loadedProducts} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>로딩중...</p>}>
        <Await resolve={reviews}>
          {(loadedReviews) => <ReviewList events={loadedReviews} />}
        </Await>
      </Suspense>
    </>
  );
};

export default FarmerDetailPage;

//파머정보 상세보기 화면
const loadFarmerInfo = async (farmerId) => {
  try {
    const response = await API.get(`/${farmerId}`);

    if (response.status !== 200) {
      throw new Error('해당 파머 정보를 불러오기에 실패했습니다.');
    }

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('에러 발생:', error.message);
    throw error;
  }
};

//파머 판매상품 보기 화면
const loadProducts = async (farmerId) => {
  const response = await API.get(`${farmerId}/products`);

  if (!response.ok) {
    throw json(
      { message: '파머가 판매중인 상품 불러오기 실패' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.products;
  }
};

//파머 후기 보기 화면
const loadReviews = async (farmerId) => {
  const response = await API.get(`${farmerId}/reviews`);

  if (!response.ok) {
    throw json(
      { message: '파머 리뷰 조회 실패' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.reivews;
  }
};

//속도가 다른 요청을 defer로 가져옴
export const loader = async ({ request, params }) => {
  const farmerId = params.farmerId;

  return defer({
    farmerInfo: await loadFarmerInfo(farmerId),
    products: loadProducts(farmerId),
    reviews: loadReviews(farmerId),
  });
};
