// 상태관리 & 수정필요사항
// - 소셜로그인 로고 크기 조절 및 정렬 / img 삽입 방식 통일?
// 배경이미지에 워터마크 있는데 변경할지 그대로할지

import React, { Fragment } from "react";

import style from "./styles/Login.module.css";
import naver from '../../assets/naver.png';

const Login = () => {
  return (
    <Fragment>
      <div className={style.wrap}>
        <div className={style["wrap-center"]}>

          <div className={style["text-group"]}>
            <div>로그인·회원가입</div>
            <div>못생겨서 오히려 좋아.</div>
            <div>못난이 농산물 거래, 언프리티 팜</div>
          </div>

          <div className={style["kakao-naver"]}>
            <a id="kakao-login" href="#">
              <img src="https://d3cpiew7rze14b.cloudfront.net/assets/app/kakao_icon.svg" alt="카카오 로그인" />
              <span>카카오로 계속하기</span>
            </a>
            <a id="naver-login" href="#">
              <img src={naver} alt="naver-logo" />
              <span>네이버로 계속하기</span>
            </a>
          </div>

          <div className={style["email-login"]}>
            <div>이메일로 계속하기</div>
            <input type="text" id="email" placeholder={"이메일을 입력해 주세요."}></input>
            <input type="password" id="password" placeholder={"비밀번호를 입력해 주세요."}></input>
            <div className={style.find}>
              <a id="find-email" href="#">이메일 찾기</a>
              <a id="find-password" href="#">비밀번호 찾기</a>
            </div>
            <button id="login" className={style["login-btn"]}>로그인</button>
          </div>

          <div className={style.join}>
            <span>아직 회원이 아니신가요?</span>
            <a id="join" href="#">회원가입</a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
