import React, { useRef, useState } from 'react';
import ModalContainer from './Modal';
import { Avatar, Rating, TextareaAutosize } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';

import picDefault from '../../assets/pic-default';
import { Form } from 'react-router-dom';

//  백에서 필요로 하는 키 정해지면 수정해야됩니다.
const ReviewModal = (props) => {
  const [ratingValue, setValue] = React.useState(2);
  const [file, setFile] = useState('');

  const imgBoxRef = useRef();

  const onFileChange = (e) => {
    const imageSrc = URL.createObjectURL(e.target.files[0]);
    imgBoxRef.current.src = imageSrc;
    console.log('file', imageSrc);
    setFile(e.target.files[0]);
  };
  return (
    <ModalContainer>
      <CloseIcon />
      <header>
        <div>
          <p>{props.ordersDate}</p>
          <p>상품이름</p>
          <p>가격</p>
        </div>
        <div>
          <Avatar
            ref={imgBoxRef}
            src={picDefault}
            sx={{ width: 100, height: 100 }}
          ></Avatar>

          <Rating
            name="simple-controlled"
            value={ratingValue}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <button onClick={() => document.getElementById('file').click()}>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
              onChange={onFileChange}
              hidden
            />
            <AddAPhotoIcon />
            사진추가+
          </button>
        </div>
      </header>
      <main>
        <TextareaAutosize
          minRows={3}
          placeholder="솔직한 후기를 남겨주세요 감사합니다."
        />
      </main>
      <footer>
        <button>리뷰 저장</button>
      </footer>
    </ModalContainer>
  );
};

export default ReviewModal;
