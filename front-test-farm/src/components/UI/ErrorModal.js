import React from 'react';
import style from './ErrorModal.module.css';
import success from '../../assets/success.png';
import picExam from '../../assets/pic-exam.png';
import ModalContainer from './Modal';

const ErrorModal = ({ message, onClose }) => {
  return (
    <>
      <ModalContainer>
        <header className={style.header}>
          <button onClick={onClose}>X</button>
        </header>

        <main className={style.main}>
          <img
            src={success}
            alt="success"
          />
          <p>{message}</p>
        </main>
        <footer className={style.footer}>
          <button onClick={onClose}>OK</button>
        </footer>
        <div className={style.lowImage}>
          <img
            src={picExam}
            alt="lowfeat"
          />
        </div>
      </ModalContainer>
    </>
  );
};

export default ErrorModal;
