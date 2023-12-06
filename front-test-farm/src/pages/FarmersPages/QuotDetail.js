import React, { useState } from 'react';
import './style/QutoDetail.css';
import { Link } from 'react-router-dom';
import image from '../../assets/blankimage.png';

const QuotDetail = () => {
  const [files, setFiles] = useState([
    image, image, image, image, image
  ]);

  const fileChange = (e) => {
    let filearr = e.target.files;
    for (let i = 0; i < filearr.length; i++) {
      files.splice(i, 1, './upload/' + filearr[i].name)
      console.log('./upload/' + filearr[i].name);
      // console.log(filearr[i].name);
    }
    let id = e.target.id;
    setFiles([...files]);
  }

  const deleteClick = (idx) => {
    files.splice(idx, 1, image)
    setFiles([...files]);
  }

  const quot = {
    'Quotation_number': 12345,
    'product_name': '마늘쫑',
    'quantity': 3,
    'total_price': 30000,
    'comment': '수줍은 초록빛 사랑, 충주 못난이 마늘쫑의 달콤함에 빠져 보세요.'
  }

  return (
    <div className='quot-detail-form'>
      <h2 className='quot-detail-form-header'>견적서</h2>
      <div className='quot-detail-form-input'>
        <div>
          <label htmlFor='product'>못난이 농산물</label>
          <input type='text' name='product' value={quot.product_name} disabled />
        </div>
        <div>
          <label htmlFor='amount'>수량 혹은 kg</label>
          <input type='text' name='amount' value={quot.quantity + 'kg'} disabled />
        </div>
        <div>
          <label htmlFor='price'>금액</label>
          <input type='text' name='price' value={quot.total_price} disabled />
        </div>
        <div>
          <label htmlFor='append'>추가 설명</label>
          <textarea className='append' style={{ resize: 'none' }} name='append' value={quot.comment} disabled />
        </div>

      </div>
      <div className='quto-detail-form-picture'>
        <span>*실제 판매되는 상품의 사진이면 더욱 좋습니다(최대 5장)</span>
        <div className="custom-file-input">
          <label htmlFor='file'>사진 첨부</label>
          <input name='file' type='file' id='file' multiple="multiple" accept='image/*' onChange={fileChange} />
        </div>
      </div>
      <div className='images'>
        {files.map((file, index) =>
          <div key={index}>
            {file !== image ?
              <button onClick={() => deleteClick(index)}>x</button> :
              ''
            }
            <img src={image} alt='이미지 없음' id={index} width={"100px"} height={"100px"} />
          </div>
        )}
      </div>
      <button className='quot-detail-form-btn'><Link to={'/quotstatus'}>돌아가기</Link></button>
    </div>
  );
};

export default QuotDetail;