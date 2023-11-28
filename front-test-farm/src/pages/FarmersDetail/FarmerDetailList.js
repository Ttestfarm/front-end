import React from "react";
import FarmerDetailCard from "./FarmerDetailCard";
import Pagination from "./Pagination";
import ReviewList from "./ReviewList";
import ReviewCard from "./ReviewCard";

import style from "./FarmerDetailList.module.css";
import ProductCard from "./ProductDetailCard";

const FarmerDetailList = () => {
    return (
        <div className={style.all}>
            <FarmerDetailCard />
            <Pagination />
            <ProductCard />
            <ReviewList />
            {/* <Pagination /> */}
        </div>
    );
};

export default FarmerDetailList;
