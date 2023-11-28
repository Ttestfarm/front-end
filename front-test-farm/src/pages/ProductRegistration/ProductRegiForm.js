import React, { useRef, useState } from "react";
// import Input from "../UI/Input";
// import { InputHTMLAttributes } from "react";
// import Input from "../../components/UI/Input"; // Input 컴포넌트 경로 지정
import { FilePreview } from "../../components/Functions/FilePreview";
import style from "./ProductRegiForm.module.css";
const ProductRegiForm = () => {
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
        <form className={`${style.form} ${style.center}`}>
            <div className={style.product}>
                <label htmlFor="productName" className={style.label}>
                    상품명
                </label>
                <input className={style.productName} placeholder="상품명" />
            </div>
            <div className={style.product}>
                <label htmlFor="Quantity" className={style.label}>
                    판매
                </label>
                <input className={style.quantity} />
                <div className={style.quant}>
                    개수 혹은 kg단위로 적어주세요{" "}
                </div>
            </div>
            <div className={style.product}>
                <label htmlFor="price" className={style.label}>
                    판매가
                </label>
                <input className={style.price} placeholder="판매가" />
            </div>
            <div className={style.product}>
                <label htmlFor="stock" className={style.label}>
                    재고수량
                </label>
                <input className={style.stock} placeholder="재고수량" />
            </div>
            <div className={style.product}>
                <label htmlFor="description" className={style.label}>
                    상품설명
                </label>
                <textarea
                    className={style.descript}
                    placeholder="상품 설명"
                ></textarea>
            </div>

            <div className={`${style.product} ${style.img}`}>
                <label htmlFor="thumbnail" className={style.labelImage}>
                    상품 대표 이미지
                </label>
                <input
                    className={style.input}
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={(e) => setFiles(Array.from(e.target.files))}
                />

                <input className="thumbNail" type="file" hidden />
            </div>
            {FilePreview(files, 1)}
            <div className={`${style.product} ${style.img}`}>
                {/* <div className={style.imgs}> */}
                <label className={style.labelImage}>상품 추가 이미지</label>

                <input
                    className={style.input}
                    type="file"
                    name="file"
                    multiple
                />
            </div>
            <div className={style.product}>
                <label htmlFor="category" className={style.label}>
                    카테고리 등록
                </label>
                <input className={style.category} placeholder="카테고리 등록" />
            </div>

            <div className={`${style.radio} ${style.img}`}>
                <label
                    htmlFor="radioButton"
                    className={`${style.label} ${style.ships}`}
                >
                    배송비
                </label>
                <div className={style.radioButton}>
                    <label className={style.radioStyle}>
                        <input
                            type="radio"
                            value="무료배송"
                            checked={isFreeShipping}
                            onChange={handleShippingChange}
                            name="shippingType"
                        />
                        <span>무료배송</span>
                    </label>
                    <label className={style.radioStyle}>
                        <input
                            type="radio"
                            value="기본 배송비"
                            checked={!isFreeShipping}
                            onChange={handleShippingChange}
                            name="shippingType"
                        />
                        <span>기본 배송비</span>
                    </label>
                </div>
            </div>
            <div className={style.product}>
                <>
                    <label htmlFor="shippingCondition" className={style.label}>
                        배송비 조건
                    </label>
                    <input
                        className={style.shippingCondition}
                        disabled={isFreeShipping}
                    />
                </>
                <div className={style.ex}>개마다 기본 배송비 부과</div>
            </div>
            <div className={style.radio}>
                <label
                    htmlFor="radioButton2"
                    className={`${style.label} ${style.ship}`}
                >
                    제주, 도서 산간 추가 배송비
                </label>
                <div className={style.radioButton}>
                    <label className={style.radioStyle}>
                        <input
                            type="radio"
                            value="설정"
                            checked={isAdditionalFeeEnabled}
                            onChange={handleAdditionalFeeChange}
                            name="additionalFeeType"
                        />
                        <span>설정</span>
                    </label>
                    <label className={style.radioStyle}>
                        <input
                            type="radio"
                            value="설정 안함"
                            checked={!isAdditionalFeeEnabled}
                            onChange={handleAdditionalFeeChange}
                            name="additionalFeeType"
                        />
                        <span>설정 안함</span>
                    </label>
                </div>
            </div>
            <div className={style.product}>
                <label htmlFor="additionalFee" className={style.label}>
                    추가 배송비
                </label>
                <input
                    className={style.additionalFee}
                    placeholder="추가 배송비"
                    disabled={!isAdditionalFeeEnabled}
                />
            </div>
            <div className={style.buttons}>
                <button className={style.rewrite}>다시쓰기</button>
                <button className={style.reg}>상품 등록</button>
                <button className={style.back}>돌아가기</button>
            </div>
        </form>
    );
};

export default ProductRegiForm;
