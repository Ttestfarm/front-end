import React, { useEffect, useState } from 'react';
import './style/QuotDetail.css';
import { Link, useParams } from 'react-router-dom';
import image from '../../assets/blankimage.png';
import axios from 'axios';

const QuotDetail = () => {
  const quotation = useParams();
  const [files, setFiles] = useState([image, image, image, image, image]);
  const [quot, setQuot] = useState({
    quotationProduct: null,
    quotationQuantity: null,
    quotationPrice: null,
    quotationComment: null,
    quotationPicture: null
  });

  const getToken = () => {
    return localStorage.getItem("token"); // 여기서 'your_token_key'는 실제로 사용하는 토큰의 키여야 합니다.
  };

  useEffect(() => {
      const farmerToken = getToken();
        axios.get(`http://localhost:8090/farmer/quotdetail/${quotation.quotationId}`,
        {
         headers: {
           Authorization: `${farmerToken}`
         },
       })
        .then(res => {
          setQuot(res.data);
        })
        .catch(err => {
          console.log("error");
        })
  }, []);

  const fileChange = (e) => {
    let filearr = e.target.files;
    for (let i = 0; i < filearr.length; i++) {
      files.splice(i, 1, './upload/' + filearr[i].name);
      console.log('./upload/' + filearr[i].name);
      // console.log(filearr[i].name);
    }
    let id = e.target.id;
    setFiles([...files]);
  };

  const deleteClick = (idx) => {
    files.splice(idx, 1, image);
    setFiles([...files]);
  };


  return (
    <div className="quot-detail-form">
      <h2 className="quot-detail-form-header">견적서</h2>
      <div className="quot-detail-form-input">
        <div>
          <label htmlFor="product">못난이 농산물</label>
          <input
            type="text"
            name="product"
            value={quot.quotationProduct}
            disabled
          />
        </div>
        <div>
          <label htmlFor="amount">수량 혹은 kg</label>
          <input
            type="text"
            name="amount"
            value={quot.quotationQuantity + 'kg'}
            disabled
          />
        </div>
        <div>
          <label htmlFor="price">금액</label>
          <input
            type="text"
            name="price"
            value={quot.quotationPrice}
            disabled
          />
        </div>
        <div>
          <label htmlFor="append">추가 설명</label>
          <textarea
            className="append"
            style={{ resize: 'none' }}
            name="append"
            value={quot.quotationComment}
            disabled
          />
        </div>
      </div>
      <div className="quto-detail-form-picture">
        <span>*실제 판매되는 상품의 사진이면 더욱 좋습니다(최대 5장)</span>
      </div>
      <div className="images">
        {files.map((file, index) => (
          <div key={index}>
            {file !== image ? (
              <button onClick={() => deleteClick(index)}>x</button>
            ) : (
              ''
            )}
            <img
              src={image}
              alt="이미지 없음"
              id={index}
              width={'100px'}
              height={'100px'}
            />
          </div>
        ))}
      </div>
      <button className="quot-detail-form-btn">
        <Link to={'/quotstatus'}>돌아가기</Link>
      </button>
    </div>
  );
};

export default QuotDetail;
