import React, { useEffect, useState } from 'react';
import style from './ReqList.module.css';
import * as API from '../../api/index';
import ReqCard from '../../components/myPages/ReqCard';
import { tokenAtom } from '../../recoil/Atoms'; //리코일 
import { useRecoilValue } from 'recoil'; // 리코일

const ReqListPage = () => {
  const token = useRecoilValue(tokenAtom); //리코일
  const [reqList, setReqList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await API.get('/user', token); // 리코일토큰을 넣어서 요청 

      console.log(response.data.requestWithCountList);
      setReqList(response.data.requestWithCountList);
    }
    fetchData();
  }, []);
  return (
    <>
      {reqList.length > 0
        ? reqList.map((reqItem) => (
            <ReqCard
              key={reqItem.request.requestId}
              req={reqItem}
            />
          ))
        : '등록된 요청서가 없습니다.'}
    </>
  );
};

export default ReqListPage;
