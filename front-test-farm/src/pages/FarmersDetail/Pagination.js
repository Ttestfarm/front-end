import React from 'react';
import style from './Pagination.module.css';

const Pagination = () => {
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
