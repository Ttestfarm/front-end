// 상태관리 & 수정필요사항
// - 입력여부 상태관리 -> 하단 메시지

import React, { Fragment } from "react";

import style from '../components/Layout/styles/FindPw.module.css';

const FindPwPage = () => {
  return (
    <Fragment>
      <div className={style.wrap}>
        <div className={style["wrap-center"]}>

          <div className={style.title}>
            <div>비밀번호 찾기</div>
          </div>

          <div className={style.input}>
            <label for="email">이메일</label> 
            <input type="text" id="email" placeholder={"이메일을 입력해 주세요."}></input>
            <label for="name">이름</label> 
            <input type="text" id="name" placeholder={"이름을 입력해 주세요."}></input>
          </div>

          <div className={style.btns}>
            <button id="find-password" className={style["find-btn"]}>비밀번호 찾기</button>
            <button id="cancel" className={style["cancel-btn"]}>취소</button>
          </div>

        </div>
      </div>
    </Fragment>
  );
};

export default FindPwPage;
