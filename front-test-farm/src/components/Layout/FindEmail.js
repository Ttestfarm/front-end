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
            <div>이름</div> 
            <input id="name" placeholder={"이름을 입력해주세요."}></input>
            <div className={styles.certify}>
              <div>핸드폰 번호</div> 
              <button className={styles["certify-btn"]}>인증번호요청</button>
            </div>
            <input id="tel" placeholder={"핸드폰 번호를 입력해주세요."}></input>
            <input id="certNum" placeholder={"인증번호를 입력해주세요."}></input>
          </div>

          <div className={styles.btns}>
            <button className={styles["find-btn"]}>이메일 찾기</button>
            <button className={styles["cancel-btn"]}>취소</button>
          </div>

        </div>
      </div>
    </Fragment>
  );
};

export default FindEmail;
