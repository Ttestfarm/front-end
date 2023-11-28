import React, { Fragment } from "react";

import styles from "./styles/FindPw.module.css";

const FindPw = () => {
  return (
    <Fragment>
      <div className={styles.wrap}>
        <div className={styles["wrap-center"]}>

          <div className={styles.title}>
            <div>비밀번호 찾기</div>
          </div>

          <div className={styles.input}>
            <label for="email">이메일</label> 
            <input type="text" id="email" placeholder={"이메일을 입력해 주세요."}></input>
            <label for="name">이름</label> 
            <input type="text" id="name" placeholder={"이름을 입력해 주세요."}></input>
          </div>

          <div className={styles.btns}>
            <button id="find-password" className={styles["find-btn"]}>비밀번호 찾기</button>
            <button id="cancel" className={styles["cancel-btn"]}>취소</button>
          </div>

        </div>
      </div>
    </Fragment>
  );
};

export default FindPw;
