import React, { useEffect, useRef, useState } from 'react';
import './style/QuotForm.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import image from '../../assets/blankimage.png';
import axios from 'axios';


const QuotForm = () => {
  const request = useParams();
  const navigate = useNavigate();
  const [formDatas, setformDatas] = useState({
    'requestId': `${request.requestId}`,
    'product': `${request.requestProduct}`,
    'quantity': '',
    'price': '',
    'comment': '',
    'picture': '',
  });
  
  let selectImg = null;
  const [files, setFiles] = useState([
    image, image, image, image, image
  ]);
  
  const getToken = () => {
    return localStorage.getItem("token"); // 여기서 'your_token_key'는 실제로 사용하는 토큰의 키여야 합니다.
  };

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

  const imageClick = (e) => {
    selectImg = e;
    document.getElementById("file").click();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformDatas((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const SendHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('requestId', formDatas.requestId);
    data.append('quotationProduct', formDatas.product);
    data.append('quotationQuantity', formDatas.quantity);
    data.append('quotationPrice', formDatas.price);
    data.append('quotationComment', formDatas.comment);
    data.append('quotationPicture', null);
   
    axios.post('http://localhost:8090/farmer/regquot', data, 
    {headers: 
      { 
        "Content-Type": `application/json`,
        Authorization: `${getToken()}`
      }
    })
      .then(res => {
        console.log(res);
        alert(res.data);
        navigate('/requestlist');
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <div className='quto-form'>
        <h2 className='quto-form-header'>견적서</h2>
        <form>
          <div className='quto-form-input'>
            <div>
              <label htmlFor='product'>못난이 농산물</label>
              <input type='text' name='product' value={request.requestProduct} disabled />
            </div>
            <div>
              <label htmlFor='quantity'>수량 혹은 kg</label>
              <input type='text' name='quantity' onChange={handleInputChange}/>
            </div>
            <div>
              <label htmlFor='price'>금액</label>
              <input type='text' name='price' onChange={handleInputChange}/>
            </div>
            <div>
              <label htmlFor='comment'>추가 설명</label>
              <textarea className='append' style={{ resize: 'none' }} name='comment' placeholder='파머님이 추가로 고객님에게 남기고 싶은 말을 적어주세요.' onChange={handleInputChange}/>
            </div>
          </div>

          <div className='quto-form-picture'>
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
                <img src={image} alt='이미지 없음' id={index} width={"100px"} height={"100px"} onClick={imageClick} />
              </div>
            )}
          </div>
          <div className='quto-form-btns'>
            <button className='quto-form-btn'><Link className='a' onClick={SendHandler}>견석서 보내기</Link></button>
            <button className='quto-form-btn'><Link className='a' to={'/farmerpage/requestlist'}>돌아가기</Link></button>
          </div>
        </form>
      </div>
      <div className='request-notice'>
        <div className='request-notice-icon'>
          <div className='request-notice-icon-circle'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
              <ellipse cx="10.2691" cy="10.5273" rx="9.72222" ry="10" fill="#49680D" />
              <text x="50%" y="50%" textAnchor='middle' dy=".3em" fill="#fff" fontSize="12">
                !
              </text>
            </svg>
          </div>
          <span>유의 사항</span>
        </div>

        <div className='request-notice-text'>
          <ul>
            <li>파머님! 재고 파악 후 신중하게 보내주세요!</li>
            <li>재고 부족으로 인한 판매 취소가 누적될 경우 패널티가 부과됩니다.<br />(3회 이상 누적 시 요청서 수신이 일주일간 중지됩니다.</li>
            <li>고객님이 견적서 수락을 하면 바로 결제가 진행됩니다.<br />신속하고 안전한 배송을 준비해주세요.</li>
            <li>추가적으로 생각나는 말이 있다면 적어두도록 하겠습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuotForm;