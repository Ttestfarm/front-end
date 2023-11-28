import React, { useRef, useState } from "react";
import style from "./ProductsForm.module.css";

const ProductsForm = () => {
    const [isFreeShipping, setIsFreeShipping] = useState(true); // 상태 추가: 기본값으로 무료배송 선택
    const handleShippingChange = (e) => {
        setIsFreeShipping(e.target.value === "무료배송");
    };

    const [isAdditionalFeeEnabled, setIsAdditionalFeeEnabled] = useState(true); //기본값 설정 선택

    const handleAdditionalFeeChange = (e) => {
        setIsAdditionalFeeEnabled(e.target.value === "설정");
    };
    const [files, setFiles] = useState([]);

    return (
        <div>
            <h2>Products Form</h2>

            <div className={style.container}>
                <form action="/action_page.php">
                    <div className={style.row}>
                        <div className={style["col-25"]}>
                            <label htmlFor="productName">상품명</label>
                        </div>
                        <div className={style["col-75"]}>
                            <input
                                type="text"
                                id="productName"
                                name="productName"
                                placeholder="상품명을 입력하세요.."
                            />
                        </div>
                    </div>
                    <div className={style.row}>
                        <div className={style["col-25"]}>
                            <label htmlFor="Quantity">판매</label>
                        </div>
                        <div className={style["col-75"]}>
                            <input type="text" id="Quantity" name="Quantity" />
                        </div>
                    </div>
                    <div className={style.row}>
                        <div className={style["col-25"]}>
                            <label htmlFor="price">판매가</label>
                        </div>
                        <div className={style["col-75"]}>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                placeholder="상품명을 입력하세요.."
                            />
                        </div>
                    </div>
                    <div className={style.row}>
                        <div className={style["col-25"]}>
                            <label htmlFor="stock">재고수량</label>
                        </div>
                        <div className={style["col-75"]}>
                            <input
                                type="text"
                                id="stock"
                                name="stock"
                                placeholder="상품명을 입력하세요.."
                            />
                        </div>
                    </div>
                    <div className={style.row}>
                        <div className={style["col-25"]}>
                            <label htmlFor="productDescription">상품설명</label>
                        </div>
                        <div className={style["col-75"]}>
                            <textarea
                                id="productDescription"
                                name="productDescription"
                                placeholder="상품 설명을 입력하세요.."
                                style={{ height: "200px" }}
                            ></textarea>
                        </div>
                    </div>

                    <div className={style.row}>
                        <div className={style["col-25"]}>
                            <label htmlFor="thumbNail">상품 대표 이미지</label>
                        </div>
                        <div className={style["col-75"]}>
                            <input
                                className={style.input}
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setFiles(Array.from(e.target.files))
                                }
                            />
                            <input className="thumbNail" type="file" hidden />{" "}
                        </div>
                    </div>
                    <div className={style.row}>
                        <div className={style["col-25"]}>
                            <label htmlFor="thumbNail">상품 추가 이미지</label>
                        </div>
                        <div className={style["col-75"]}>
                            <input
                                className={style.input}
                                type="file"
                                name="file"
                                accept="image/*"
                                multiple
                                onChange={(e) =>
                                    setFiles(Array.from(e.target.files))
                                }
                            />
                            <input className="thumbNail" type="file" hidden />{" "}
                        </div>
                    </div>

                    <div className={style.row}>
                        <div className={style["col-25"]}>
                            <label htmlFor="category">카테고리 등록</label>
                        </div>
                        <div className={style["col-75"]}>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                // placeholder="상품명을 입력하세요.."
                            />
                        </div>
                    </div>
                    <div className={style.row}>
                        <div className={style["col-25"]}>
                            <label htmlFor="ShippingFee">배송비</label>
                        </div>
                        <div className={style["col-75"]}>
                            <input
                                type="radio"
                                value="무료배송"
                                checked={isFreeShipping}
                                onChange={handleShippingChange}
                                name="shippingType"
                            />
                            <span>무료배송</span>
                            <input
                                type="radio"
                                value="기본 배송비"
                                checked={!isFreeShipping}
                                onChange={handleShippingChange}
                                name="shippingType"
                            />
                            <span>기본 배송비</span>
                        </div>
                    </div>
                    <div className={style.row}>
                        <div className={style["col-25"]}>
                            <label htmlFor="shippingCondition">
                                배송비 조건
                            </label>
                        </div>
                        <div className={style["col-75"]}>
                            <input
                                type="text"
                                id="productPrice"
                                name="productPrice"
                                placeholder="가격을 입력하세요.."
                                disabled={isFreeShipping}
                            />
                            <div>개마다 기본 배송비 부과</div>
                        </div>
                    </div>

                    <div className={style.row}>
                        <div className={style["col-25"]}>
                            <label htmlFor="AdditionalFee">
                                {" "}
                                제주, 도서 산간 추가 배송비
                            </label>
                        </div>
                        <div className={style["col-75"]}>
                            {" "}
                            <input
                                type="radio"
                                value="설정"
                                checked={isAdditionalFeeEnabled}
                                onChange={handleAdditionalFeeChange}
                                name="additionalFeeType"
                            />
                            <span>설정</span>
                            <input
                                type="radio"
                                value="설정 안함"
                                checked={!isAdditionalFeeEnabled}
                                onChange={handleAdditionalFeeChange}
                                name="additionalFeeType"
                            />
                            <span>설정 안함</span>
                        </div>
                    </div>
                    <div className={style.row}>
                        <div className={style["col-25"]}>
                            <label htmlFor="additionalFees"> 추가 배송비</label>
                        </div>
                        <div className={style["col-75"]}>
                            <input
                                type="text"
                                placeholder="추가 배송비"
                                disabled={!isAdditionalFeeEnabled}
                            />
                        </div>
                    </div>
                    <br />
                    <div className={style.row}>
                        <button className={style.rewrite}>다시쓰기</button>
                        <button className={style.reg}>상품 등록</button>
                        <button className={style.back}>돌아가기</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductsForm;
