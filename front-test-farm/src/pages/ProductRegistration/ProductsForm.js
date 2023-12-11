import React, { useRef, useState } from "react";
import style from "./ProductsForm.module.css";
import { FilePreview } from "../../components/Functions/FilePreview";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ProductsForm = () => {
  const [product, setProduct] = useState({
    productName: "",
    Quantity: "",
    price: "",
    stock: "",
    productDescription: "",
  });

  //썸네일 파일
  const [mainFile, setMainFile] = useState(null);
  const handleMainFileChange = (e) => {
    setMainFile(e.target.files[0]);
  };
  //추가 파일
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const handleAdditionalFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 4);
    setAdditionalFiles(selectedFiles);
  };

  const navigate = useNavigate();
  const [isFreeShipping, setIsFreeShipping] = useState(true);
  const handleShippingChange = (e) => {
    setIsFreeShipping(e.target.value === "무료배송");
  };
  const [isAdditionalFeeEnabled, setIsAdditionalFeeEnabled] = useState(true);
  const handleAdditionalFeeChange = (e) => {
    setIsAdditionalFeeEnabled(e.target.value === "설정");
  };

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("Quantity", product.Quantity);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("productDescription", product.productDescription);
    formData.append("mainFile", mainFile);
    for (let additionalfile of additionalFiles) {
      formData.append("additionalFiles", additionalfile);
    }
    axios
      .post("http://localhost:8090/regprod", formData)
      .then((res) => {
        let productId = res.data;
        console.log(productId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className={style.container}>
        <form>
          <div className={style.row}>
            <div className={style["col1"]}>
              <label htmlFor="productName">상품명</label>
            </div>
            <div className={style["col2"]}>
              <input type="text" id="productName" name="productName" />
            </div>
          </div>
          <div className={style.row}>
            <div className={style["col11"]}>
              <label htmlFor="quantity">판매</label>
              <div className={style.col111}>
                개수 혹은 kg 단위로 적어주세요.
              </div>
            </div>
            <div className={style["col2"]}>
              <input type="text" id="quantity" name="quantity" />
            </div>
          </div>
          <div className={style.row}>
            <div className={style["col1"]}>
              <label htmlFor="price">판매가</label>
            </div>
            <div className={style["col2"]}>
              <input type="text" id="price" name="price" />
            </div>
          </div>
          <div className={style.row}>
            <div className={style["col1"]}>
              <label htmlFor="stock">재고수량</label>
            </div>
            <div className={style["col2"]}>
              <input type="text" id="stock" name="stock" />
            </div>
          </div>
          <div className={style.row}>
            <div className={style["col1"]}>
              <label htmlFor="productDescription">상품설명</label>
            </div>
            <div className={style["col2"]}>
              <textarea
                id="productDescription"
                name="productDescription"
              ></textarea>
            </div>
          </div>

          <div className={style.row}>
            <div className={style["col1"]}>
              <label htmlFor="thumbNail">상품 대표 이미지</label>
            </div>
            <div className={style["col2"]}>
              <input
                className={style.input}
                type="file"
                name="mainFile"
                accept="image/*"
                onChange={(e) => setMainFile(Array.from(e.target.files))}
              />
              <input className="thumbNail" type="file" name="mainFile" hidden />{" "}
            </div>
            {FilePreview(mainFile, 1)}
          </div>
          <div className={style.row}>
            <div className={style["col11"]}>
              <label htmlFor="thumbNail">상품 추가 이미지</label>
              <div className={style.col111}>최대 4개</div>
            </div>

            <div className={style["col2"]}>
              <input
                className={style.input}
                type="file"
                name="additionalFiles"
                accept="image/*"
                multiple
                onChange={handleAdditionalFilesChange}
              />
              <input
                className="thumbNail"
                type="file"
                name="additionalFiles"
                hidden
              />{" "}
            </div>
            {FilePreview(additionalFiles, 4)}
          </div>

          <div className={style.row}>
            <div className={style["col1"]}>
              <label htmlFor="category">카테고리 등록</label>
            </div>
            <div className={style["col2"]}>
              <input type="text" id="category" name="category" />
            </div>
          </div>
          <div className={style.row}>
            <div className={style["col1"]}>
              <label htmlFor="ShippingFee">배송비</label>
            </div>
            <div className={style["col2"]}>
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
                <span className={style.radioStyles}>기본 배송비</span>
              </label>
            </div>
          </div>
          <div className={style.row}>
            <div className={style["col1"]}>
              <label htmlFor="shippingCondition">배송비 조건</label>
            </div>
            <div className={style["col2"]}>
              <input
                type="text"
                id="shippingPrice"
                name="shippingPrice"
                disabled={isFreeShipping}
              />
              <div>개마다 기본 배송비 부과</div>
            </div>
          </div>

          <div className={style.row}>
            <div className={style["col1"]}>
              <label htmlFor="AdditionalFee">
                {" "}
                제주, 도서 산간 추가 배송비
              </label>
            </div>
            <div className={style["col2"]}>
              {" "}
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
          <div className={style.row}>
            <div className={style["col1"]}>
              <label htmlFor="additionalFees"> 추가 배송비</label>
            </div>
            <div className={style["col2"]}>
              <input
                type="text"
                name="additionalFees"
                disabled={!isAdditionalFeeEnabled}
              />
            </div>
          </div>
          <br />
          <div className={style.buttons}>
            <button type="reset" className={style.rewrite}>
              다시쓰기
            </button>
            <button className={style.reg} onClick={submit}>
              상품 등록
            </button>
            <button className={style.back}>돌아가기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductsForm;
