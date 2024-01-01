import React, { useRef, useState } from 'react';
import ModalContainer from './Modal';
import { Rating, TextField } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import { handleSetValue, handleSetTab } from '../../util/textInsertWithTab';
import picDefault from '../../assets/third_img.png';
import { dateFormatter } from '../../util/date';
import style from './ReviewModal.module.css';
import * as API from '../../api/index';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isErrorModalAtom, tokenAtom } from '../../recoil/Atoms';
import { Form, useNavigate } from 'react-router-dom';

const ReviewModal = (props) => {
  const token = useRecoilValue(tokenAtom);
  const [rating, setRating] = useState(3);
  const [file, setFile] = useState('');
  const [content, setContent] = useState('');
  const [, setIsErrorModal] = useRecoilState(isErrorModalAtom);
  const navigate = useNavigate();

  const imgBoxRef = useRef();
  //날짜 변환
  const formattedDate = dateFormatter(props.orderInfo.date);
  //원화로 변환
  const numericPrice = parseInt(props.orderInfo.productPrice);
  const formattedPrice = numericPrice.toLocaleString('ko-KR');

  const onFileChange = (e) => {
    const imageSrc = URL.createObjectURL(e.target.files[0]);
    imgBoxRef.current.src = imageSrc;

    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const closeModal = () => {
    props.onClose();
    navigate('/mypage/buylist');
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('receiptId', props.orderInfo.receiptId);
    formData.append('content', content);
    formData.append('rating', rating);
    formData.append('farmerId', props.orderInfo.farmerId);
    if (file !== null) {
      formData.append('reviewpixUrl', file);
    }

    try {
      const response = await API.formPost('/buylist', token, formData);

      if (response.status !== 200) {
        setIsErrorModal({
          state: true,
          message: response.data,
        });
      }
      closeModal();
      //props.onClose();
      
      // navigate('/mypage/buylist');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {props.isOpen && (
        <ModalContainer>
          <Form>
            <header className={style.header}>
              <div>
                <p className={style.date}>{formattedDate}</p>
                <p>
                  구매한&nbsp;
                  <span className={style.name}>
                    {props.orderInfo.productName}
                  </span>
                </p>
                <p className={style.won}>₩ {formattedPrice}</p>
              </div>

              <div className={style['img-rating']}>
                <img
                  src={picDefault}
                  width="130px"
                  height="130px"
                  alt="picDefault"
                  ref={imgBoxRef}
                  onClick={() => document.getElementById('file').click()}
                />
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
                <button
                  onClick={() => document.getElementById('file').click()}
                  className={style.addBtn}
                >
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*"
                    onChange={onFileChange}
                    hidden
                  />
                  <AddAPhotoIcon sx={{ fontSize: 'small' }} />
                  &nbsp;사진추가
                </button>
              </div>
              <div className={style.closeBtn}>
                <CloseIcon
                  onClick={closeModal}
                  sx={{ fontSize: 'large' }}
                />
              </div>
            </header>
            <main className={style.main}>
              <TextField
                variant="outlined"
                id="outlined-multiline-flexible fullwidth"
                multiline
                fullWidth
                rows={7}
                name="content"
                value={content}
                label="리뷰 남기기"
                //onChange={inputHandle}
                onChange={(e) => handleSetValue(e, setContent)}
                onKeyDown={(e) => handleSetTab(e)}
                color="success"
              />
            </main>
            <footer className={style.footer}>
              <button onClick={submitHandler}>리뷰 저장</button>
            </footer>
          </Form>
        </ModalContainer>
      )}
    </>
  );
};

export default ReviewModal;
