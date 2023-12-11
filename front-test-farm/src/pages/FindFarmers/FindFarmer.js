import { useLoaderData, json, defer, Await } from 'react-router-dom';
import React, { Suspense } from 'react'; // 데이터가 도착하기 전에 폴백을 보여주기 위해 사용하는 리액트
import * as API from '../../api/index';

import FarmersList from '../../components/Farmers/FarmersList';
//import { farmerCardsData } from '../../components/Farmers/dummyData';

const FindFarmerPage = ({ params }) => {
  //data 의 events 키에 해당하는 리턴 값을 구조분해할당
  const { farmers, sortType, keyword } = useLoaderData();
  console.log(farmers, sortType, keyword);

  return (
    <Suspense
      fallback={
        <p style={{ textAlign: 'center' }}>
          farmer 리스트를 불러오는 중<br /> 로딩화면있으면 좋겠당....
        </p>
      }
    >
      <Await resolve={farmers}>
        {(loadedFarmers) => <FarmersList events={loadedFarmers} />}
      </Await>
    </Suspense>
  );
};

export default FindFarmerPage;

//파머리스트 불러오기
const loadFarmers = async ({ keyword, sortType }) => {
  //데이터 쌓으면 삭제할 부분
  // const farmers = farmerCardsData;
  // console.log('farmers', farmers);
  // return farmers;
  //끝
  console.log('2');
  try {
    let response;

    if (keyword) {
      response = await API.get(`/${keyword}`);
      console.log('1');
    } else {
      switch (sortType) {
        case 'rating':
          response = await API.get(`/rating`);
          console.log('2');
          break;
        case 'followCount':
          response = await API.get(`/followCount`);
          console.log('3');
          break;
        default:
          response = await API.get('');
          console.log('4');
          break;
      }
    }
    if (response.status !== 200) {
      throw new Error('파머리스트 불러오기에 실패했습니다.');
    }

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const loader = ({ params }) => {
  const { keyword, sortType } = params;
  console.log('1', keyword, sortType);
  return defer({
    farmers: loadFarmers({ keyword, sortType }),
    keyword,
    sortType,
  });
};
