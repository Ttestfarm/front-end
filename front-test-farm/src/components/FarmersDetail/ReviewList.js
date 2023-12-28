import React, { useEffect, useState } from 'react';
import style from './ReviewList.module.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import ReviewCard from '../../components/FarmersDetail/ReviewCard';
import * as API from '../../api/index';

const ReviewList = ({ farmerId }) => {
  const [reviewList, setReviewList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    allPage: 1,
    curPage: 1,
    startPage: 1,
    endPage: 0,
  });

  useEffect(() => {
    const getLists = async () => {
      const response = await API.get(`/findfarmer/${farmerId}/review/${page}`);
      console.log(response.data.reviewList);
      setReviewList(response.data.reviewList);
      setPageInfo(response.data.pageInfo);
      console.log('리뷰페이지', pageInfo);
    };

    getLists();
  }, [page]);

  const onChangePage = (_, value) => {
    setPage(value);
  };

  return (
    <main className={style.list}>
      <div className={style.reviewList}>
        {reviewList.length > 0 ? (
          reviewList.map((review) => (
            <ReviewCard
              key={review.reviewId}
              review={review}
            />
          ))
        ) : (
          <div className={style.infoText}>등록된 리뷰가 없습니다.</div>
        )}
      </div>
      <div className={style.pagination}>
        <Stack spacing={2}>
          <Pagination
            className={style.Pagination}
            count={pageInfo?.allPage}
            page={pageInfo?.curPage}
            onChange={onChangePage}
            size="small"
          />
        </Stack>
      </div>
    </main>
  );
};

export default ReviewList;
