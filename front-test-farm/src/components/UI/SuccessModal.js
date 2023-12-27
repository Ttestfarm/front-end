import React from 'react';
import style from './SuccessModal.module.css';
import ok from '../../assets/ok.png';
import carrot from '../../assets/carrot.png';
import ModalContainer from './Modal';

const SuccessModal = (props) => {
  return (
    <ModalContainer>
      <header className={style.header}>
        <img src={ok} alt="ok" />
      </header>

      <main className={style.main}>
        <p>{props.message}</p>
      </main>
      <footer className={style.footer}>
        <button onClick={props.onClose}>확인</button>
        <img src={carrot} alt="carrot" />
      </footer>
    </ModalContainer>
  );
};

export default SuccessModal;
