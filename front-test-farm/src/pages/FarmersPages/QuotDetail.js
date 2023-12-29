import React, { useEffect, useState } from 'react';
import style from './style/QuotForm.module.css';
import Card from '../../components/UI/Card';
import leftimg from '../../assets/quotform.jpg';
import { Link, useParams } from 'react-router-dom';
import image from '../../assets/blankimage.png';
import { TextField } from '@mui/material';
import { tokenAtom } from '../../recoil/Atoms'; //리코일
import { useRecoilValue } from 'recoil'; // 리코일
import * as API from '../../api/index';

const QuotDetail = () => {
  const token = useRecoilValue(tokenAtom); //리코일
  const quotation = useParams();
  const [files, setFiles] = useState([]);
  const images = [image, image, image, image, image];
  const [quot, setQuot] = useState({
    quotationProduct: '',
    quotationQuantity: '',
    quotationPrice: '',
    quotationDelivery: '',
    quotationComment: '',
    quotationPicture: '',
  });
  const inputStyle = { width: '90%', margin: 1, color: 'success' };

  const testFunction = async () => {
    try {
      const response = await API.get(
        `/farmer/quotdetail/${quotation.quotationId}`,
        token
      );
      const data = response.data;
      setQuot(data);
      let fileurl = data.quotationImages;
      if (fileurl !== null && fileurl !== '') {
        let filenums = fileurl.split(',');
        setFiles(filenums);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    testFunction();
  }, []);

  return (
    <div className={style.container}>
      <Card width="100%">
        <h1>견적서 작성하기!</h1>
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
              value={quot.quotationProduct}
              label="품목명"
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
              value={quot.quotationQuantity}
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
              value={quot.quotationPrice}
              sx={inputStyle}
              size="small"
              color="success"
              disabled
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="delivery"
              label="배송비"
              value={quot.quotationDelivery}
              sx={inputStyle}
              size="small"
              color="success"
              disabled
            />
            <TextField
              variant="outlined"
              label="추가 설명"
              id="outlined-multiline-flexible"
              name="comment"
              rows={3}
              multiline
              value={quot.quotationComment}
              sx={inputStyle}
              size="small"
              color="success"
              disabled
            />
            <TextField
              style={{ display: 'none' }}
              variant="outlined"
              label="추가 설명"
              id="outlined-multiline-flexible"
              name="comment"
              rows={3}
              multiline
              value={quot.quotationComment}
              sx={inputStyle}
              size="small"
              color="success"
            />
          </div>
        </div>
        <div className={style.picture}>
          <span>*실제 판매되는 상품의 사진이면 더욱 좋습니다(최대 5장)</span>
        </div>
        <div className={style.images}>
          {files.length !== 0
            ? files.map((num) => (
                <img
                  key={num}
                  src={`${API.serverUrl}/img/${num}`}
                  alt="이미지 없음"
                  width={'100px'}
                  height={'100px'}
                />
              ))
            : images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="이미지 없음"
                  width={'100px'}
                  height={'100px'}
                />
              ))}
        </div>
        <div className={style.footer}>
          <button className={style.btn2}>
            <Link to={'/farmerpage/quotstatus'}>돌아가기</Link>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default QuotDetail;
