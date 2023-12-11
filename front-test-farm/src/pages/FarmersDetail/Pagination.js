import React, { useState, useEffect } from "react";
import style from "./Pagination.module.css";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수 상태
  useEffect(() => {
    // API 호출 등을 통해 전체 페이지 수를 받아오는 로직
    // setTotalPages(totalPagesFromAPI); // API에서 받아온 전체 페이지 수로 설정
    // 임시로 totalPages를 10으로 설정한 예시
    setTotalPages(10);
  }, []);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <a
        key={i}
        href="#"
        onClick={() => handlePageClick(i)}
        className={currentPage === i ? style.active : ""}
      >
        {i}
      </a>
    );
  }
  return (
    <div className={style.pagination}>
      <a href="#">❮</a>
      <a href="#">1</a>
      <a href="#">2</a>
      <a href="#">3</a>
      <a href="#">4</a>
      <a href="#">5</a>
      <a href="#">6</a>
      <a href="#">7</a>
      <a href="#">8</a>
      <a href="#">9</a>
      <a href="#">10</a>
      <a href="#">❯</a>
    </div>
  );
};
export default Pagination;
