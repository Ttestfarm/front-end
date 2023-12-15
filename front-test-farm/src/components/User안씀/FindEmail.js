// 상태관리 & 수정필요사항
// - 입력여부 상태관리 -> 하단 메시지
// - 핸드폰번호 인증번호 입력창 disabled -> 요청버튼 누르면 활성화

import React, { Fragment } from "react";

import style from '../components/Layout/styles/FindEmail.module.css';

const FindEmailPage = () => {
  return (
    <Fragment>
      <div className={style.wrap}>
        <div className={style["wrap-center"]}>

          <div className={style.title}>
            <div>이메일 찾기</div>
          </div>

          <div className={style.input}>
            <label for="name">이름</label> 
            <input type="text" id="name" placeholder={"이름을 입력해 주세요."}></input>
            <div className={style.certify}>
              <label for="tel">핸드폰 번호</label> 
              <button id="certify-btn-req" className={style["certify-btn"]}>인증번호요청</button>
            </div>
            <input type="text" id="tel" placeholder={"핸드폰 번호를 입력해 주세요."}></input>
            <input type="text" id="tel-cert-num" placeholder={"인증번호를 입력해 주세요."} disabled />
          </div>

          <div className={style.btns}>
            <button id="find-email" className={style["find-btn"]}>이메일 찾기</button>
            <button id="cancel" className={style["cancel-btn"]}>취소</button>
          </div>

        </div>
      </div>
    </Fragment>
  );
};

export default FindEmailPage;
