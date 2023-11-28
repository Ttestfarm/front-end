import React, { Fragment } from "react";

import styles from "./styles/Join.module.css";

const Join = () => {
  return (
    <Fragment>
      <div className={styles.wrap}>
        <div className={styles["wrap-center"]}>

          <div className={styles.title}>
            <div>회원가입</div>
          </div>

          <div className={styles.name}>
            <div>이름</div> 
            <input id="name" placeholder={"이름을 입력해주세요."}></input>
          </div>

          <div className={styles.email}>
            <div>이메일</div> 
            <input id="email" placeholder={"이메일을 입력해주세요."}></input>
            <div className={styles.certify}>
              <div>이메일</div> 
              <button className={styles["certify-btn"]}>인증번호요청</button>
            </div>
            <input id="certNum" placeholder={"인증번호를 입력해주세요."}></input>
          </div>

          <div className={styles.password}>
            <div>비밀번호</div> 
            <input id="password" placeholder={"이메일을 입력해주세요."}></input>
            <div className={styles.certify}>
              <div>이메일</div> 
              <button className={styles["certify-btn"]}>인증번호요청</button>
            </div>
            <input id="certNum" placeholder={"인증번호를 입력해주세요."}></input>
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

          <button className={styles["join-btn"]}>회원가입 완료</button>

        </div>
      </div>
    </Fragment>
  );
};

export default Join;
