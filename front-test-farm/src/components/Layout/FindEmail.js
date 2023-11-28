// 상태관리 & 수정필요사항
// - 핸드폰번호 인증번호 입력창 disabled 였다가 요청버튼 누르면 활성화

import React, { Fragment } from "react";

import styles from "./styles/FindEmail.module.css";

const FindEmail = () => {
  return (
    <Fragment>
      <div className={styles.wrap}>
        <div className={styles["wrap-center"]}>

          <div className={styles.title}>
            <div>이메일 찾기</div>
          </div>

          <div className={styles.input}>
            <label for="name">이름</label> 
            <input type="text" id="name" placeholder={"이름을 입력해 주세요."}></input>
            <div className={styles.certify}>
              <label for="tel">핸드폰 번호</label> 
              <button id="certify-btn-req" className={styles["certify-btn"]}>인증번호요청</button>
            </div>
            <input type="text" id="tel" placeholder={"핸드폰 번호를 입력해 주세요."}></input>
            <input type="text" id="tel-cert-num" placeholder={"인증번호를 입력해 주세요."} disabled />
          </div>

          <div className={styles.btns}>
            <button id="find-email" className={styles["find-btn"]}>이메일 찾기</button>
            <button id="cancel" className={styles["cancel-btn"]}>취소</button>
          </div>

        </div>
      </div>
    </Fragment>
  );
};

export default FindEmail;
