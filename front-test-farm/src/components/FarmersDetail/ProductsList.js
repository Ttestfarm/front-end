import { useState, useEffect } from 'react';
import style from './ProductsList.module.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import ProductCard from '../../components/FarmersDetail/ProductCard';
import * as API from '../../api/index';

const ProductsList = ({ farmerId }) => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});

  //파머의 판매상품 최신순 불러오기
  useEffect(() => {
    const getLists = async () => {
      const response = await API.get(`/findfarmer/${farmerId}/product/${page}`);
      setProductList(response.data.productList);
      setPageInfo(response.data.pageInfo);
    };
    getLists();
  }, [page]);

  const onChangePage = (_, value) => {
    setPage(value);
  };

  return (
    <>
      <main className={style.list}>
        <div className={style.productList}>
          {productList.length > 0 ? (
            productList.map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
              />
            ))
          ) : (
            <div className={style.infoText}>현재 판매중인 상품이 없습니다.</div>
          )}
        </div>
        <div className={style.pagination}>
          <Stack spacing={2}>
            <Pagination
              count={pageInfo?.allPage}
              page={page}
              onChange={onChangePage}
              size="small"
            />
          </Stack>
        </div>
      </main>
      <hr />
    </>
  );
};

export default ProductsList;
