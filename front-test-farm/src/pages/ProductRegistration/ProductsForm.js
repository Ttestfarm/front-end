import React, { useRef, useState } from "react";
import axios from "axios";
import style from "./ProductsForm.module.css";

const ProductsForm = () => {
  const [isFreeShipping, setIsFreeShipping] = useState("free"); // 상태 추가: 기본값으로 무료배송 선택
  const handleShippingChange = (e) => {
    setIsFreeShipping(e.target.value);
  };

  const [isAdditionalFeeEnabled, setIsAdditionalFeeEnabled] = useState(true); //기본값 설정 선택

  const handleAdditionalFeeChange = (e) => {
    setIsAdditionalFeeEnabled(e.target.value === "설정");
  };
  const [titleImage, setTitleImage] = useState();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: null,
    stock: null,
    description: "",
    category: "",
    shippingFee: null,
  });

  const [token, setToken] = useState(null);
  const getToken = () => {
    return localStorage.getItem("token"); // 여기서 'your_token_key'는 실제로 사용하는 토큰의 키여야 합니다.
  };

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handelTitleImageChange = (e) => {
    setTitleImage(e.target.files[0]);
  };

  const handelImageChange = (e) => {
    setImages([...images, ...e.target.files]);
  };

  const submitServer = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();

    formDataObj.append("titleImage", titleImage);
    images.forEach((image, index) => {
      formDataObj.append(`image${index + 1}`, image);
    });
    formDataObj.append("name", formData.name);

    console.log(formDataObj);
    const farmerToken = getToken();
    setToken(farmerToken);

    axios
      .post(`http://localhost:8090/regproduct`, formDataObj, {
        headers: {
          Authorization: `${farmerToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ marginLeft: "250px" }}>
      <h2>Products Form</h2>

      <div className={style.container}>
        <form onSubmit={submitServer}>
          <div className={style.row}>
            <div className={style["col-25"]}>
              <label htmlFor="name">상품명</label>
            </div>
            <div className={style["col-75"]}>
              <input
                type="text"
                id="productName"
                name="name"
                value={formData.name}
                placeholder="상품명을 입력하세요.."
                onChange={handelInputChange}
              />
            </div>
          </div>
          <div className={style.row}>
            <div className={style["col-25"]}>
              <label htmlFor="quantity">판매</label>
            </div>
            <div className={style["col-75"]}>
              <input
                type="text"
                id="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handelInputChange}
              />
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
                value={formData.price}
                placeholder="상품명을 입력하세요.."
                onChange={handelInputChange}
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
                value={formData.stock}
                placeholder="상품명을 입력하세요.."
                onChange={handelInputChange}
              />
            </div>
          </div>
          <div className={style.row}>
            <div className={style["col-25"]}>
              <label htmlFor="description">상품설명</label>
            </div>
            <div className={style["col-75"]}>
              <textarea
                id="productDescription"
                name="description"
                value={formData.description}
                placeholder="상품 설명을 입력하세요.."
                style={{ height: "200px" }}
                onChange={handelInputChange}
              ></textarea>
            </div>
          </div>

          <div className={style.row}>
            <div className={style["col-25"]}>
              <label htmlFor="titleImage">상품 대표 이미지</label>
            </div>
            <div className={style["col-75"]}>
              <input
                className={style.input}
                type="file"
                name="titleImage"
                accept="image/*"
                onChange={handelTitleImageChange}
              />
              <input className="thumbNail" type="file" hidden />
              {}
            </div>
          </div>

          <div className={style.row}>
            <div className={style["col-25"]}>
              <label htmlFor="images">상품 추가 이미지</label>
            </div>
            <div className={style["col-75"]}>
              <input
                className={style.input}
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handelImageChange}
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
                value={formData.category}
                onChange={handelInputChange}
                // placeholder="상품명을 입력하세요.."
              />
            </div>
          </div>
          <div className={style.row}>
            <div className={style["col-25"]}>
              <label htmlFor="shippingType">배송비</label>
            </div>
            <div className={style["col-75"]}>
              <input
                type="radio"
                name="shippingType"
                value="free"
                checked={isFreeShipping == "free"}
                onChange={handleShippingChange}
              />
              무료배송
              <input
                type="radio"
                name="shippingType"
                value="notFree"
                checked={isFreeShipping == "notFree"}
                onChange={handleShippingChange}
              />
              기본 배송비
            </div>
          </div>
          <div className={style.row}>
            <div className={style["col-25"]}>
              <label htmlFor="shippingFee">배송비 조건</label>
            </div>
            <div className={style["col-75"]}>
              <input
                type="text"
                id="productPrice"
                name="shippingFee"
                value={formData.shippingFee}
                placeholder="가격을 입력하세요.."
                onChange={handelInputChange}
                disabled={isFreeShipping == "free"}
              />
              <div>개마다 기본 배송비 부과</div>
            </div>
          </div>

          {/* <div className={style.row}>
            <div className={style['col-25']}>
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
                name="additionalFeeType"
                value="설정 안함"
                checked={!isAdditionalFeeEnabled}
                onChange={handleAdditionalFeeChange}
              />
              <span>설정 안함</span>
            </div>
          </div> */}
          {/* <div className={style.row}> */}
          {/* <div className={style['col-25']}>
              <label htmlFor="additionalFees"> 추가 배송비</label>
            </div> */}
          {/* <div className={style['col-75']}>
              <input
                type="text"
                placeholder="추가 배송비"
                disabled={!isAdditionalFeeEnabled}
              />
            </div> */}
          {/* </div> */}
          <br />
          <div className={style.row}>
            <button className={style.rewrite}>다시쓰기</button>
            <button className={style.reg} type="submit">
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
