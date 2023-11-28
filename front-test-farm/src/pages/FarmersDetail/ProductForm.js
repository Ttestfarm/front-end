import React from "react";

const ProductForm = ({
    productname,
    quantity,
    stockquantity,
    description,
    farmName,
    itemName,
}) => {
    const imageStyle = {};

    return (
        <div className="product-form">
            <div className="review-contents">
                <div className="nickname">{nickname}님</div>
                <div className="rating">{renderStars(starRating)}</div>
                <div className="details">
                    <span className="date">{date}</span>
                    <span className="farm-name">{farmName}</span>
                    <span className="item-name">{itemName}</span>
                    <span className="quantity">{quantity}</span>
                </div>
                <div className="content">{content}</div>
            </div>
        </div>
    );
};

export default ProductForm;
