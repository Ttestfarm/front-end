import React, { useRef, useState } from 'react';
import ModalContainer from './Modal';
import { Avatar, Rating, TextareaAutosize } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import picDefault from '../../assets/third_img.png';
import { Form } from 'react-router-dom';
import dateFormatter from '../../util/date';
import style from './ReviewModal.module.css';

const ReviewModal = (props) => {
  const [rating, setRating] = useState(3);
  const [file, setFile] = useState('');
  const [content, setContent] = useState('');

  const imgBoxRef = useRef();
  //날짜 변환
  const formattedDate = dateFormatter(props.orderInfo.date);
  //원화로 변환
  const numericPrice = parseInt(props.orderInfo.productPrice);
  const formattedPrice = numericPrice.toLocaleString('ko-KR');

  const onFileChange = (e) => {
    const imageSrc = URL.createObjectURL(e.target.files[0]);
    imgBoxRef.current.src = imageSrc;
    console.log('file', imageSrc);

    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  console.log('props', props);

  //
  const handleSetValue = (e) => {
    setContent(e.target.value);
  };

  const handleSetTab = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 9) {
      e.preventDefault();
      let val = e.target.value;
      let start = e.target.selectionStart;
      let end = e.target.selectionEnd;
      e.target.value = val.substring(0, start) + '\t' + val.substring(end);
      e.target.selectionStart = e.target.selectionEnd = start + 1;
      handleSetValue(e);
      return false; //  prevent focus
    }
  };
  //

  const closeModal = () => {
    props.onClose();
  };
  return (
    <>
      {props.isOpen && (
        <ModalContainer>
          <header className={style.header}>
            <div>
              <p>{formattedDate}</p>
              <p>구매하신 {props.orderInfo.productName}</p>
              <p>₩ {formattedPrice}</p>
            </div>
            <div className={style['img-rating']}>
              <Avatar
                ref={imgBoxRef}
                src={picDefault}
                onChange={onFileChange}
                sx={{ width: 130, height: 130 }}
              ></Avatar>

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
          <main>
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
              onChange={(e) => handleSetValue(e)}
              onKeyDown={(e) => handleSetTab(e)}
              size="small"
              // sx={inputStyle}
              color="success"
            />
          </main>
          <footer className={style.footer}>
            <button>리뷰 저장</button>
          </footer>
        </ModalContainer>
      )}
    </>
  );
};

export default ReviewModal;
