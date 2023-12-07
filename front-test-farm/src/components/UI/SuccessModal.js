import React from 'react';
import style from './SuccessModal.module.css';
import success from '../../assets/success.png';
import picExam from '../../assets/pic-exam.png';
import ModalContainer from './Modal';

const SuccessModal = (props) => {
  return (
    <ModalContainer>
      <header className={style.header}>
        <button onClick={props.onClose}>X</button>
      </header>

      <main className={style.main}>
        <img
          src={success}
          alt="success"
        />
        <p>{props.message}</p>
      </main>
      <footer className={style.footer}>
        <button onClick={props.onClose}>OK</button>
      </footer>
      <div className={style.lowImage}>
        <img
          src={picExam}
          alt="lowfeat"
        />
      </div>
    </ModalContainer>
  );
};

export default SuccessModal;
