import React, { Fragment } from "react";

import styles from "./styles/Login.module.css";

const Login = () => {
  return (
    <Fragment>
      <div className={styles.wrap}>
        <div className={styles["wrap-center"]}>

          <div className={styles["text-group"]}>
            <div>로그인·회원가입</div>
            <div>못생겨서 오히려 좋아.</div>
            <div>못난이 농산물 거래, 언프리티 팜</div>
          </div>

          {/* 로그인 버튼 미완성 */}
          <div className={styles["kakao-naver"]}>
            <a href="#">
              <img src="https://d3cpiew7rze14b.cloudfront.net/assets/app/kakao_icon.svg" alt="카카오 로그인" />
              <span>카카오로 계속하기</span>
            </a>
            <a href="#">
              <img src="../../assets/naver.png" alt="네이버 로그인" />
              <span>네이버로 계속하기</span>
            </a>
          </div>

          <div className={styles["email-login"]}>
            <div>이메일로 계속하기</div>
            <input id="email" placeholder={"이메일을 입력해주세요."}></input>
            <input id="password" placeholder={"비밀번호를 입력해주세요."}></input>
            <div className={styles.find}>
              <a href="#">이메일 찾기</a>
              <a href="#">비밀번호 찾기</a>
            </div>
            <button className={styles["login-btn"]}>로그인</button>
          </div>

          <div className={styles.join}>
            <span>아직 회원이 아니신가요?</span>
            <a href="#">회원가입</a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
