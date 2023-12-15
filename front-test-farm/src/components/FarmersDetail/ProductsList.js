import { useState, useEffect } from "react";
import style from "./ProductsList.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import ProductCard from "../../components/FarmersDetail/ProductCard";
import * as API from "../../api/index";

const ProductsList = ({ farmerId }) => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);

  //파머의 판매상품 최신순 불러오기
  useEffect(() => {
    const getLists = async () => {
      const response = await API.get(`/findfarmer/${farmerId}/product/${page}`);
      console.log(response.data.pageInfo.allPage);
      console.log(response.data);
      setProductList(response.data.productList);
    };
    getLists();
  }, [page]);

  const onChangePage = (_, value) => {
    setPage(value);
  };

  return (
    <>
      <main className={style.productList}>
        {productList.length > 0
          ? productList.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))
          : "현재 판매중인 상품이 없습니다."}
        <Stack spacing={2}>
          <Pagination
            className={style.pagination}
            // count={productList?.pageInfo.allPage}
            page={page}
            onChange={onChangePage}
            size="small"
          />
        </Stack>
      </main>
    </>
  );
};

export default ProductsList;
