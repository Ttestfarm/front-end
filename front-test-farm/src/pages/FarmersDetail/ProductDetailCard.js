import React from "react";
import style from "./ProductDetailCard.module.css";
import Pagination from "./Pagination";

const ProductDetailCard = ({
    imageUrl,
    productName,
    price,
    quantity,
    stock,
}) => {
    const imageStyle = {
        width: "200px",
        height: "200px",
        border: "1px solid black",
    };

    return (
        <>
            <div className={style.productDetailCard}></div>
            <Pagination />
        </>
    );
};
export default ProductDetailCard;
