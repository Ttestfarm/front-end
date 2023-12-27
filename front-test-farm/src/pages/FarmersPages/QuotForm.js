import React, { useEffect, useRef, useState } from 'react';
import style from './style/QuotForm.module.css';
import Card from '../../components/UI/Card';
import { Form, Link, useNavigate, useParams } from 'react-router-dom';
import image from '../../assets/blankimage.png';
import leftimg from '../../assets/quotform.jpg';
import { tokenAtom } from '../../recoil/Atoms'; //리코일 
import { useRecoilValue } from 'recoil'; // 리코일
import * as API from '../../api/index';
import { TextField } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const QuotForm = () => {
  const token = useRecoilValue(tokenAtom); //리코일
  const request = useParams();
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    'requestId': `${request.requestId}`,
    'product': `${request.requestProduct}`,
    'quantity': `${request.requestQuantity}`,
    'delivery': '',
    'price': '',
    'comment': '',
    'picture': '',
  });

  const inputStyle = { width: '90%', margin: 1, color: 'success' };

  let selectImg = null;
  const [files, setFiles] = useState([
    image, image, image, image, image
  ]);

  const fileChange = (e) => {
    let filearr = e.target.files;
    setFiles([...filearr]);
  }


  const handleSetTab = (e) => {
    console.log(e.keyCode);
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

  const deleteClick = (idx) => {
    files.splice(idx, 1, image)
    setFiles([...files]);
  }

  const imageClick = (e) => {
    selectImg = e;
    document.getElementById("file").click();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const SendHandler = async (e) => {
    try {
      e.preventDefault();
      const formDataObj = new FormData();
      formDataObj.append('requestId', formData.requestId);
      formDataObj.append('quotationProduct', formData.product);
      formDataObj.append('quotationQuantity', formData.quantity);
      formDataObj.append('quotationDelivery', formData.delivery);
      formDataObj.append('quotationPrice', formData.price);
      formDataObj.append('quotationComment', formData.comment);

      files.forEach((file, index) => {
        formDataObj.append('images', file);
      });
      const response = await API.formPost('/farmer/regquot', token, formDataObj);

      const data = response.data;

      navigate('/farmerpage/requestlist');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div className={style.container}>
      <Card width="80%">
        <h1>견적서 작성하기</h1>
        <Form onSubmit={SendHandler}>
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
                value={request.requestProduct}
                sx={inputStyle}
                size="small"
                color="success"
                disabled
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="quantity"
                label="수량"
                value={request.requestQuantity}
                sx={inputStyle}
                size="small"
                color="success"
                disabled
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="price"
                label="금액"
                sx={inputStyle}
                size="small"
                color="success"
                placeholder="금액을 입력해주세요"
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="delivery"
                label="배송비"
                sx={inputStyle}
                size="small"
                color="success"
                helperText="무료배송은 숫자 0 입력해주세요"
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                label="추가 설명"
                id="outlined-multiline-flexible"
                name="comment"
                rows={3}
                multiline
                onChange={handleInputChange}
                onKeyDown={(e) => handleSetTab(e)}
                sx={inputStyle}
                size="small"
                color="success"
                placeholder='파머님이 추가로 고객님에게 남기고 싶은 말을 적어주세요.'
              />
            </div>
          </div>
          <div className={style.picture}>
            <span>*실제 판매되는 상품의 사진이면 더욱 좋습니다 (최대 5장)</span>
            <label htmlFor='file'>사진 첨부</label>
            <input name='file' type='file' id='file' multiple="multiple" accept='image/*' onChange={fileChange} />
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
          <div className={style.infobox}>
            <div className={style.title}>
              <ErrorOutlineIcon
                fontSize="small"
                color="success"
              />
              &nbsp;유의사항
            </div>
            <p className={style.padding1}>
              • 파머님! 재고 파악 후 신중하게 보내주세요!
            </p>
            <p>
              • 재고 부족으로 인한 판매 취소가 누적될 경우 패널티가 부과됩니다.<br />(3회 이상 누적 시 요청서 수신이 일주일간 중지됩니다.)
            </p>
            <p>
              • 고객님이 견적서 수락을 하면 바로 결제가 진행됩니다.<br />신속하고 안전한 배송을 준비해주세요.
            </p>
            <p>
              • 추가적으로 생각나는 말이 있다면 적어두도록 하겠습니다.
            </p>
          </div>

          <div className={style.footer}>
            <button className={style.btn1}>견적서 보내기</button>
            <button className={style.btn2}><Link to={'/farmerpage/requestlist'}>돌아가기</Link></button>
          </div>
        </Form >
      </Card>
    </div >
  );
};

export default QuotForm;