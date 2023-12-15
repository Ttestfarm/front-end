import React, { useEffect, useState } from "react";
import style from "./ReviewList.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import ReviewCard from "../../components/FarmersDetail/ReviewCard";
import * as API from "../../api/index";

const ReviewList = ({ farmerId }) => {
  const [reviewList, setReviewList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo] = useState({});

  useEffect(() => {
    const getLists = async () => {
      const response = await API.get(`/findfarmer/${farmerId}/review/${page}`);
      console.log(response.data.pageInfo);
      console.log(response.data.reviewList);
      setReviewList(response.data.reviewList);
    };
    getLists();
  }, [page]);

  const onChangePage = (_, value) => {
    setPage(value);
  };

  return (
    <div className={style.reviewList}>
      <main className={style["reviewlistcard"]}>
        {reviewList.length > 0
          ? reviewList.map((review) => (
              <ReviewCard key={reviewList.reviewId} review={review} />
            ))
          : "등록된 리뷰가 없습니다."}
        <Stack spacing={2}>
          <Pagination
            className={style.Pagination}
            count={pageInfo.allPage}
            page={page}
            onChange={onChangePage}
            size="small"
          />
        </Stack>
      </main>
    </div>
  );
};

export default ReviewList;
