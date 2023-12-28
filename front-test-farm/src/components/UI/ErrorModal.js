import React from 'react';
import style from './ErrorModal.module.css';
import negative from '../../assets/negative.png';
import carrot from '../../assets/carrot.png';
import ModalContainer from './Modal';

const ErrorModal = ({ message, onClose }) => {
  return (
    <>
      <ModalContainer>
        <header className={style.header}>
          <img src={negative} alt="negative" />
        </header>

        <main className={style.main}>
          <p>{message}</p>
        </main>
        
        <footer className={style.footer}>
          <button onClick={onClose}>확인</button>
          <img src={carrot} alt="carrot" />
        </footer>
      </ModalContainer>
    </>
  );
};

export default ErrorModal;
