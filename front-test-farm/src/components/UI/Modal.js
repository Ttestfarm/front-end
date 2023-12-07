import React, { Fragment, useState } from 'react';
import style from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {
  return (
    <div
      className={style.backdrop}
      onClick={props.onClose}
    ></div>
  );
};

const ModalOverlay = (props) => {
  return (
    <div className={style.modal}>
      <div className={style.content}>{props.children}</div>
    </div>
  );
};

const modalRoot = document.getElementById('modal-root');
const ModalContainer = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, modalRoot)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        modalRoot
      )}
    </Fragment>
  );
};

export default ModalContainer;
