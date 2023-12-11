import React from 'react';
import { Link } from 'react-router-dom';
import style from './Pagination.module.css';

const Pagination = () => {
  return (
    <div className={style.pagination}>
      <Link to="#">❮</Link>
      <Link to="#">2</Link>
      <Link to="#">3</Link>
      <Link to="#">1</Link>
      <Link to="#">4</Link>
      <Link to="#">5</Link>
      <Link to="#">6</Link>
      <Link to="#">7</Link>
      <Link to="#">8</Link>
      <Link to="#">9</Link>
      <Link to="#">10</Link>
      <Link to="#">❯</Link>
    </div>
  );
};
export default Pagination;
