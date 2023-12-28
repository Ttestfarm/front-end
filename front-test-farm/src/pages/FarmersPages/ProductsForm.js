import React, { useRef, useState } from 'react';
import style from './style/ProductsForm.module.css';
import Card from '../../components/UI/Card';
import image from '../../assets/blankimage.png';
import leftimg from '../../assets/quotform.jpg';
import { tokenAtom } from '../../recoil/Atoms'; //리코일 
import { useRecoilValue } from 'recoil'; // 리코일
import * as API from '../../api/index';
import { Form, Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';

const ProductsForm = () => {
  const token = useRecoilValue(tokenAtom); //리코일
  const [isFreeShipping, setIsFreeShipping] = useState('free'); // 상태 추가: 기본값으로 무료배송 선택
  const handleShippingChange = (e) => {
    setIsFreeShipping(e.target.value);
  };
  const navigate = useNavigate();
  const [titleImage, setTitleImage] = useState();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    product: '',
    price: null,
    quantity: null,
    stock: null,
    description: '',
    category: '',
    shippingFee: ''
  });

  const [isAdditionalFeeEnabled, setIsAdditionalFeeEnabled] = useState(true); //기본값 설정 선택

  const handleAdditionalFeeChange = (e) => {
    setIsAdditionalFeeEnabled(e.target.value === "설정");
  };

  const handleSetTab = (e) => {
    // console.log(e.keyCode);
    if (e.keyCode === 9) {
      e.preventDefault();
      let val = e.target.value;
      let start = e.target.selectionStart;
      let end = e.target.selectionEnd;
      e.target.value = val.substring(0, start) + '\t' + val.substring(end);
      e.target.selectionStart = e.target.selectionEnd = start + 1;
      handleInputChange(e);
      return false; //  prevent focus
    }
  };

  let selectImg = null;
  const inputStyle = { width: '90%', margin: 1, color: 'success' };
  const [files, setFiles] = useState([
    image, image, image, image
  ]);

  const deleteClick = (idx) => {
    files.splice(idx, 1, image)
    setFiles([...files]);
  }

  const imageClick = (e) => {
    selectImg = e;
    document.getElementById("file").click();
  }

  const fileChange = (e) => {
    let filearr = e.target.files;
    setFiles([...filearr]);
  }

  const handleInputChange = (e) => {
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
    try {
      e.preventDefault();
      const formDataObj = new FormData();
      formDataObj.append('productName', formData.product);
      formDataObj.append('productPrice', formData.price);
      formDataObj.append('productQuantity', formData.quantity);
      formDataObj.append('productStock', formData.stock);
      formDataObj.append('productDescription', formData.description);

      if ( isFreeShipping === 'free') {
        formDataObj.append('ShippingCost', 0);
      } else {
        formDataObj.append('ShippingCost', formData.shippingFee);
      }

      formDataObj.append("titleImage", titleImage);
      files.forEach((image) => {
        formDataObj.append('images', image);
      });

      console.log(formDataObj.get('images'));

      const response = await API.formPost(`/farmer/regproduct`, token, formDataObj);
      const data = response.data;

      console.log(response);
      navigate('/farmerpage/');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className={style.container}>
      <Card width="80%">
        <h1>상품 등록</h1>
        <Form onSubmit={submitServer}>
          <div className={style.main}>
            <div className={style.left}>
              <img
                src={leftimg}
                alt="이미지 없음"
              />
            </div>
            <div className={style.right}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="product"
                label="품목명"
                sx={inputStyle}
                size="small"
                color="success"
                placeholder="품목명을 입력해주세요"
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="price"
                label="금액"
                sx={inputStyle}
                size="small"
                color="success"
                placeholder="판매 금액을 입력해주세요"
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="quantity"
                label="수량"
                sx={inputStyle}
                size="small"
                color="success"
                placeholder=""
                helperText="1 박스의 kg 수를 입력해주세요."
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="stock"
                label="재고"
                sx={inputStyle}
                size="small"
                color="success"
                placeholder="판매할 상품의 재고를 입력해주세요"
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                label="추가 설명"
                id="outlined-multiline-flexible"
                name="description"
                rows={3}
                multiline
                onChange={handleInputChange}
                onKeyDown={(e) => handleSetTab(e)}
                sx={inputStyle}
                size="small"
                color="success"
                placeholder='파머님이 추가로 고객님에게 남기고 싶은 말을 적어주세요.'
              />
              <div className={style.shippingradio}>
                <input
                  type="radio"
                  name="shippingType"
                  value="free"
                  checked={isFreeShipping === 'free'}
                  onChange={handleShippingChange}
                />
                무료배송
                <input
                  type="radio"
                  name="shippingType"
                  value="notFree"
                  checked={isFreeShipping === 'notFree'}
                  onChange={handleShippingChange}
                />
                기본 배송비
              </div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="shippingFee"
                label="배송비"
                sx={inputStyle}
                size="small"
                color="success"
                placeholder="배송비를 입력해주세요"
                onChange={handleInputChange}
                disabled={isFreeShipping === 'free'}
              />
            </div>
          </div>
          <div className={style.picture}>
            <span>*실제 판매되는 상품의 사진이면 더욱 좋습니다(대표 사진)</span>
            <label htmlFor='file'>사진 첨부</label>
            <input name='titleImage' type='file' id='file' accept='image/*' onChange={handelTitleImageChange} />
          </div>
          <div className={style.images}>
            <img
              src={image}
              alt='이미지 없음'
              width={"100px"}
              height={"100px"}
              onClick={imageClick}
            />
          </div>
          <div className={style.picture}>
            <span>*실제 판매되는 상품의 사진이면 더욱 좋습니다(최대 4장)</span>
            <label htmlFor='files'>사진 첨부</label>
            <input name='files' type='file' id='files' multiple="multiple" accept='image/*' onChange={fileChange} />
          </div>
          <div className={style.images}>
            {files.map((file, index) =>
              <div key={index}>
                {file !== image ?
                  <button onClick={() => deleteClick(index)}>x</button> :
                  ''
                }
                <img
                  src={image}
                  alt='이미지 없음'
                  id={index}
                  width={"100px"}
                  height={"100px"}
                  onClick={imageClick}
                />
              </div>
            )}
          </div>
          <br />
          <div className={style.footer}>
            <button className={style.btn1}>다시쓰기</button>
            <button className={style.btn2} type="submit">
              상품 등록
            </button>
            <button className={style.btn1}><Link to={`/farmerpage/requestlist`}>돌아가기</Link></button>
          </div>


        </Form>
      </Card>
    </div >
  );
};

export default ProductsForm;
