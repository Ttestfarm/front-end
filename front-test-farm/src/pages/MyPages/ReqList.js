import React, { useEffect, useState } from 'react';
import style from './ReqList.module.css';
import * as API from '../../api/index';
import ReqCard from '../../components/myPages/ReqCard';

const ReqListPage = () => {
  const [reqList, setReqList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await API.get('/user');

      console.log(response.data.requestWithCountList);
      setReqList(response.data.requestWithCountList);
    }
    fetchData();
  }, []);
  return (
    <>
      {reqList.length > 0 &&
        reqList.map((reqItem) => (
          <ReqCard
            key={reqItem.request.requestId}
            req={reqItem}
          />
        ))}
    </>
  );
};

export default ReqListPage;
