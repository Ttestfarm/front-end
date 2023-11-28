// 상태관리 & 수정필요사항
// - 닉네임 중복체크 추가 필요
// - 핸드폰번호 인증번호 입력창 disabled 였다가 요청버튼 누르면 활성화

import React, { Fragment } from "react";

import style from "./styles/Join.module.css";

const Join = () => {
  return (
    <Fragment>
      <div className={style.wrap}>
        <div className={style["wrap-center"]}>

          <div className={style.title}>
            <div>회원가입</div>
          </div>

          <div className={style.name}>
            <label for="name">이름</label> 
            <input id="name" placeholder={"이름을 입력해 주세요."} />
          </div>

          <div className={style.email}>
            <div className={style.certify}>
              <label for="email">이메일</label>
              <button id="email-certify-req" className={style["certify-btn"]}>인증번호 요청</button>
            </div>
            <input type="text" id="email" placeholder={"이메일을 입력해 주세요."} />
            <input type="text" id="email-cert-num" placeholder={"인증번호를 입력해 주세요."} />
          </div>

          <div className={style.password}>
            <label for="password">비밀번호</label> 
            <input type="password" id="password" placeholder={"비밀번호를 입력해 주세요."} />
            <input type="password" id="password2" placeholder={"비밀번호를 한 번 더 입력해 주세요."} />
          </div>

          <div className={style.address}>
            <label for="address">주소</label>
            <div className={style["address-code"]}>
              <input type="text" id="address-code" placeholder={"우편번호"} />
              <button id="find-address-code" className={style["certify-btn"]}>우편번호 찾기</button>
            </div>
            <input type="text" id="address-road" placeholder={"도로명 주소"} />
            <input type="text" id="address-detail" placeholder={"상세 주소를 입력해 주세요."} />
            <div className={style["address-default"]}>
              <input type="checkbox" id="address-default" />
              <div>기본 배송지로 설정하기</div>
            </div>
          </div>

          <div className={style.nickname}>
            <label for="nickname">닉네임</label> 
            <input type="text" id="nickname" placeholder={"닉네임을 입력해 주세요."} />
          </div>

          <div className={style.tel}>
            <div className={style.certify}>
              <label for="tel">핸드폰 번호</label>
              <button id="tel-certify-req" className={style["certify-btn"]}>인증번호 요청</button>
            </div>
            <input type="text" id="tel" placeholder={"핸드폰 번호를 입력해 주세요."} />
            <input type="text" id="tel-cert-num" placeholder={"인증번호를 입력해 주세요."} disabled />
          </div>

          <button id="join" className={style["join-btn"]}>회원가입 완료</button>

        </div>
      </div>
    </Fragment>
  );
};

export default Join;
